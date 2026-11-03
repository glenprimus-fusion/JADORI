import { GuidePage, StepPhoto, StepVideo, Mock, MockRow, MockButton } from "../components/jadori/Guide";
import { AuthSeal } from "../components/jadori/AuthBadge";

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
const G = (h) => `https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/${h}.jpeg`;
const BAG = G("4e6bf51ac42d97729a52f948ccbfd54ba6c242963bdcaf4eb3c4d5e0bc1db5cd");

const ConditionVisual = () => (
  <Mock>
    <p className="jd-label mb-4">Condition report · sample</p>
    <div className="grid grid-cols-4 gap-1.5 mb-5">{[BAG, "1647960514922-052047430407", BAG, "1741086154510-522e68f76933"].map((s, i) => <div key={i} className="relative aspect-square jd-photo overflow-hidden"><img src={s.startsWith("http") ? s : U(s)} alt="" className="absolute inset-0 w-full h-full object-cover" /></div>)}</div>
    <div className="flex justify-between items-center"><span className="font-serif text-[22px]">Excellent</span><span className="flex gap-1">{[1, 2, 3].map((i) => <span key={i} className="h-[3px] w-7 bg-[#1B1714]" />)}</span></div>
    <p className="text-[13px] text-[#4A423C] mt-3">Light corner wear photographed on the base. Hardware bright, structure intact.</p>
    <p className="text-[11px] text-[#7A716A] mt-3">Photos unretouched · confirmed at inspection</p>
  </Mock>
);

const RequestVisual = () => (
  <Mock>
    <div className="flex gap-4 items-center mb-5"><div className="relative w-16 aspect-[2/3]"><img src={BAG} alt="" className="absolute inset-0 w-full h-full object-cover" /></div><div><p className="jd-eyebrow !text-[#1B1714]">Dior · sample</p><p className="font-serif text-[18px]">Structured Top-Handle</p></div></div>
    <MockRow k="Purchase price" v="$5,100" /><MockRow k="Original retail (verified)" v={<span className="line-through text-[#7A716A]">$6,500</span>} /><MockRow k="Authentication" v="Before sale" />
    <MockButton>Request to buy</MockButton>
    <p className="text-[11px] text-[#7A716A] mt-3">No payment taken in this concept</p>
  </Mock>
);

const RecordVisual = () => (
  <Mock>
    <div className="text-center">
      <div className="flex justify-center"><AuthSeal size={84} /></div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A716A] mt-4">Record of authentication</p>
      <p className="font-serif text-[20px] mt-1">JD-SAMPLE-0003</p>
    </div>
    <div className="mt-5"><MockRow k="Ownership" v="Transferred to you" /><MockRow k="Condition report" v="Included" /><MockRow k="Dust bag & tag" v="Included" /></div>
  </Mock>
);

const STEPS = [
  { t: "Find a bag to keep", v: <StepPhoto src={U("1649544145000-46fb54c2a331")} alt="Woman with a pre-owned handbag (stock placeholder)" />, d: "Some owners choose to sell their bags. Browse bags with a purchase price, or find one you've rented and loved.", pts: ["Look for “Also to buy” on listings", "Filter the Buy catalogue by brand and style", "Prices always in US dollars"], cta: ["Shop bags to buy", "/buy/all"] },
  { t: "Read the condition report", v: <ConditionVisual />, d: "Every bag is graded Excellent, Very good or Good, with unretouched photographs of each side, the interior, hardware and any wear.", pts: ["Grades confirmed during inspection", "Every mark photographed and described", "Original retail shown only when verified"] },
  { t: "Request to buy", v: <RequestVisual />, d: "Send a purchase request to the owner. Once they confirm, the price is held for you while the bag is authenticated.", pts: ["Owner confirms every sale", "Nothing charged until authentication passes", "Offers are a proposed future feature"] },
  { t: "Authenticated before sale", v: <StepPhoto src={U("1647960514922-052047430407")} alt="Close inspection of leather (stock placeholder)" seal />, d: "An independent specialist inspects the bag in person. If it doesn't pass, the sale does not go ahead and nothing is charged.", pts: ["Materials, stitching, hardware and codes", "Record number issued on passing", "JADORI never sells an uninspected bag"], cta: ["How authentication works", "/authenticity"] },
  { t: "The handoff", v: <StepVideo src="/guide/handoff.mp4" poster={U("1683921470299-b8f0f3331657")} label="Receiving a handbag" testid="buy-handoff-video" />, d: "Collect your bag locally or have it delivered within participating Massachusetts areas, with its dust bag and hang tag.", pts: ["Condition confirmed together at handoff", "Service areas to be confirmed at launch", "Support available throughout"] },
  { t: "Make it yours", v: <RecordVisual />, d: "Ownership transfers to you with the condition report and authentication record — a beautifully kept bag, ready for its next chapter.", pts: ["Authentication record kept on file", "Return terms to be confirmed before launch", "Lend it on JADORI later if you wish"] },
];

export default function HowBuyingWorks() {
  return (
    <GuidePage testid="how-buying-works-page" title="How buying works" steps={STEPS}
      intro="Pre-loved, authenticated, ready to keep. Here is every step, from finding a bag to making it yours."
      essentials={[["Owner-set", "Purchase prices"], ["Before sale", "In-person authentication"], ["Graded", "Unretouched condition report"], ["USD", "All prices in US dollars"]]}
      note="Concept prototype. Purchase, return and delivery terms shown are illustrative and not yet final."
      cta={{ title: "A beautifully kept bag, ready for its next chapter.", copy: "Every purchase is authenticated before it's completed.", cta: "Shop bags to buy", to: "/buy/all" }} />
  );
}
