# JADORI concept API regression tests (listings, newsletter, registrations, quote, rental/purchase requests, contact)
import os
import uuid
from datetime import date, timedelta
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"
TOMORROW = date.today() + timedelta(days=1)
BUY_IDS = {"sample-01", "sample-03", "sample-05", "sample-07", "sample-09", "sample-12"}


def em(prefix="test"):
    return f"TEST_{prefix}_{uuid.uuid4().hex[:8]}@example.com".lower()


@pytest.fixture(scope="module")
def s():
    x = requests.Session()
    x.headers.update({"Content-Type": "application/json"})
    return x


# Health
def test_root(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200 and "JADORI" in r.json()["message"]


# Listings
class TestListings:
    def test_all_listings(self, s):
        r = s.get(f"{API}/listings")
        assert r.status_code == 200
        d = r.json()
        samples = [x for x in d if x.get("is_sample")]
        assert len(samples) == 12
        assert all("_id" not in x for x in d)
        assert {x["brand"] for x in samples} >= {"Chanel", "Gucci", "Dior", "Hermès", "Burberry", "Louis Vuitton", "Prada"}

    def test_buy_mode(self, s):
        d = s.get(f"{API}/listings", params={"mode": "buy"}).json()
        assert all(x["buy_enabled"] for x in d)
        assert {x["id"] for x in d if x.get("is_sample")} == BUY_IDS

    def test_brand_filter(self, s):
        d = s.get(f"{API}/listings", params={"brand": "Dior"}).json()
        assert len(d) >= 2 and all(x["brand"] == "Dior" for x in d)

    def test_get_one_and_auth_status(self, s):
        a = s.get(f"{API}/listings/sample-01").json()
        b = s.get(f"{API}/listings/sample-02").json()
        assert a["auth_status"] == "verified" and a["buy_enabled"] is True
        assert b["auth_status"] == "pending" and b["buy_enabled"] is False
        assert all(x["lender"]["city"] in ["Boston", "Brookline", "Cambridge", "Newton", "Somerville"]
                   for x in s.get(f"{API}/listings").json())

    def test_get_missing(self, s):
        assert s.get(f"{API}/listings/nope-xyz").status_code == 404


# Newsletter
class TestNewsletter:
    def test_subscribe_and_duplicate(self, s):
        e = em("nl")
        r1 = s.post(f"{API}/newsletter", json={"email": e})
        assert r1.status_code == 200 and r1.json()["status"] == "subscribed"
        r2 = s.post(f"{API}/newsletter", json={"email": e})
        assert r2.json()["status"] == "exists" and "already" in r2.json()["message"]

    def test_invalid(self, s):
        assert s.post(f"{API}/newsletter", json={"email": "bad"}).status_code == 422


# Registration
class TestRegistration:
    def test_register(self, s):
        e = em("reg")
        r = s.post(f"{API}/registrations", json={"full_name": "TEST User", "email": e, "role": "both", "city": "Cambridge"})
        assert r.status_code == 200 and r.json()["email"] == e and "_id" not in r.json()

    def test_bad_role(self, s):
        r = s.post(f"{API}/registrations", json={"full_name": "TEST User", "email": em(), "role": "admin", "city": "Boston"})
        assert r.status_code == 422

    def test_non_ma_city(self, s):
        # Requirement: Massachusetts cities only
        r = s.post(f"{API}/registrations", json={"full_name": "TEST User", "email": em(), "role": "rent", "city": "New York"})
        assert r.status_code == 422, f"non-MA city accepted: {r.status_code}"


# Quote / rentals
class TestRental:
    def test_quote(self, s):
        r = s.post(f"{API}/quote", json={"listing_id": "sample-01", "full_name": "TEST", "email": em(),
                                         "start_date": str(TOMORROW), "end_date": str(TOMORROW + timedelta(days=2))})
        d = r.json()
        assert r.status_code == 200 and d["days"] == 3 and d["rental"] == 435 and d["service_fee"] == 44
        assert d["total"] == 435 + 44 + 25 + 12 + d["deposit"]

    def test_rental_request_persist(self, s):
        e = em("rent")
        r = s.post(f"{API}/rental-requests", json={"listing_id": "sample-01", "full_name": "TEST Renter", "email": e,
                                                   "start_date": str(TOMORROW), "end_date": str(TOMORROW + timedelta(days=1))})
        assert r.status_code == 200, r.text
        assert r.json()["quote"]["days"] == 2 and r.json()["status"] == "requested"
        g = s.get(f"{API}/rental-requests", params={"email": e}).json()
        assert len(g) == 1 and g[0]["listing"]["id"] == "sample-01"

    def test_min_days(self, s):
        r = s.post(f"{API}/rental-requests", json={"listing_id": "sample-01", "full_name": "TEST", "email": em(),
                                                   "start_date": str(TOMORROW), "end_date": str(TOMORROW)})
        assert r.status_code == 422 and "Minimum" in r.json()["detail"]

    def test_past_date(self, s):
        p = date.today() - timedelta(days=5)
        r = s.post(f"{API}/rental-requests", json={"listing_id": "sample-01", "full_name": "TEST", "email": em(),
                                                   "start_date": str(p), "end_date": str(p + timedelta(days=2))})
        assert r.status_code == 422

    def test_unavailable_bag_rejected(self, s):
        # sample-06 available=False ("Currently rented") - backend should reject
        r = s.post(f"{API}/rental-requests", json={"listing_id": "sample-06", "full_name": "TEST", "email": em(),
                                                   "start_date": str(TOMORROW), "end_date": str(TOMORROW + timedelta(days=2))})
        assert r.status_code == 422, f"unavailable bag accepted: {r.status_code}"


# Purchases
class TestPurchase:
    def test_purchase_ok(self, s):
        e = em("buy")
        r = s.post(f"{API}/purchase-requests", json={"listing_id": "sample-01", "full_name": "TEST Buyer", "email": e})
        assert r.status_code == 200 and r.json()["price"] == 8900
        g = s.get(f"{API}/purchase-requests", params={"email": e}).json()
        assert len(g) == 1

    def test_purchase_disabled(self, s):
        r = s.post(f"{API}/purchase-requests", json={"listing_id": "sample-02", "full_name": "TEST Buyer", "email": em()})
        assert r.status_code == 422


# Lender listings
class TestLenderListing:
    def test_create_and_list(self, s):
        e = em("lend")
        r = s.post(f"{API}/listings", json={"lender_name": "TEST Lender", "lender_email": e, "city": "Newton", "brand": "Prada",
                                            "name": "TEST Bag", "color": "Black", "condition": "Excellent", "rent_per_day": 50,
                                            "photo_checklist": ["Back"]})
        assert r.status_code == 200 and r.json()["auth_status"] == "pending"
        g = s.get(f"{API}/lender/submissions", params={"email": e}).json()
        assert len(g) == 1 and g[0]["name"] == "TEST Bag" and "_id" not in g[0]

    def test_buy_without_price(self, s):
        r = s.post(f"{API}/listings", json={"lender_name": "TEST Lender", "lender_email": em(), "city": "Newton", "brand": "Prada",
                                            "name": "TEST Bag", "color": "Black", "condition": "Excellent", "rent_per_day": 50,
                                            "buy_enabled": True})
        assert r.status_code == 422


# Contact
def test_contact(s):
    r = s.post(f"{API}/contact", json={"full_name": "TEST C", "email": em("c"), "topic": "General", "message": "Hello there"})
    assert r.status_code == 200 and r.json()["status"] == "received"
    assert s.post(f"{API}/contact", json={"full_name": "T", "email": "x", "topic": "a", "message": "1"}).status_code == 422
