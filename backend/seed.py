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
    13: "01efc8cdb1454969438d39412b38c1bd8f85a5efd0f4bbf4d9980beecc454f1c",
    14: "0dab704464e99c72e83980587e9d94f7f5c63e8dd7c9d2c5e75f0905a84a8fd1",
    15: "fa20277a48bfe3c5c792c6da14cb3e0ddf9dfdb4fe589514643e071879b6d14c",
    16: "b71d00b9273eac26a85d47baccc2d750a345b249c08a7a33cc50eb099842dce5",
    17: "11fc757d72ca7809d8645458386398ee804d97283ecc2aecd9bbd5d3a8002fe9",
    18: "fe6f29355850ab8e06d9695753d74764490c3e24e6e2ddeaa1d99f9328949457",
    19: "6f3ec31ab5c50eb258682ce3875bf9937d9ae413d8c7f715699af3186fb0459f",
    20: "b00f92d6a059c6333025c9fae065a45a7f0475d43b5a3d25c6fec78b0b787ea3",
    21: "4391f2e29849ca40fa2d0bc6afe8897620bf9728c64e0213267530b86b212d63",
    22: "7fe8e327bfc6c514c03b0a82bc75aa8c57b2396d9ca4e904ceb68e9c53be0d9f",
    23: "728a9a6701ebce43c2f8826f590a7be298de2fb40143a52aa9f2cdb8623150b4",
    24: "3736b8aa3f139c6ddc4562edcfe99d699f33907dbb8130c92ce01d65ea85b5da",
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
         8: "Mini", 9: "Shoulder", 10: "Mini", 11: "Shoulder", 12: "Tote",
         13: "Tote", 14: "Tote", 15: "Tote", 16: "Shoulder", 17: "Shoulder", 18: "Shoulder",
         19: "Crossbody", 20: "Crossbody", 21: "Crossbody", 22: "Mini", 23: "Mini", 24: "Mini"}

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
    2: [("11a145a6d3752a8f4eaccd436dcf5b7d743fbceefd54c16205af6ca7f0d9a1db", "Carried by the handles", "Top handle")],
    4: [("8bdecb1c4dd57f1161b4e81cb3542917ea190e61de04a0cdfcb9ff165ddf45be", "Worn crossbody", "Crossbody")],
    5: [("c2847242ac7172d33d9df53513d4b464f60e3f49708dbed19c7721f8a41811ff", "Carried by the handles", "Top handle")],
    6: [("b1780d28a2429b8bea6e2bcce53cafc20857600a256f96618c56a7f3b346ff50", "Worn crossbody", "Crossbody")],
    7: [("e16b2b757c4673d97f8e683d4a592c1c4ea2382d47c99d8ef786ff291dc292c1", "Worn crossbody", "Crossbody")],
    8: [("45a8e703fe4a5e80f5631da05ad0aa6579aebf57c0a25aa18f951cb8f5382918", "Worn crossbody", "Crossbody")],
    9: [("78d658f3513842460ba36c361160b721d9d3bfb38a2ecbb71b04950f6fa2f5c8", "On the shoulder", "Shoulder")],
    10: [("b0c9bfe666b8288b75b2cf7bda67688f85d28ffe89a1de5b5de459d692f5275f", "Carried by the handle", "Top handle")],
    11: [("c6a4e37e0f0bd295ca6bb17f5e6e37de4a97d2325bba8df3519467c9c265af0b", "On the shoulder", "Shoulder")],
    13: [("a8b11655e47e1a544b549b2475b94318071600edee16c754f0ba6b75ef2c9e62", "Carried by the handles", "Top handle")],
    14: [("3b8caff62cd733a304d424198c77f3bd8ffa56174085d73badb2dc4a14327099", "Carried by the handles", "Top handle")],
    15: [("254551be87f41ccbcbe07af71f982daf16f66835e213cf0ab97dbb2b14c28b6f", "Carried by the handles", "Top handle")],
    16: [("b060d0a8863cdcf35179abae4f3c75e76664d7a1c5eeeb657daedc54b6120158", "On the shoulder", "Shoulder")],
    17: [("7bc811bc12ee5389283540899a76609ce6a612a595b80a95f4c838eee14e3b19", "Worn crossbody", "Crossbody")],
    18: [("fcd1518307080cd9c69bc38dcb9f55db73e5b3f8b8f847011d22594194d08782", "On the shoulder", "Shoulder")],
    19: [("99c3f55ef0ff407adf69bc21efa21fce89dcde59d1b1e0abb57f727a5f9e4d94", "Worn crossbody", "Crossbody")],
    20: [("6bb15c2a07ef5fb3b7fd144ee96ef10cf1f0f3252cbdf4ff52e54cb5e71d9549", "Worn crossbody", "Crossbody")],
    21: [("62b6acd7cafbbdb20e9c0facd20d9aa1f0acf85eada87b67d5be310fc2d092a9", "Worn crossbody", "Crossbody")],
    22: [("ad3b9264621c40bcf079b33a78bdec256d4b30713a4eac5116ebecc10928759d", "Carried by the handle", "Top handle")],
    23: [("aa49c1f704e93d90b07a394b9286f613a2abc3101c27b0c9d6df9d93d19e451c", "Carried by the handle", "Top handle")],
    24: [("9410ab82460663035665fe576714f5f9c7cf15ab1e4fa0735341c1e82e444411", "Carried by the handle", "Top handle")],
}
SHOWCASE = {1, 3, 12}

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
    6: {"carry": [("Crossbody", 21), ("Top handle", 3)]},
    8: {"carry": [("Crossbody", 20), ("Top handle", 3)]},
    17: {"carry": [("Crossbody", 20), ("Shoulder", 10)]},
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
        "images": gallery(i), "fit": fit(i), "showcase": i in SHOWCASE,
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
    item(13, "Louis Vuitton", "Structured Shopper Tote", "Black", 3600, True, 65, 2700, "verified", "eleanor-v", "Excellent"),
    item(14, "Prada", "Leather Shopping Tote", "Ivory", 4100, False, 70, None, "pending", "sophia-m", "Very good"),
    item(15, "Dior", "Embroidered Book Tote", "Navy", 3900, True, 65, 2900, "verified", "camilla-k", "Excellent"),
    item(16, "Gucci", "Chain Shoulder Bag", "Red", 3200, False, 55, None, "pending", "isabelle-t", "Very good"),
    item(17, "Hermès", "Saddle-Stitched Shoulder Bag", "Cognac", 8900, True, 135, 6900, "verified", "sophia-m", "Excellent"),
    item(18, "Louis Vuitton", "Baguette Shoulder Bag", "Beige", 2800, False, 50, 2100, "pending", "charlotte-r", "Good"),
    item(19, "Chanel", "Quilted Camera Bag", "Black", 5200, True, 90, 4300, "verified", "eleanor-v", "Excellent"),
    item(20, "Burberry", "Leather Saddle Crossbody", "Tan", 2300, False, 45, None, "pending", "charlotte-r", "Very good"),
    item(21, "Dior", "Compact Messenger", "Grey", 3600, False, 60, None, "pending", "camilla-k", "Very good", False),
    item(22, "Hermès", "Mini Top-Handle 20", "Green", 11500, True, 190, None, "verified", "isabelle-t", "Excellent"),
    item(23, "Prada", "Mini Bucket Bag", "Dove", 2600, False, 45, 1900, "pending", "isabelle-t", "Very good"),
    item(24, "Louis Vuitton", "Mini Trunk Bag", "Ivory", 4800, True, 80, None, "verified", "eleanor-v", "Excellent"),
]
