import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { LoadingImg } from "../components/jadori/LoadingImg";
import { AuthSeal } from "../components/jadori/AuthBadge";
import { MonogramPattern, Monogram } from "../components/jadori/Monogram";
import { CTABand, SectionHead } from "../components/jadori/World";

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
const G = (h) => `https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/${h}.jpeg`;
const BAG1 = G("64e75346aff96195fec1f59f116b228beb87b5c68bf89da891bd47fd1b916b68");

const Photo = ({ src, alt }) => (
  <div className="relative aspect-[4/5] jd-photo overflow-hidden"><LoadingImg src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" /></div>
);

const BrowseVisual = () => (
  <div className="aspect-[4/5] bg-[#EFEEEC] p-6 nav:p-8 grid grid-cols-2 gap-3 content-center">
    {["64e75346aff96195fec1f59f116b228beb87b5c68bf89da891bd47fd1b916b68", "4e6bf51ac42d97729a52f948ccbfd54ba6c242963bdcaf4eb3c4d5e0bc1db5cd", "8d841ae92dbb4357e99d2c626ced2b806a257cd7fee127d3de32f127a976f2eb", "72e38f5337f1d5a9e79dd0a4f35dfaac33b85e02179f0d4901f1ef5b2dbf1530"].map((h) => (
      <div key={h} className="bg-[#F8F7F5]"><div className="relative aspect-[2/3]"><LoadingImg src={G(h)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" /></div><div className="h-2 w-2/3 bg-[#E2DFDA] m-2" /><div className="h-2 w-1/3 bg-[#E2DFDA] mx-2 mb-2" /></div>
    ))}
  </div>
);

const DatesVisual = () => {
  const sel = [12, 13, 14];
  return (
    <div className="aspect-[4/5] bg-[#EFEEEC] flex items-center justify-center p-6">
      <div className="bg-[#FFFFFF] p-6 w-full max-w-[360px] shadow-[0_24px_50px_-28px_rgba(27,23,20,0.5)]">
        <p className="jd-label mb-4">Choose your dates · example</p>
        <div className="grid grid-cols-7 gap-1 text-center text-[12px]">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <span key={i} className="text-[#7A716A] py-1">{d}</span>)}
          {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
            <span key={d} className={`py-2 ${sel.includes(d) ? "bg-[#1B1714] text-[#F3F1ED]" : d < 9 ? "text-[#E2DFDA]" : ""}`}>{d}</span>
          ))}
        </div>
        <div className="flex justify-between mt-5 pt-4 border-t border-[#E2DFDA] text-sm"><span>Thu 12 → Sat 14</span><span className="font-medium">3 days</span></div>
      </div>
    </div>
  );
};

const FeesVisual = () => (
  <div className="aspect-[4/5] bg-[#EFEEEC] flex items-center justify-center p-6">
    <div className="bg-[#FFFFFF] p-6 w-full max-w-[360px] shadow-[0_24px_50px_-28px_rgba(27,23,20,0.5)] text-[14px]">
      <div className="flex gap-4 items-center mb-5"><div className="relative w-14 aspect-[2/3]"><LoadingImg src={BAG1} alt="" className="absolute inset-0 w-full h-full object-cover" /></div><div><p className="jd-eyebrow !text-[#1B1714]">Chanel · sample</p><p className="font-serif">Quilted Flap</p></div></div>
      {[["$145 × 3 days", "$435"], ["Service fee (10%)", "$44"], ["Authentication & handling", "$25"], ["Damage protection", "$12"], ["Refundable deposit", "$1,350"]].map(([k, v]) => <div key={k} className="flex justify-between py-2 border-b border-[#E2DFDA]"><span className="text-[#4A423C]">{k}</span><span>{v}</span></div>)}
      <div className="flex justify-between pt-3 font-medium"><span>Total due</span><span>$1,866</span></div>
      <div className="h-[44px] bg-[#1B1714] text-[#F3F1ED] text-[11px] uppercase tracking-[0.18em] flex items-center justify-center mt-5">Request to rent</div>
    </div>
  </div>
);

