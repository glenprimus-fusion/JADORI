from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, date

from seed import SAMPLE_LISTINGS

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]

app = FastAPI()
api = APIRouter(prefix="/api")

MA_CITIES = ["Boston", "Brookline", "Cambridge", "Newton", "Somerville"]


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def new_id():
    return str(uuid.uuid4())


class NewsletterIn(BaseModel):
    email: EmailStr


class RegistrationIn(BaseModel):
    full_name: str = Field(min_length=2)
    email: EmailStr
    role: str = Field(pattern="^(rent|lend|both)$")
    city: str


class RentalRequestIn(BaseModel):
    listing_id: str
    full_name: str = Field(min_length=2)
    email: EmailStr
    start_date: date
    end_date: date
    message: Optional[str] = ""


class PurchaseRequestIn(BaseModel):
    listing_id: str
    full_name: str = Field(min_length=2)
    email: EmailStr
    message: Optional[str] = ""


class ListingIn(BaseModel):
    lender_name: str = Field(min_length=2)
    lender_email: EmailStr
    city: str
    brand: str
    name: str = Field(min_length=2)
    color: str
    condition: str
    rent_per_day: int = Field(gt=0)
    buy_enabled: bool = False
    buy_price: Optional[int] = None
    retail_price: Optional[int] = None
    description: Optional[str] = ""
    photo_checklist: List[str] = []


class ContactIn(BaseModel):
    full_name: str = Field(min_length=2)
    email: EmailStr
    topic: str
    message: str = Field(min_length=5)


def fees_for(listing, days):
    rental = listing["rent_per_day"] * days
    service = int(rental * 0.10 + 0.5)
    handling = 25
    protection = 4 * days
    deposit = listing["deposit"]
    return {
        "days": days, "rental": rental, "service_fee": service,
        "authentication_handling": handling, "damage_protection": protection,
        "deposit": deposit, "total": rental + service + handling + protection + deposit,
    }


@api.get("/")
async def root():
    return {"message": "JADORI concept API"}


@api.get("/listings")
async def get_listings(mode: Optional[str] = None, brand: Optional[str] = None):
    q = {}
    if mode == "buy":
        q["buy_enabled"] = True
    if brand:
        q["brand"] = brand
    return await db.listings.find(q, {"_id": 0}).to_list(500)


@api.get("/listings/{listing_id}")
async def get_listing(listing_id: str):
    doc = await db.listings.find_one({"id": listing_id}, {"_id": 0})
    if not doc:
        raise HTTPException(404, "Listing not found")
    return doc


@api.post("/listings")
async def create_listing(body: ListingIn):
    if body.city not in MA_CITIES:
        raise HTTPException(422, "Please choose a participating Massachusetts city")
    if body.buy_enabled and not body.buy_price:
        raise HTTPException(422, "Purchase price required when Buy is enabled")
    doc = body.model_dump()
    doc.update({
        "id": new_id(), "auth_status": "pending", "retail_verified": False,
        "available": False, "is_sample": False, "review_status": "submitted",
        "lender": {"name": body.lender_name, "rating": None, "city": body.city},
        "deposit": 0, "images": [], "created_at": now_iso(),
    })
    await db.lender_submissions.insert_one(doc.copy())
    doc.pop("_id", None)
    return doc


@api.get("/lender/submissions")
async def lender_submissions(email: EmailStr):
    return await db.lender_submissions.find({"lender_email": email}, {"_id": 0}).sort("created_at", -1).to_list(200)


@api.post("/newsletter")
async def newsletter(body: NewsletterIn):
    if await db.newsletter.find_one({"email": body.email}):
        return {"status": "exists", "message": "You're already on the list."}
    await db.newsletter.insert_one({"id": new_id(), "email": body.email, "created_at": now_iso()})
    return {"status": "subscribed", "message": "Thank you. You're on the list."}


@api.post("/registrations")
async def register(body: RegistrationIn):
    if body.city not in MA_CITIES:
        raise HTTPException(422, "Please choose a participating Massachusetts city")
    doc = body.model_dump()
    doc.update({"id": new_id(), "created_at": now_iso()})
    await db.registrations.update_one({"email": body.email}, {"$set": doc}, upsert=True)
    doc.pop("_id", None)
    return doc


@api.post("/quote")
async def quote(body: RentalRequestIn):
    listing = await get_listing(body.listing_id)
    days = (body.end_date - body.start_date).days + 1
    if days < 1:
        raise HTTPException(422, "End date must be after start date")
    return fees_for(listing, days)


@api.post("/rental-requests")
async def rental_request(body: RentalRequestIn):
    listing = await get_listing(body.listing_id)
    days = (body.end_date - body.start_date).days + 1
    if days < 2:
        raise HTTPException(422, "Minimum rental is 2 days")
    if not listing.get("available"):
        raise HTTPException(422, "This bag is currently rented")
    if body.start_date < date.today():
        raise HTTPException(422, "Start date cannot be in the past")
    doc = body.model_dump()
    doc.update({
        "id": new_id(), "start_date": body.start_date.isoformat(), "end_date": body.end_date.isoformat(),
        "status": "requested", "quote": fees_for(listing, days), "created_at": now_iso(),
        "listing": {k: listing[k] for k in ("id", "brand", "name", "images")},
    })
    await db.rental_requests.insert_one(doc.copy())
    doc.pop("_id", None)
    return doc


@api.get("/rental-requests")
async def list_rentals(email: EmailStr):
    return await db.rental_requests.find({"email": email}, {"_id": 0}).sort("created_at", -1).to_list(200)


@api.post("/purchase-requests")
async def purchase_request(body: PurchaseRequestIn):
    listing = await get_listing(body.listing_id)
    if not listing.get("buy_enabled"):
        raise HTTPException(422, "The lender has not enabled purchase for this bag")
    doc = body.model_dump()
    doc.update({"id": new_id(), "status": "requested", "price": listing["buy_price"], "created_at": now_iso(),
                "listing": {k: listing[k] for k in ("id", "brand", "name", "images")}})
    await db.purchase_requests.insert_one(doc.copy())
    doc.pop("_id", None)
    return doc


@api.get("/purchase-requests")
async def list_purchases(email: EmailStr):
    return await db.purchase_requests.find({"email": email}, {"_id": 0}).sort("created_at", -1).to_list(200)


@api.post("/contact")
async def contact(body: ContactIn):
    doc = body.model_dump()
    doc.update({"id": new_id(), "created_at": now_iso()})
    await db.contact_messages.insert_one(doc.copy())
    return {"status": "received", "id": doc["id"]}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("startup")
async def seed_listings():
    await db.listings.delete_many({"is_sample": True})
    await db.listings.insert_many([dict(x) for x in SAMPLE_LISTINGS])


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
