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
from datetime import datetime, timezone, date, timedelta

from seed import SAMPLE_LISTINGS, LENDERS

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
    plan: str = Field("essential", pattern="^(essential|signature|complete)$")
    fulfilment: str = Field("pickup", pattern="^(pickup|delivery)$")


class PurchaseRequestIn(BaseModel):
    listing_id: str
    full_name: str = Field(min_length=2)
    email: EmailStr
    message: Optional[str] = ""


class OfferIn(BaseModel):
    listing_id: str
    full_name: str = Field(min_length=2)
    email: EmailStr
    amount: int = Field(gt=0)
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


PLANS = {"essential": (4, 1.0), "signature": (9, 0.5), "complete": (16, 0.25)}
DELIVERY_FEE = 45


def fees_for(listing, days, plan="essential", fulfilment="pickup"):
    per_day, deposit_share = PLANS[plan]
    rental = listing["rent_per_day"] * days
    service = int(rental * 0.10 + 0.5)
    handling = 25
    protection = per_day * days
    deposit = int(listing["deposit"] * deposit_share / 50 + 0.5) * 50
    delivery = DELIVERY_FEE if fulfilment == "delivery" else 0
    return {
        "days": days, "rental": rental, "service_fee": service,
        "authentication_handling": handling, "damage_protection": protection, "plan": plan,
        "fulfilment": fulfilment, "delivery": delivery,
        "deposit": deposit, "total": rental + service + handling + protection + delivery + deposit,
    }


def sample_bookings(listing):
    i = int(listing["id"].split("-")[1]) if listing.get("is_sample") else 0
    t = date.today()
    spans = [] if not i else [(3 + i % 5, 2 + i % 3), (12 + i % 7, 3), (24 + i % 4, 4)]
    out = [(t + timedelta(days=a), t + timedelta(days=a + n - 1)) for a, n in spans]
    if i and not listing.get("available"):
        out.append((t - timedelta(days=2), t + timedelta(days=4)))
    return out


async def blocked_ranges(listing):
    ranges = [(s, e, "booked") for s, e in sample_bookings(listing)]
    async for r in db.rental_requests.find({"listing_id": listing["id"]}, {"_id": 0, "start_date": 1, "end_date": 1}):
        ranges.append((date.fromisoformat(r["start_date"]), date.fromisoformat(r["end_date"]), "booked"))
    ranges += [(e + timedelta(days=1), e + timedelta(days=1), "buffer") for s, e, _ in list(ranges)]
    return sorted(ranges)


def is_free(ranges, d):
    return all(not (s <= d <= e) for s, e, _ in ranges)


def next_available(ranges):
    d = date.today() + timedelta(days=1)
    while not (is_free(ranges, d) and is_free(ranges, d + timedelta(days=1))):
        d += timedelta(days=1)
    return d.isoformat()


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
    docs = await db.listings.find(q, {"_id": 0}).to_list(500)
    for d in docs:
        d["next_available"] = next_available(await blocked_ranges(d))
    return docs


@api.get("/listings/{listing_id}/availability")
async def availability(listing_id: str):
    listing = await get_listing(listing_id)
    ranges = await blocked_ranges(listing)
    return {"blocked": [{"start": s.isoformat(), "end": e.isoformat(), "kind": k} for s, e, k in ranges],
            "next_available": next_available(ranges)}


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
    return fees_for(listing, days, body.plan, body.fulfilment)


@api.post("/rental-requests")
async def rental_request(body: RentalRequestIn):
    listing = await get_listing(body.listing_id)
    days = (body.end_date - body.start_date).days + 1
    if days < 2:
        raise HTTPException(422, "Minimum rental is 2 days")
    if body.start_date < date.today():
        raise HTTPException(422, "Start date cannot be in the past")
    ranges = await blocked_ranges(listing)
    if any(s <= body.end_date and body.start_date <= e for s, e, _ in ranges):
        raise HTTPException(422, "Those dates are not available. Please choose free days on the calendar.")
    doc = body.model_dump()
    doc.update({
        "id": new_id(), "start_date": body.start_date.isoformat(), "end_date": body.end_date.isoformat(),
        "status": "requested", "quote": fees_for(listing, days, body.plan, body.fulfilment), "created_at": now_iso(),
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


def owner_reply(price, amount):
    if amount >= price * 0.9:
        return "accepted", amount
    if amount >= price * 0.75:
        return "countered", int((amount + price) / 2 / 10 + 0.5) * 10
    return "declined", None


@api.post("/offers")
async def make_offer(body: OfferIn):
    listing = await get_listing(body.listing_id)
    if not listing.get("buy_enabled"):
        raise HTTPException(422, "The owner has not enabled purchase for this bag")
    price = listing["buy_price"]
    if body.amount >= price:
        raise HTTPException(422, "Your offer is at or above the asking price. Please use Request to buy.")
    if body.amount < price * 0.6:
        raise HTTPException(422, f"Offers must be at least 60% of the asking price (${int(price * 0.6):,}).")
    status, counter = owner_reply(price, body.amount)
    doc = body.model_dump()
    doc.update({"id": new_id(), "asking": price, "status": status, "counter": counter, "created_at": now_iso(),
                "listing": {k: listing[k] for k in ("id", "brand", "name", "images")}, "lender": listing["lender"]["name"]})
    await db.offers.insert_one(doc.copy())
    doc.pop("_id", None)
    return doc


@api.post("/offers/{offer_id}/accept-counter")
async def accept_counter(offer_id: str):
    doc = await db.offers.find_one({"id": offer_id}, {"_id": 0})
    if not doc or doc["status"] != "countered":
        raise HTTPException(404, "No counter-offer to accept")
    await db.offers.update_one({"id": offer_id}, {"$set": {"status": "accepted", "amount": doc["counter"]}})
    doc.update({"status": "accepted", "amount": doc["counter"]})
    return doc


@api.get("/offers")
async def list_offers(email: EmailStr):
    return await db.offers.find({"email": email}, {"_id": 0}).sort("created_at", -1).to_list(200)


@api.get("/lenders/{slug}")
async def get_lender(slug: str):
    lender = LENDERS.get(slug)
    if not lender:
        raise HTTPException(404, "Closet not found")
    listings = await db.listings.find({"lender.slug": slug}, {"_id": 0}).to_list(100)
    return {**lender, "listings": listings}


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
