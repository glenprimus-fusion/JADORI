const U = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DOORS = {
  lend: U("1560891958-68bb1fe7fb78"),
  rent: [U("1746730921536-6123c87a074d"), U("1676716107070-1f9ef2a1ac3e"), U("1559127452-9328c6b697bd")],
  buy: U("1588190437916-425872ddf591"),
};

export const BRANDS = [
  { name: "Chanel", img: U("1713425887412-9d39ecf06b24", 800) },
  { name: "Gucci", img: U("1649544284889-2c30c3267013", 800) },
  { name: "Dior", img: U("1649544145000-46fb54c2a331", 800) },
  { name: "Hermès", img: U("1605813810260-1330807535bb", 800) },
  { name: "Burberry", img: U("1572009283538-2fce2d2a1909", 800) },
  { name: "Louis Vuitton", img: U("1683921470299-b8f0f3331657", 800), provisional: true },
  { name: "Prada", img: "https://images.pexels.com/photos/19186713/pexels-photo-19186713.jpeg?auto=compress&cs=tinysrgb&w=800", provisional: true },
];

export const slug = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "-");

export const COLORS = ["Black", "Beige", "Ivory", "Dove", "Grey", "Tan", "Cognac", "Red", "Green", "Navy"];
export const CITIES = ["Boston", "Brookline", "Cambridge", "Newton", "Somerville"];
export const CONDITIONS = ["Excellent", "Very good", "Good"];

export const AUTH_NOTICE = "Every bag is independently authenticated before it reaches you.";

export const AUTH_STEPS = [
  { t: "Listing review", d: "When a lender lists a bag, our team reviews the photographs, serial details and documentation they provide. A new listing is not yet authenticated." },
  { t: "Independent inspection", d: "Before the first handoff, the bag is examined in person by an independent authentication specialist — materials, stitching, hardware, date codes and construction." },
  { t: "Verified status", d: "Only bags that pass inspection display the authenticated seal. Bags awaiting inspection are marked “Authenticated before handoff”." },
];

export const JOURNEYS = {
  rent: [
    ["Choose a bag", "Browse authenticated bags from owners across Massachusetts."],
    ["Pick your dates", "Select a start and end date and review every fee before you request."],
    ["Receive & enjoy", "The bag is authenticated before handoff, then delivered or collected locally."],
    ["Return", "Return it on your end date. Your refundable deposit is released after inspection."],
  ],
  lend: [
    ["List your bag", "Add photographs of every side, the interior, the hardware and any wear."],
    ["Set your price", "Choose a daily rental rate and, if you wish, a purchase price."],
    ["We authenticate", "Your bag is independently inspected before its first rental."],
    ["Earn", "Receive payouts for each completed rental while your bag stays yours."],
  ],
  buy: [
    ["Find it", "Some lenders choose to offer their bags for purchase. Look for a purchase price."],
    ["Request to buy", "Send a request to the owner. Authentication is completed before the sale."],
    ["Make it yours", "A beautifully kept bag begins its next chapter with you."],
  ],
};

export const SUSTAIN = [
  "Renting instead of repeatedly buying",
  "A longer useful life for designer handbags",
  "Responsible reuse, shared locally",
  "Owners earn from bags they already have",
  "Flexible access to luxury",
];
