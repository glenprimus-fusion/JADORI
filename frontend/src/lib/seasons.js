import { monthlyEdits } from "./edits";

const IMG = "https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/";

// Each season: campaign still (wide + optional tall), optional slow video (desktop only), copy.
export const SEASONS = {
  winter: { name: "Winter", months: [11, 0, 1], title: "Carry the evening.", copy: "Quilted leathers and fine chains for the season's invitations. Authenticated, and near you.", wide: `${IMG}d3d2e41df094afa546ca2286586ee2183bf347870cd18ce73ac68681420a30c9.jpeg`, pos: "object-[72%_center]" },
  spring: { name: "Spring", months: [2, 3, 4], title: "Carry the light.", copy: "Ivory leathers and small top-handles for garden parties and long brunches.", wide: `${IMG}eb387347dfaa8d659b45f965fe81d9d767e9f58b7ab0db6b38ef892e54959ce6.jpeg`, pos: "object-[74%_center]" },
  summer: { name: "Summer", months: [5, 6, 7], title: "Carry the coast.", copy: "Woven leathers and easy totes for weekends on the Cape.", wide: `${IMG}99095cf2401b51f82793d65f2eaefb2d3c68c034c4865e0d48ad7124f20e22f2.jpeg`, pos: "object-[72%_center]" },
  autumn: { name: "Autumn", months: [8, 9, 10], title: "Carry the icon.", copy: "Authenticated designer handbags from owners near you. Rent for a moment, lend from your closet, or keep one forever.", wide: `${IMG}6bf247e39ae72769580da364e231450e69ba44a846273baddd277b8f2a27a4a1.jpeg`, tall: `${IMG}f619097a395a8fcfd5b9a897b4d6a6242a33fdfb348b41a6ad9a0de92dbe2680.jpeg`, video: "/hero/autumn.mp4", pos: "object-[center_30%] nav:object-[70%_center]" },
};

export const seasonKeyFor = (d = new Date()) => Object.keys(SEASONS).find((k) => SEASONS[k].months.includes(d.getMonth()));

export const currentHero = (override) => {
  const key = SEASONS[override] ? override : seasonKeyFor();
  return { key, ...SEASONS[key], ...monthlyEdits() };
};
