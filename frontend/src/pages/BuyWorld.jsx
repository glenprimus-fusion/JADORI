import { Link } from "react-router-dom";
import { ShieldCheck, Camera, Home as HomeIcon, FileCheck } from "lucide-react";
import { WorldHero, SectionHead, Timeline, Pillars, FeaturedRow, WorldFAQ, CTABand } from "../components/jadori/World";
import { AuthSeal } from "../components/jadori/AuthBadge";
import { LoadingImg } from "../components/jadori/LoadingImg";

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1300&q=80`;
const G = (h) => `https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/${h}.jpeg`;

const WHY = [
  [ShieldCheck, "Authenticated before sale", "Ownership transfers only after the bag passes an independent, in-person inspection."],
  [Camera, "Honest condition", "Unretouched photographs of every side, the interior, hardware and any wear."],
  [HomeIcon, "From local owners", "Bags kept and cared for by owners across Massachusetts."],
  [FileCheck, "Clear paperwork", "A condition report and authentication record accompany every purchase."],
];

const GRADES = [
  ["Excellent", 3, "Little to no visible wear. Corners, handles and hardware look close to new. Structure fully intact."],
  ["Very good", 2, "Light signs of use, such as faint corner wear or minor hardware marks, documented in the photos."],
  ["Good", 1, "Visible, honest wear from regular use. Every mark is photographed and described before you buy."],
];

const STEPS = [
  ["Browse", "Find it", "Look for bags whose owners have enabled a purchase price."],
  ["Owner confirms", "Request to buy", "Send a request. The owner confirms and the price is held for you."],
  ["Before sale", "Authentication", "The bag is inspected in person before any sale is completed."],
  ["Handoff", "Make it yours", "Local handoff, with the condition report and authentication record."],
];

const FAQ = [
  ["Is the purchase price negotiable?", "Prices are set by each owner. Offers and negotiation are a proposed feature to be confirmed."],
  ["What happens if the bag fails authentication?", "The sale does not go ahead and nothing is charged. JADORI never sells a bag that has not passed inspection."],
  ["Can I return a purchased bag?", "Return terms are being finalised by JADORI and will be shown on every listing before launch."],
  ["Are prices in US dollars?", "Yes. All prices are shown in USD."],
];

const Grades = () => (
  <section className="bg-[#1F1A17] text-[#F3F1ED]" data-testid="buy-condition-guide">
    <div className="jd-container py-20 nav:py-28 grid nav:grid-cols-[1fr_1.4fr] gap-12">
      <div>
        <SectionHead light eyebrow="Condition guide" title="Every bag graded, every mark shown">Grades are reported by the owner and confirmed during inspection. Photos are never retouched to hide wear.</SectionHead>
        <AuthSeal size={120} light />
      </div>
      <div className="divide-y divide-[#F3F1ED]/15 border-y border-[#F3F1ED]/15">
        {GRADES.map(([g, n, d]) => (
          <div key={g} className="py-8 grid sm:grid-cols-[180px_1fr] gap-4" data-testid={`grade-${g.toLowerCase().replace(" ", "-")}`}>
            <div>
              <p className="font-serif text-[26px]">{g}</p>
              <div className="flex gap-1.5 mt-3">{[1, 2, 3].map((i) => <span key={i} className={`h-[3px] w-8 ${i <= n ? "bg-[#F3F1ED]" : "bg-[#F3F1ED]/20"}`} />)}</div>
            </div>
            <p className="text-[15px] text-[#F3F1ED]/75">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TryFirst = () => (
  <section className="jd-container py-20 nav:py-28 grid nav:grid-cols-2 gap-12 items-center" data-testid="buy-try-first">
    <div className="grid grid-cols-2 gap-3">
      <div className="relative aspect-[2/3] jd-photo overflow-hidden"><LoadingImg src={G("4e6bf51ac42d97729a52f948ccbfd54ba6c242963bdcaf4eb3c4d5e0bc1db5cd")} alt="Sample bag, studio" className="absolute inset-0 w-full h-full object-cover" /></div>
      <div className="relative aspect-[2/3] jd-photo overflow-hidden mt-12"><LoadingImg src={U("1683921470299-b8f0f3331657")} alt="Sample bag, worn (stock placeholder)" className="absolute inset-0 w-full h-full object-cover" /></div>
    </div>
    <div className="max-w-md">
      <SectionHead eyebrow="Proposed · to be confirmed" title="Carry it first. Keep it if it's the one.">Many bags can be both rented and bought. Rent it for an occasion, live with it for a few days, then request to buy from its owner.</SectionHead>
      <Link to="/buy/all" className="jd-btn-solid" data-testid="buy-try-first-button">See bags you can rent or buy</Link>
    </div>
  </section>
);

export default function BuyWorld() {
  return (
    <div data-testid="buy-world">
      <WorldHero dark world="BUY" testid="buy-hero" eyebrow="Buy on JADORI" title="Pre-loved, authenticated, ready to keep."
        copy="Some owners choose to part with their bags. Each one is inspected before the sale, documented honestly, and handed over locally with its records."
        img={U("1649544145000-46fb54c2a331")} imgAlt="Woman with a pre-owned handbag (stock placeholder)"
        ctas={<><Link to="/buy/all" className="jd-btn-light" data-testid="buy-hero-shop">Shop bags to buy</Link><a href="#buy-steps" className="jd-btn border border-[#F3F1ED] text-[#F3F1ED] hover:bg-[#F3F1ED] hover:text-[#1F1A17]" data-testid="buy-hero-how">How buying works</a></>} />

      <section className="jd-container py-20 nav:py-28">
        <SectionHead eyebrow="Why buy here" title="The confidence of a boutique, the value of pre-loved" />
        <Pillars items={WHY} testid="buy-why" />
      </section>

      <FeaturedRow testid="buy-featured" mode="buy" eyebrow="Purchase enabled by owner · sample listings" title="Available to keep" to="/buy/all" filter={(l) => l.buy_enabled} />
      <Grades />
      <section id="buy-steps" className="jd-container py-20 nav:py-28 scroll-mt-28">
        <SectionHead eyebrow="The purchase, step by step" title="From request to ownership" />
        <Timeline steps={STEPS} testid="buy-timeline" />
      </section>
      <TryFirst />
      <WorldFAQ items={FAQ} testid="buy-faq" />
      <CTABand testid="buy-cta" title="A beautifully kept bag, ready for its next chapter." copy="Every purchase is authenticated before it's completed." cta="Shop bags to buy" to="/buy/all" />
    </div>
  );
}
