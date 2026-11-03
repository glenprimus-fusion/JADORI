"""Conceptual sample listings for the JADORI visual prototype. Not real inventory."""

U = "https://images.unsplash.com/photo-{}?auto=format&fit=crop&w=1200&q=80"

BAGS = {
    "grey": U.format("1605733513597-a8f8341084e6"),
    "teal": U.format("1594223274512-ad4803739b7c"),
    "ivory": U.format("1682745230951-8a5aa9a474a0"),
    "black": U.format("1705909237050-7a7625b47fac"),
    "red": U.format("1637069422643-9b6d41d51dd9"),
    "cognac": U.format("1746880223690-359948154c53"),
    "tan": U.format("1637759292654-a12cb2be085e"),
    "dove": U.format("1683921470299-b8f0f3331657"),
    "green": U.format("1682031215004-161c99d5b225"),
    "navy": U.format("1560891958-68bb1fe7fb78"),
    "noir": U.format("1713425887412-9d39ecf06b24"),
    "sand": U.format("1575202332411-b01fe9ace7a8"),
}
DETAIL = {
    "leather": U.format("1647960514922-052047430407"),
    "stitch": U.format("1741086154510-522e68f76933"),
}


def gallery(main, alt):
    return [
        {"url": main, "view": "Front", "cleaned": True},
        {"url": main, "view": "Back"},
        {"url": main, "view": "Side"},
        {"url": main, "view": "Bottom"},
        {"url": DETAIL["leather"], "view": "Interior"},
        {"url": main, "view": "Hardware"},
        {"url": DETAIL["stitch"], "view": "Wear & damage"},
    ]


def item(i, brand, name, color, main, alt, retail, verified_retail, rent, buy, auth, lender, rating, city, condition, available=True):
    return {
        "id": f"sample-{i:02d}", "is_sample": True, "brand": brand, "name": name, "color": color,
        "retail_price": retail, "retail_verified": verified_retail, "rent_per_day": rent,
        "buy_enabled": buy is not None, "buy_price": buy, "auth_status": auth,
        "lender": {"name": lender, "rating": rating, "city": city},
        "condition": condition, "available": available, "deposit": round((buy or retail) * 0.15 / 50) * 50,
        "images": gallery(BAGS[main], BAGS[alt]),
        "description": "Sample description for the visual prototype. Lenders will describe the bag, its history and any signs of wear in their own words.",
    }


SAMPLE_LISTINGS = [
    item(1, "Chanel", "Bowling Bag, Medium", "Black", "black", "black", 10800, True, 145, 8900, "verified", "Eleanor V.", 4.9, "Boston", "Excellent"),
    item(2, "Hermès", "Top-Handle Tote 30", "Blue", "sand", "tan", 14500, False, 240, None, "pending", "Sophia M.", None, "Cambridge", "Very good"),
    item(3, "Dior", "Structured Top-Handle", "Ivory", "ivory", "dove", 6500, True, 95, 5100, "verified", "Camilla K.", 4.8, "Newton", "Excellent"),
    item(4, "Gucci", "Satchel with Buckles", "Grey", "grey", "dove", 3400, False, 65, None, "pending", "Isabelle T.", None, "Brookline", "Good"),
    item(5, "Burberry", "Grained Leather Tote", "Cognac", "cognac", "tan", 2750, True, 55, 1950, "verified", "Charlotte R.", 4.7, "Somerville", "Very good"),
    item(6, "Louis Vuitton", "Round Crossbody", "Red", "red", "noir", 3100, False, 60, None, "pending", "Amara O.", None, "Boston", "Excellent", False),
    item(7, "Prada", "Saffiano Top-Handle", "Teal", "teal", "navy", 3900, True, 70, 2900, "verified", "Mei L.", 5.0, "Cambridge", "Excellent"),
    item(8, "Chanel", "Small Flap Clutch", "Black", "noir", "noir", 5600, False, 85, None, "pending", "Nadia F.", None, "Brookline", "Very good"),
    item(9, "Dior", "Soft Shoulder Bag", "Dove", "dove", "ivory", 4200, False, 75, 3200, "pending", "Grace H.", None, "Newton", "Good"),
    item(10, "Gucci", "Mini Top-Handle", "Green", "green", "teal", 2900, True, 50, None, "verified", "Priya S.", 4.9, "Somerville", "Excellent"),
    item(11, "Prada", "Flap Shoulder Bag", "Navy", "navy", "grey", 3300, False, 60, None, "pending", "Hannah W.", None, "Boston", "Very good"),
    item(12, "Hermès", "Hobo with Strap", "Cognac", "tan", "cognac", 9800, True, 160, 7400, "verified", "Juliette B.", 4.8, "Brookline", "Very good"),
]
