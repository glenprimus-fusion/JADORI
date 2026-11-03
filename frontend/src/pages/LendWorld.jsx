import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, CheckSquare, Camera, Lock, ImagePlus } from "lucide-react";
import { usd } from "../lib/api";
import { BRANDS, CONDITIONS } from "../lib/content";
import { WorldHero, SectionHead, Timeline, Pillars, WorldFAQ, CTABand } from "../components/jadori/World";
import { MonogramPattern } from "../components/jadori/Monogram";
import { DOORS } from "../lib/content";

const COMMISSION = 0.2;

const Slider = ({ label, value, set, min, max, step, fmt, testid }) => (
  <label className="block">
    <div className="flex justify-between items-baseline"><span className="jd-label">{label}</span><span className="font-serif text-[22px]" data-testid={`${testid}-value`}>{fmt(value)}</span></div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} data-testid={testid} className="w-full mt-4 accent-[#1B1714]" />
  </label>
);

const Estimator = () => {
  const [rate, setRate] = useState(95);
  const [days, setDays] = useState(6);
  const gross = rate * days;
  const net = Math.round(gross * (1 - COMMISSION));
  return (
    <section className="bg-[#FFFFFF] border-y border-[#E2DFDA]" data-testid="lend-estimator">
      <div className="jd-container py-20 nav:py-28 grid nav:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHead eyebrow="Earnings illustration" title="What could your bag earn?">Move the sliders to see an illustration. Your daily rate is always your choice.</SectionHead>
          <div className="space-y-10 max-w-md">
            <Slider label="Daily rental rate" value={rate} set={setRate} min={40} max={300} step={5} fmt={usd} testid="estimator-rate" />
            <Slider label="Rental days per month" value={days} set={setDays} min={1} max={15} step={1} fmt={(v) => `${v} ${v === 1 ? "day" : "days"}`} testid="estimator-days" />
          </div>
        </div>
        <div className="bg-[#1F1A17] text-[#F3F1ED] p-8 nav:p-12 relative overflow-hidden">
          <div className="absolute inset-0"><MonogramPattern color="#F3F1ED" bg="#1F1A17" opacity={0.06} tile={100} testid="estimator-pattern" /></div>
          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#F3F1ED]/60">Illustrative monthly earnings</p>
            <p className="font-serif text-[56px] nav:text-[72px] leading-none mt-4" data-testid="estimator-monthly">{usd(net)}</p>
            <div className="mt-8 space-y-2 text-[15px] text-[#F3F1ED]/75">
              <div className="flex justify-between border-b border-[#F3F1ED]/15 pb-2"><span>Rental income</span><span>{usd(gross)}</span></div>
              <div className="flex justify-between border-b border-[#F3F1ED]/15 pb-2"><span>JADORI commission (20%, proposed)</span><span>−{usd(gross - net)}</span></div>
              <div className="flex justify-between"><span>Over 12 months</span><span data-testid="estimator-yearly">{usd(net * 12)}</span></div>
            </div>
            <p className="text-[11px] text-[#F3F1ED]/50 mt-8">Illustration only, not a promise of earnings. Commission and payout terms are to be confirmed by JADORI.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const VIEWS = ["Front", "Back", "Left side", "Right side", "Bottom", "Interior", "Hardware", "Wear & damage"];
const PhotoGuide = () => (
  <section className="jd-container py-20 nav:py-28 grid nav:grid-cols-[1fr_1.3fr] gap-12" data-testid="lend-photo-guide">
    <SectionHead eyebrow="Photograph your bag" title="Eight views, honestly shown">Only the front image becomes your cleaned catalogue thumbnail. Every other photo stays exactly as taken, so renters see its true condition.</SectionHead>
    <div className="grid grid-cols-4 gap-2 nav:gap-3">
      {VIEWS.map((v, i) => (
        <div key={v} className={`aspect-[2/3] flex flex-col items-center justify-center gap-2 text-center p-2 text-[10px] nav:text-[11px] uppercase tracking-[0.12em] ${i === 0 ? "bg-[#1B1714] text-[#F3F1ED]" : "jd-photo text-[#4A423C]"}`}>
          {i === 0 ? <Camera size={20} strokeWidth={1} /> : <ImagePlus size={18} strokeWidth={1} />}{v}
          {i === 0 && <span className="text-[9px] opacity-60 normal-case tracking-normal">Background cleaned</span>}
        </div>
      ))}
    </div>
  </section>
);

const Accept = () => (
  <section className="jd-container py-20 nav:py-28" data-testid="lend-accept">
    <SectionHead eyebrow="What we accept" title="Designer handbags, cared for and complete" />
    <div className="grid nav:grid-cols-3 gap-10 border-t border-[#1B1714] pt-10">
      <div><p className="jd-label mb-4">Brands at launch</p><ul className="space-y-1.5 font-serif text-[20px]">{BRANDS.map((b) => <li key={b.name}>{b.name}{b.provisional ? <span className="font-sans text-[11px] text-[#7A716A] ml-2">to be confirmed</span> : null}</li>)}</ul></div>
      <div><p className="jd-label mb-4">Condition</p><ul className="space-y-1.5 font-serif text-[20px]">{CONDITIONS.map((c) => <li key={c}>{c}</li>)}</ul><p className="text-sm text-[#4A423C] mt-4">Bags with structural damage, odour or missing original hardware can't be listed.</p></div>
      <div><p className="jd-label mb-4">Helpful to have</p><ul className="space-y-2 text-[15px] text-[#4A423C]">{["Serial or date code", "Dust bag and box", "Original receipt (optional)", "Strap and any inserts"].map((x) => <li key={x} className="flex gap-3"><CheckSquare size={16} strokeWidth={1} className="mt-1 shrink-0" />{x}</li>)}</ul></div>
    </div>
  </section>
);

const STEPS = [
  ["Day one", "List", "Add details and eight photographs. It takes about ten minutes."],
  ["Within days", "Review", "Our team reviews your photos, details and documentation."],
  ["Before first rental", "Authenticate", "An independent specialist inspects the bag in person."],
  ["Live", "Approve requests", "You approve every rental request for your bag."],
  ["After each rental", "Get paid", "Payout follows each completed rental (terms to be confirmed)."],
];

const PROTECT = [
  [ShieldCheck, "Your approval", "Nothing is rented without you accepting the request."],
  [Lock, "Deposits held", "Every renter pays a refundable deposit before handoff."],
  [Camera, "Documented condition", "Condition is photographed before and after each rental."],
  [CheckSquare, "Damage protection", "Renters pay a daily protection fee. Coverage terms to be finalised."],
];

const FAQ = [
  ["Do I keep ownership of my bag?", "Yes. Your bag stays yours. You can also choose to offer it for sale by enabling a purchase price."],
  ["Who pays for authentication?", "Authentication is arranged by JADORI before the first handoff. Fee structure to be confirmed."],
  ["Can I pause my listing?", "Yes. You'll be able to pause or remove your listing at any time from your lender dashboard."],
  ["Where do handoffs happen?", "Initially in participating Massachusetts areas such as Boston, Brookline, Cambridge, Newton and Somerville."],
];

export default function LendWorld() {
  return (
    <div data-testid="lend-page">
      <WorldHero world="LEND" testid="lend-hero" eyebrow="Lend with JADORI" title="Make money from a bag sitting in your closet."
        copy="List your designer handbag, set your daily rate, and choose whether to offer it for sale. Every bag is independently authenticated before its first handoff."
        img={DOORS.lend} imgAlt="Handbag owner presenting her bag (stock placeholder)"
        ctas={<><Link to="/lend/new" className="jd-btn-solid" data-testid="lend-start-listing-button">Start a listing</Link><Link to="/how-lending-works" className="jd-btn-outline" data-testid="lend-how-page">How lending works</Link></>} />
      <section className="jd-container py-20 nav:py-28">
        <SectionHead eyebrow="The lending journey" title="From closet to first rental" />
        <Timeline steps={STEPS} testid="lend-timeline" />
      </section>
      <Estimator />
      <Accept />
      <PhotoGuide />
      <section className="jd-container pb-20 nav:pb-28">
        <SectionHead eyebrow="Lender protection" title="Your bag, looked after" />
        <Pillars items={PROTECT} testid="lend-protection" />
      </section>
      <WorldFAQ items={FAQ} testid="lend-faq" />
      <CTABand testid="lend-cta" title="Give your bag a second life, and an income." copy="Renting gives designer handbags a longer useful life and helps more people enjoy them." cta="Start a listing" to="/lend/new" />
    </div>
  );
}