const AuthVisual = () => (
  <div className="relative aspect-[4/5] jd-photo overflow-hidden">
    <LoadingImg src={U("1741086154510-522e68f76933")} alt="Close inspection of leather grain and stitching (stock placeholder)" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute bottom-5 right-5 bg-[#FFFFFF] p-3 rounded-full"><AuthSeal size={90} /></div>
  </div>
);

const ReturnVisual = () => (
  <div className="relative aspect-[4/5] bg-[#EFEEEC] flex items-center justify-center p-10">
    <div className="relative w-[70%] aspect-[4/5] shadow-[0_24px_50px_-24px_rgba(27,23,20,0.5)] overflow-hidden"><MonogramPattern opacity={0.9} tile={80} testid="return-dust-bag" /></div>
    <div className="absolute bottom-6 left-6 bg-[#1F1A17] text-[#F3F1ED] px-4 py-3 flex items-center gap-3"><Monogram size={28} color="#F3F1ED" knock="#1F1A17" testid="return-tag" /><span className="text-[11px] uppercase tracking-[0.18em]">Deposit released</span></div>
  </div>
);

const STEPS = [
  { t: "Discover your bag", v: <BrowseVisual />, d: "Browse authenticated designer handbags from owners across Massachusetts. Filter by brand, style, colour and availability, or shop a monthly edit.", pts: ["Clean studio photos of every bag", "Lender profile and city on each listing", "Tap any label to see its authentication status"], cta: ["Browse bags to rent", "/rent/all"] },
  { t: "Choose your dates", v: <DatesVisual />, d: "Select a start and end date on the bag's page. The minimum rental is two days; the owner confirms your request.", pts: ["Plan up to a week ahead", "See the exact rental duration", "Nothing is charged until confirmed"] },
  { t: "Review every fee", v: <FeesVisual />, d: "Before you request, you see the full total: daily price, service fee, authentication and handling, damage protection and a refundable deposit.", pts: ["No hidden costs", "Deposit returned after the return check", "Prices always in US dollars"] },
  { t: "Authenticated before handoff", v: <AuthVisual />, d: "Every bag is independently inspected in person before it reaches you. If it doesn't pass, your booking is cancelled and fully refunded.", pts: ["Materials, stitching, hardware and codes", "Condition photographed, never retouched", "A record number for authenticated bags"], cta: ["How authentication works", "/authenticity"] },
  { t: "The handoff", v: <Photo src={U("1683921470299-b8f0f3331657")} alt="Receiving a handbag (stock placeholder)" />, d: "Collect your bag locally or have it delivered within participating Massachusetts areas, with its dust bag and hang tag.", pts: ["Boston, Brookline, Cambridge, Newton, Somerville", "Condition confirmed together at handoff", "Service areas to be confirmed at launch"] },
  { t: "Carry it", v: <Photo src={U("1746730921536-6123c87a074d")} alt="Carrying a designer bag to an occasion (stock placeholder)" />, d: "Wear it to the wedding, the gala or the weekend away. Damage protection covers everyday wear while it's with you.", pts: ["Care card included with every bag", "Support available throughout your rental", "Love it? Ask the owner if it's for sale"] },
  { t: "Return & deposit released", v: <ReturnVisual />, d: "Return the bag in its dust bag on your end date. Once the return check matches the handoff photos, your deposit is released.", pts: ["Simple local return", "Condition compared against handoff photos", "Late-return terms to be confirmed"] },
];

export default function HowRentingWorks() {
  return (
    <div data-testid="how-renting-works-page">
      <section className="jd-container pt-14 nav:pt-20 pb-16 grid nav:grid-cols-[1.2fr_1fr] gap-12 items-end">
        <div className="jd-fade">
          <p className="jd-eyebrow mb-5">A visual guide</p>
          <h1 className="text-[38px] nav:text-[64px] leading-[1.03]">How renting works</h1>
          <p className="mt-6 text-[#4A423C] max-w-lg">Why pay full price when you can rent it for a few days? Here is every step, from choosing a bag to getting your deposit back.</p>
        </div>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px]" data-testid="hrw-index">
          {STEPS.map((s, i) => <li key={s.t}><a href={`#step-${i + 1}`} className="flex gap-3 py-1.5 border-b border-[#E2DFDA] hover:border-[#1B1714] transition-colors" data-testid={`hrw-index-${i + 1}`}><span className="text-[#7A716A]">0{i + 1}</span>{s.t}</a></li>)}
        </ol>
      </section>

      <div className="border-t border-[#E2DFDA]">
        {STEPS.map((s, i) => (
          <section key={s.t} id={`step-${i + 1}`} className={`scroll-mt-28 ${i % 2 ? "bg-[#FFFFFF]" : ""} border-b border-[#E2DFDA]`} data-testid={`hrw-step-${i + 1}`}>
            <div className={`jd-container py-16 nav:py-24 grid nav:grid-cols-2 gap-10 nav:gap-20 items-center ${i % 2 ? "nav:[&>*:first-child]:order-2" : ""}`}>
              <div className="max-w-[560px] w-full">{s.v}</div>
              <div className="max-w-md">
                <p className="font-serif text-[56px] nav:text-[80px] leading-none text-[#E2DFDA]">0{i + 1}</p>
                <h2 className="text-[28px] nav:text-[40px] leading-tight mt-4">{s.t}</h2>
                <p className="mt-5 text-[#4A423C]">{s.d}</p>
                <ul className="mt-7 space-y-2.5">{s.pts.map((p) => <li key={p} className="flex gap-3 text-[15px]"><Check size={16} strokeWidth={1.25} className="mt-1 shrink-0" />{p}</li>)}</ul>
                {s.cta && <Link to={s.cta[1]} className="jd-btn-outline mt-9" data-testid={`hrw-step-${i + 1}-cta`}>{s.cta[0]}</Link>}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="jd-container py-20 nav:py-24">
        <SectionHead eyebrow="Good to know" title="The essentials, at a glance" />
        <div className="grid sm:grid-cols-2 wide:grid-cols-4 border-t border-l border-[#E2DFDA]" data-testid="hrw-essentials">
          {[["2 days", "Minimum rental"], ["10%", "Service fee (illustrative)"], ["Refundable", "Deposit, after return check"], ["USD", "All prices in US dollars"]].map(([a, b]) => (
            <div key={b} className="p-8 border-r border-b border-[#E2DFDA] bg-[#FFFFFF]"><p className="font-serif text-[34px]">{a}</p><p className="text-[12px] uppercase tracking-[0.16em] text-[#7A716A] mt-2">{b}</p></div>
          ))}
        </div>
        <p className="text-xs text-[#7A716A] mt-4">Concept prototype. Fees, service areas and policies shown are illustrative and not yet final.</p>
      </section>
      <CTABand testid="hrw-cta" title="Ready for your next occasion?" copy="Find an authenticated bag for exactly the dates you need." cta="Browse bags to rent" to="/rent/all" />
    </div>
  );
}
