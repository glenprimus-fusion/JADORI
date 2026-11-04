"""Conceptual sample listings for the JADORI visual prototype. Not real inventory."""

G = "https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/{}.jpeg"
U = "https://images.unsplash.com/photo-{}?auto=format&fit=crop&w=1000&q=80"

STUDIO = {
    1: "64e75346aff96195fec1f59f116b228beb87b5c68bf89da891bd47fd1b916b68",
    2: "89ba3293a50337908347376ee10f5a1444d6e10585f8e03ba9cae262cf2e08e4",
    3: "4e6bf51ac42d97729a52f948ccbfd54ba6c242963bdcaf4eb3c4d5e0bc1db5cd",
    4: "2716a9e7ee94920d636a51555750238e7417eae2bcadeb2efd3d055bf28ded8b",
    5: "8d841ae92dbb4357e99d2c626ced2b806a257cd7fee127d3de32f127a976f2eb",
    6: "72e38f5337f1d5a9e79dd0a4f35dfaac33b85e02179f0d4901f1ef5b2dbf1530",
    7: "9768963316716a4c29e387fe0ccfc0083b9581503cd949277538b3dc761434fc",
    8: "142c094bd4916c6aad7ce537f74f2dd85c7f724f29dca53202e11e981cb492f4",
    9: "bcb3726dc850bc44a167f934ad11b8cbb273e440832fa067c42607086f8e25f5",
    10: "7eaf15f62ffa3df649b08582ee37e3866dcea44643b65ad8dd13792022cbf07f",
    11: "d4aa48f2cccf0733494b30af6cb9134d1ad6be2946a1a0d1ad6667d44789b0d8",
    12: "145379ca4a705194567ef6f67eda8c1ec922a4feeb8ed08cab7182d73a03a9a5",
}
WORN = {
    1: U.format("1713425887412-9d39ecf06b24"), 2: U.format("1676716107070-1f9ef2a1ac3e"),
    3: U.format("1746730921536-6123c87a074d"), 4: U.format("1683921470299-b8f0f3331657"),
    5: U.format("1559127452-9328c6b697bd"), 6: U.format("1649544284889-2c30c3267013"),
    7: "https://images.pexels.com/photos/19186713/pexels-photo-19186713.jpeg?auto=compress&cs=tinysrgb&w=1000",
    8: U.format("1649544145000-46fb54c2a331"), 9: U.format("1572009283538-2fce2d2a1909"),
    10: U.format("1682031215004-161c99d5b225"), 11: U.format("1560891958-68bb1fe7fb78"),
    12: U.format("1605813810260-1330807535bb"),
}
DETAIL = {
    "leather": U.format("1647960514922-052047430407"),
    "stitch": U.format("1741086154510-522e68f76933"),
}
STYLE = {1: "Shoulder", 2: "Tote", 3: "Crossbody", 4: "Crossbody", 5: "Tote", 6: "Mini", 7: "Crossbody",
         8: "Mini", 9: "Shoulder", 10: "Mini", 11: "Shoulder", 12: "Tote"}

# AI-generated on-model photography for the three showcase bags.
ON_MODEL = {
    1: [("aade2205c3d65484a81fc7dba1709cfa517a1031c0b9dacaa10dda441df8d7bc", "On the shoulder", "Shoulder"),
        ("63e32e32aab08405d1d947a5d88f0f70d5a6d8220723ad30015dd1d27d4669b7", "Worn crossbody", "Crossbody"),
        ("53914b66d8d190a1cb8a55443f672e24ae9d9ebd9fed52dd3c805c498d18ce8d", "Detail, worn", None)],
    3: [("c82769e4086ee09704e14664d7840743fa40ce9281a67ca06c561fb61d386c47", "Carried by the handle", "Top handle"),
        ("0d7b9f9f647a8dda5ac2a95d59426458c2461fda10de80a760740d7a18505971", "Worn crossbody", "Crossbody"),
        ("30dbc5238eb8fcbb41e1fb131085200bb372b9bb8ea755f81fd36e2027d697ac", "Detail, in hand", None)],
    12: [("3751af95fb6b5a020081c0bd3da9e8f606cfb71f629250f13022420771ba2e98", "On the shoulder", "Shoulder"),
         ("38e57035a924283197ea0187523be0e33fd84f7fe79a868075935e9fc19238a7", "In the crook of the arm", "Crook of arm"),
         ("fd90711a2b4189cd1de7572b58b5959eb94fd5ad133b3f534c58e06220059369", "Detail, worn", None)],
}

