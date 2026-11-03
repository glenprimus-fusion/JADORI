# Iteration 4: plans/fulfilment quote, offers, lender closets
import os
from datetime import date, timedelta
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    x = requests.Session()
    x.headers.update({"Content-Type": "application/json"})
    return x


def rng(days=3, offset=10):
    a = date.today() + timedelta(days=offset)
    return a.isoformat(), (a + timedelta(days=days - 1)).isoformat()


def body(plan, fulfil, lid="sample-01"):
    a, b = rng()
    return {"listing_id": lid, "full_name": "TEST_User", "email": "test_iter4@example.com",
            "start_date": a, "end_date": b, "plan": plan, "fulfilment": fulfil}


# Quote with plans and fulfilment
class TestQuote:
    @pytest.mark.parametrize("plan,fulfil,total,deposit", [
        ("signature", "pickup", 1231, 700), ("complete", "delivery", 947, 350), ("essential", "pickup", 1866, 1350)])
    def test_quote_totals(self, s, plan, fulfil, total, deposit):
        r = s.post(f"{API}/quote", json=body(plan, fulfil))
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["total"] == total and d["deposit"] == deposit and d["days"] == 3
        assert d["plan"] == plan and d["fulfilment"] == fulfil

    def test_invalid_plan(self, s):
        r = s.post(f"{API}/quote", json=body("gold", "pickup"))
        assert r.status_code == 422

    def test_rental_request_stores_plan(self, s):
        r = s.post(f"{API}/rental-requests", json=body("complete", "delivery"))
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["quote"]["plan"] == "complete" and d["quote"]["delivery"] == 45 and d["quote"]["total"] == 947
        g = s.get(f"{API}/rental-requests", params={"email": "test_iter4@example.com"}).json()
        assert any(x["id"] == d["id"] and x["plan"] == "complete" and x["fulfilment"] == "delivery" for x in g)


def offer(s, amount, lid="sample-01", email="test_iter4_offer@example.com"):
    return s.post(f"{API}/offers", json={"listing_id": lid, "full_name": "TEST_Offer", "email": email, "amount": amount})


# Offers
class TestOffers:
    def test_accepted(self, s):
        r = offer(s, 8010)
        assert r.status_code == 200 and r.json()["status"] == "accepted" and r.json()["asking"] == 8900

    def test_countered_and_accept(self, s):
        r = offer(s, 7000)
        d = r.json()
        assert d["status"] == "countered" and d["counter"] == 7950
        a = s.post(f"{API}/offers/{d['id']}/accept-counter")
        assert a.status_code == 200 and a.json()["status"] == "accepted" and a.json()["amount"] == 7950
        again = s.post(f"{API}/offers/{d['id']}/accept-counter")
        assert again.status_code == 404
        lst = s.get(f"{API}/offers", params={"email": "test_iter4_offer@example.com"}).json()
        m = [x for x in lst if x["id"] == d["id"]][0]
        assert m["status"] == "accepted" and m["amount"] == 7950 and "_id" not in m

    def test_declined(self, s):
        assert offer(s, 6000).json()["status"] == "declined"

    def test_below_60(self, s):
        r = offer(s, 5000)
        assert r.status_code == 422 and "60%" in r.json()["detail"]

    def test_at_asking(self, s):
        assert offer(s, 8900).status_code == 422

    def test_non_buy(self, s):
        assert offer(s, 100, "sample-02").status_code == 422

    def test_accept_counter_unknown(self, s):
        assert s.post(f"{API}/offers/nope/accept-counter").status_code == 404


# Lender closets
class TestLenders:
    def test_eleanor(self, s):
        r = s.get(f"{API}/lenders/eleanor-v")
        assert r.status_code == 200
        d = r.json()
        assert d["name"] == "Eleanor V." and d["top"] is True
        assert sorted(x["id"] for x in d["listings"]) == ["sample-01", "sample-06", "sample-11"]

    def test_unknown(self, s):
        assert s.get(f"{API}/lenders/unknown").status_code == 404

    def test_listing_lender_fields(self, s):
        d = s.get(f"{API}/listings/sample-02").json()
        assert d["lender"]["slug"] == "sophia-m" and d["lender"]["top"] is True
