import { Link } from "react-router-dom";
import { UserCheck, Lock, Camera, ShieldCheck, Wrench, Banknote } from "lucide-react";
import { SectionHead } from "./World";
import { TopMark, TOP_CRITERIA } from "./TopLender";

const STAGES = [
  ["Before", "Every renter is verified", [[UserCheck, "Identity checked before their first request"], [Lock, "Refundable deposit held before handoff"], [ShieldCheck, "You approve every request yourself"]]],
  ["During", "Your bag is covered", [[Camera, "Condition photographed at handoff"], [ShieldCheck, "Every renter chooses a protection plan"], [Lock, "Accidental damage covered under the Complete plan"]]],
  ["After", "Claims, handled for you", [[Camera, "Return inspection, photographed side by side"], [Wrench, "Specialist repair arranged if needed"], [Banknote, "Reimbursement up to the bag's verified value"]]],
];

export const LenderProtection = () => (
  <section className="jd-container py-20 nav:py-28" data-testid="lend-protection">
    <SectionHead eyebrow="Lender protection" title="Your bag, looked after at every step">If something happens on a rental, report it within 48 hours of return. JADORI handles the claim with the renter, so you never have to.</SectionHead>
    <div className="grid nav:grid-cols-3 border-t border-[#1B1714]">
      {STAGES.map(([tag, title, rows], i) => (
        <div key={tag} className={`pt-8 pb-10 nav:pr-10 ${i ? "nav:pl-10 nav:border-l border-[#E2DFDA]" : ""} ${i ? "border-t nav:border-t-0 border-[#E2DFDA]" : ""}`} data-testid={`lend-protection-${tag.toLowerCase()}`}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A716A]">{String(i + 1).padStart(2, "0")} · {tag}</p>
          <p className="font-serif text-[24px] mt-3">{title}</p>
          <ul className="mt-6 space-y-4">{rows.map(([Ico, t]) => <li key={t} className="flex gap-4 text-[15px] text-[#4A423C]"><Ico size={18} strokeWidth={1} className="shrink-0 mt-0.5 text-[#1B1714]" />{t}</li>)}</ul>
        </div>
      ))}
    </div>
    <p className="text-[11px] text-[#7A716A] mt-6">Coverage limits, claims process and insurance partner are to be confirmed by JADORI. Shown for presentation only.</p>
  </section>
);

export const TopLenderBand = () => (
  <section className="bg-[#FFFFFF] border-y border-[#E2DFDA]" data-testid="lend-top-lender">
    <div className="jd-container py-20 nav:py-24 grid nav:grid-cols-[auto_1fr_1fr] gap-10 nav:gap-16 items-center">
      <TopMark size={112} />
      <div>
        <p className="jd-eyebrow">Recognition</p>
        <h2 className="text-[28px] nav:text-[40px] leading-[1.12] mt-4">Become a Top Lender</h2>
        <p className="mt-4 text-[#4A423C] max-w-md">Owners who care for renters exceptionally well earn the Top Lender mark, shown on every listing and on their closet page.</p>
        <Link to="/closet/eleanor-v" className="jd-link text-[13px] mt-6 inline-block" data-testid="lend-top-lender-example">See an example closet</Link>
      </div>
      <ul className="space-y-0 border-t border-[#E2DFDA]">
        {TOP_CRITERIA.map((c, i) => <li key={c} className="flex gap-5 py-4 border-b border-[#E2DFDA] text-[15px]"><span className="font-serif text-[#7A716A]">{String(i + 1).padStart(2, "0")}</span>{c}</li>)}
      </ul>
    </div>
  </section>
);
