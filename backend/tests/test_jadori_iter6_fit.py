# Iteration 6: fit data, showcase flag, on-model gallery images
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"

SHOWCASE = {
    "sample-01": {"w": 10, "h": 6, "d": 2.5, "weight": 1.5, "carry": [("Shoulder", 9.5), ("Crossbody", 19)],
                  "fits": ["phone", "cardholder", "keys", "lipstick", "earbuds"], "img_carry": ["Shoulder", "Crossbody", None]},
    "sample-03": {"w": 9.5, "h": 7, "d": 4.5, "weight": 1.6, "carry": [("Top handle", 3.5), ("Crossbody", 20)],
                  "fits": ["phone", "cardholder", "keys", "lipstick", "compact"], "img_carry": ["Top handle", "Crossbody", None]},
    "sample-12": {"w": 9, "h": 10, "d": 7, "weight": 1.8, "carry": [("Shoulder", 11), ("Crook of arm", 6)],
                  "fits": ["phone", "wallet", "sunglasses", "keys", "pouch", "earbuds"], "img_carry": ["Shoulder", "Crook of arm", None]},
}


@pytest.fixture(scope="module")
def s():
    return requests.Session()


class TestShowcase:
    @pytest.mark.parametrize("lid", list(SHOWCASE))
    def test_showcase_fit(self, s, lid):
        r = s.get(f"{API}/listings/{lid}")
        assert r.status_code == 200
        d = r.json()
        exp = SHOWCASE[lid]
        assert d["showcase"] is True
        f = d["fit"]
        for k in ("w", "h", "d", "weight"):
            assert f[k] == exp[k], k
        assert [(c["way"], c["drop"]) for c in f["carry"]] == exp["carry"]
        assert f["fits"] == exp["fits"]
        assert f["model_height"] == "5'9\""
        om = [im for im in d["images"] if im.get("on_model")]
        assert len(om) == 3
        assert [im["carry"] for im in om] == exp["img_carry"]
        assert "_id" not in d

    @pytest.mark.parametrize("lid", list(SHOWCASE))
    def test_on_model_images_reachable(self, s, lid):
        d = s.get(f"{API}/listings/{lid}").json()
        for im in [x for x in d["images"] if x.get("on_model")]:
            r = s.head(im["url"], allow_redirects=True, timeout=20)
            assert r.status_code == 200, im["url"]


class TestNonShowcase:
    @pytest.mark.parametrize("lid,style", [("sample-05", "Tote"), ("sample-04", "Crossbody"), ("sample-08", "Mini"), ("sample-09", "Shoulder")])
    def test_fit_by_style(self, s, lid, style):
        d = s.get(f"{API}/listings/{lid}").json()
        assert d["style"] == style
        assert d["showcase"] is False
        assert d["fit"]["model_height"] is None
        assert len(d["fit"]["carry"]) == 2
        assert not any(im.get("on_model") for im in d["images"])

    def test_all_listings_have_fit(self, s):
        r = s.get(f"{API}/listings")
        assert r.status_code == 200
        items = r.json()
        items = items if isinstance(items, list) else items.get("listings", items.get("items", []))
        samples = [x for x in items if x.get("is_sample")]
        assert len(samples) >= 12
        for x in samples:
            assert "fit" in x and x["fit"]["w"] > 0
        assert sorted(x["id"] for x in samples if x.get("showcase")) == ["sample-01", "sample-03", "sample-12"]

    def test_404(self, s):
        assert s.get(f"{API}/listings/sample-999").status_code == 404