# Sample measurements for the prototype (inches / lbs). Lenders confirm real values.
FIT_BY_STYLE = {
    "Shoulder": {"w": 10, "h": 6.5, "d": 3, "weight": 1.4, "carry": [("Shoulder", 10), ("Crossbody", 20)], "fits": ["phone", "cardholder", "keys", "lipstick", "sunglasses"]},
    "Tote": {"w": 13, "h": 10, "d": 6, "weight": 2.2, "carry": [("Top handle", 5), ("Shoulder", 10)], "fits": ["phone", "wallet", "sunglasses", "notebook", "keys", "bottle"]},
    "Crossbody": {"w": 9, "h": 6, "d": 3, "weight": 1.2, "carry": [("Crossbody", 21), ("Top handle", 4)], "fits": ["phone", "cardholder", "keys", "lipstick"]},
    "Mini": {"w": 7, "h": 5, "d": 2.5, "weight": 0.9, "carry": [("Top handle", 3), ("Crossbody", 20)], "fits": ["phone", "cardholder", "lipstick", "keys"]},
}
FIT_OVERRIDE = {
    1: {"w": 10, "h": 6, "d": 2.5, "weight": 1.5, "carry": [("Shoulder", 9.5), ("Crossbody", 19)], "fits": ["phone", "cardholder", "keys", "lipstick", "earbuds"]},
    3: {"w": 9.5, "h": 7, "d": 4.5, "weight": 1.6, "carry": [("Top handle", 3.5), ("Crossbody", 20)], "fits": ["phone", "cardholder", "keys", "lipstick", "compact"]},
    12: {"w": 9, "h": 10, "d": 7, "weight": 1.8, "carry": [("Shoulder", 11), ("Crook of arm", 6)], "fits": ["phone", "wallet", "sunglasses", "keys", "pouch", "earbuds"]},
}


def fit(i):
    f = dict(FIT_BY_STYLE[STYLE[i]], **FIT_OVERRIDE.get(i, {}))
    f["carry"] = [{"way": w, "drop": dr} for w, dr in f["carry"]]
    f["model_height"] = "5'9\"" if i in ON_MODEL else None
    return f


def gallery(i):
    main = G.format(STUDIO[i])
    worn = [{"url": G.format(h), "view": v, "on_model": True, "carry": c} for h, v, c in ON_MODEL[i]] if i in ON_MODEL \
        else [{"url": WORN[i], "view": "Worn (editorial)"}]
    return [
        {"url": main, "view": "Front", "cleaned": True},
        *worn,
        {"url": main, "view": "Back (photo pending)"},
        {"url": main, "view": "Side (photo pending)"},
        {"url": main, "view": "Bottom (photo pending)"},
        {"url": DETAIL["leather"], "view": "Interior"},
        {"url": main, "view": "Hardware (photo pending)"},
        {"url": DETAIL["stitch"], "view": "Wear & damage"},
    ]


