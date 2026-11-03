const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1300&q=80`;

// Curated sample edits; two are featured each month, rotating automatically.
export const EDITS = [
  { slug: "wedding-season", title: "Wedding Season", blurb: "Soft ivories and polished minis that photograph beautifully from ceremony to last dance.", img: U("1746730921536-6123c87a074d"), ids: ["sample-03", "sample-08", "sample-01"] },
  { slug: "gala-night", title: "Gala Night", blurb: "Jewel-like evening bags for black tie, benefit dinners and opening nights.", img: U("1713425887412-9d39ecf06b24"), ids: ["sample-06", "sample-08", "sample-07"] },
  { slug: "weekend-on-the-cape", title: "Weekend on the Cape", blurb: "Generous totes in warm leathers, made for a long weekend away.", img: U("1676716107070-1f9ef2a1ac3e"), ids: ["sample-02", "sample-05", "sample-12"] },
  { slug: "holiday-parties", title: "Holiday Parties", blurb: "Black, red and green for the season's invitations.", img: U("1649544284889-2c30c3267013"), ids: ["sample-01", "sample-06", "sample-10"] },
  { slug: "boardroom-to-dinner", title: "Boardroom to Dinner", blurb: "Structured shapes that carry the laptop-free day into the evening.", img: U("1559127452-9328c6b697bd"), ids: ["sample-07", "sample-11", "sample-04"] },
  { slug: "spring-brunch", title: "Spring Brunch", blurb: "Light, fresh and easy, for long Sunday tables.", img: U("1649544145000-46fb54c2a331"), ids: ["sample-10", "sample-03", "sample-09"] },
];

export const monthlyEdits = (d = new Date()) => {
  const m = d.getMonth();
  return { month: d.toLocaleString("en-US", { month: "long" }), edits: [EDITS[(m * 2) % EDITS.length], EDITS[(m * 2 + 1) % EDITS.length]] };
};
