import { Link } from "react-router-dom";
import { DOORS, JOURNEYS, SUSTAIN } from "../lib/content";
import { ConceptNote } from "../components/jadori/Layout";

export default function Lend() {
  return (
    <div data-testid="lend-page">
      <section className="jd-container grid nav:grid-cols-2 gap-10 nav:gap-16 pt-8 nav:pt-12 pb-20 items-center">
        <div className="aspect-[4/5] jd-photo overflow-hidden order-1 nav:order-none"><img src={DOORS.lend} alt="Handbag owner (stock placeholder)" className="w-full h-full object-cover" /></div>
        <div className="jd-fade">
          <p className="jd-eyebrow mb-4">Lend with JADORI</p>
          <h1 className="text-[34px] nav:text-[52px] leading-[1.08]">Make money from a bag sitting in your closet.</h1>
          <p className="mt-6 text-[#4A423C] max-w-md">List your designer handbag, set your daily rate, and choose whether to offer it for sale. Every bag is independently authenticated before its first handoff.</p>
          <div className="flex flex-wrap gap-3 mt-10">
            <Link to="/lend/new" className="jd-btn-solid" data-testid="lend-start-listing-button">Start a listing</Link>
            <Link to="/account/lender" className="jd-btn-outline" data-testid="lend-dashboard-link">Lender dashboard</Link>
          </div>
          <div className="mt-8"><ConceptNote>Earnings, payouts and insurance terms are to be defined. Nothing shown here is a financial promise.</ConceptNote></div>
        </div>
      </section>
      <section className="bg-[#FFFFFF] border-y border-[#E2DFDA]">
        <div className="jd-container py-20 grid nav:grid-cols-4 gap-10">
          {JOURNEYS.lend.map(([t, d], i) => (
            <div key={t} className="border-t border-[#1B1714] pt-6" data-testid={`lend-step-${i + 1}`}>
              <p className="font-serif text-[34px] text-[#7A716A]">0{i + 1}</p>
              <p className="mt-4 font-medium">{t}</p>
              <p className="text-[15px] text-[#4A423C] mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="jd-container py-20 grid nav:grid-cols-[1fr_1.3fr] gap-10">
        <h2 className="text-[28px] nav:text-[38px] leading-tight">What to photograph</h2>
        <div>
          <p className="text-[#4A423C]">Front, back, both sides, bottom, interior, hardware, and any wear or damage. Only your main thumbnail has its background cleaned automatically; every other photo stays exactly as taken so renters see the bag's true condition.</p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#4A423C]">{SUSTAIN.map((s) => <li key={s}>— {s}</li>)}</ul>
        </div>
      </section>
    </div>
  );
}