LENDERS = {
    "eleanor-v": {"slug": "eleanor-v", "name": "Eleanor V.", "city": "Boston", "rating": 4.9, "reviews": 38, "rentals": 42, "since": "2024", "response": "within an hour", "followers": 214, "top": True,
                  "bio": "A small, much-loved collection of Chanel and Louis Vuitton classics, kept in dust bags between every outing."},
    "sophia-m": {"slug": "sophia-m", "name": "Sophia M.", "city": "Cambridge", "rating": 5.0, "reviews": 24, "rentals": 27, "since": "2024", "response": "within an hour", "followers": 168, "top": True,
                 "bio": "Structured top-handles for the working week and the evening after."},
    "camilla-k": {"slug": "camilla-k", "name": "Camilla K.", "city": "Newton", "rating": 4.8, "reviews": 7, "rentals": 8, "since": "2025", "response": "within a few hours", "followers": 61, "top": False,
                  "bio": "Soft Dior leathers, lent for weddings and long lunches."},
    "isabelle-t": {"slug": "isabelle-t", "name": "Isabelle T.", "city": "Brookline", "rating": 4.7, "reviews": 12, "rentals": 15, "since": "2025", "response": "within a few hours", "followers": 92, "top": False,
                   "bio": "A Brookline closet of minis, buckets and everyday icons."},
    "charlotte-r": {"slug": "charlotte-r", "name": "Charlotte R.", "city": "Somerville", "rating": None, "reviews": 0, "rentals": 0, "since": "2026", "response": "within a day", "followers": 9, "top": False,
                    "bio": "New to JADORI. Warm leathers and easy totes."},
}


def item(i, brand, name, color, retail, verified_retail, rent, buy, auth, lender_slug, condition, available=True):
    L = LENDERS[lender_slug]
    return {
        "id": f"sample-{i:02d}", "is_sample": True, "brand": brand, "name": name, "color": color, "style": STYLE[i],
        "retail_price": retail, "retail_verified": verified_retail, "rent_per_day": rent,
        "buy_enabled": buy is not None, "buy_price": buy, "auth_status": auth,
        "lender": {k: L[k] for k in ("slug", "name", "rating", "city", "top")},
        "condition": condition, "available": available, "deposit": round((buy or retail) * 0.15 / 50) * 50,
        "images": gallery(i), "fit": fit(i), "showcase": i in ON_MODEL,
        "description": "Sample description for the visual prototype. Lenders will describe the bag, its history and any signs of wear in their own words.",
    }


SAMPLE_LISTINGS = [
    item(1, "Chanel", "Quilted Flap, Medium", "Black", 10800, True, 145, 8900, "verified", "eleanor-v", "Excellent"),
    item(2, "Hermès", "Top-Handle Tote 30", "Tan", 14500, False, 240, None, "pending", "sophia-m", "Very good"),
    item(3, "Dior", "Structured Top-Handle", "Ivory", 6500, True, 95, 5100, "verified", "camilla-k", "Excellent"),
    item(4, "Gucci", "Buckle Satchel", "Grey", 3400, False, 65, None, "pending", "isabelle-t", "Good"),
    item(5, "Burberry", "Grained Leather Tote", "Cognac", 2750, True, 55, 1950, "verified", "charlotte-r", "Very good"),
    item(6, "Louis Vuitton", "Round Crossbody", "Red", 3100, False, 60, None, "pending", "eleanor-v", "Excellent", False),
    item(7, "Prada", "Saffiano Top-Handle", "Black", 3900, True, 70, 2900, "verified", "sophia-m", "Excellent"),
    item(8, "Chanel", "Mini Quilted Flap", "Beige", 5600, False, 85, None, "pending", "isabelle-t", "Very good"),
    item(9, "Dior", "Soft Hobo", "Dove", 4200, False, 75, 3200, "pending", "camilla-k", "Good"),
    item(10, "Gucci", "Mini Top-Handle", "Green", 2900, True, 50, None, "verified", "charlotte-r", "Excellent"),
    item(11, "Prada", "Nylon Flap Shoulder Bag", "Navy", 3300, False, 60, None, "pending", "eleanor-v", "Very good"),
    item(12, "Hermès", "Leather Bucket Bag", "Tan", 9800, True, 160, 7400, "verified", "isabelle-t", "Very good"),
]
