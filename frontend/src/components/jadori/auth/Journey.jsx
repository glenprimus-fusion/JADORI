import { useState } from "react";
import { FileSearch, ScanSearch, Stamp, HandHeart, RotateCcw, ClipboardList } from "lucide-react";
import { LoadingImg } from "../LoadingImg";
import { AuthBadge } from "../AuthBadge";

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
const G = (h) => `https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/${h}.jpeg`;

const STAGES = [
  { Ico: ClipboardList, t: "Listed", when: "Day the owner lists", status: "pending", img: G("142c094bd4916c6aad7ce537f74f2dd85c7f724f29dca53202e11e981cb492f4"), d: "The owner adds eight photographs, the serial or date code and any documentation. The listing goes live as “Authenticated before handoff”. It has not been verified yet, and we say so." },
  { Ico: FileSearch, t: "Document review", when: "Within days", status: "pending", img: U("1741086154510-522e68f76933"), d: "Our team reviews the photographs and records for anything that needs a closer look. Listings with clear concerns are paused before anyone can book them." },
  { Ico: ScanSearch, t: "In-person inspection", when: "Before first handoff", status: "pending", img: U("1647960514922-052047430407"), d: "An independent specialist examines the bag by hand: materials, stitching, hardware, codes and construction. If it doesn't pass, any booking is cancelled and fully refunded." },
  { Ico: Stamp, t: "Sealed & recorded", when: "On passing", status: "verified", img: G("64e75346aff96195fec1f59f116b228beb87b5c68bf89da891bd47fd1b916b68"), d: "The bag receives its authentication record and the JADORI seal. Only now does its listing display “Authenticated”." },
  { Ico: HandHeart, t: "Handoff", when: "Your first day", status: "verified", img: U("1683921470299-b8f0f3331657"), d: "The bag reaches you with its hang tag and record number. Its condition is photographed at handoff, unretouched." },
  { Ico: RotateCcw, t: "Return inspection", when: "After every rental", status: "verified", img: U("1575202332411-b01fe9ace7a8"), d: "On return, condition is checked against the handoff photographs before the deposit is released and the bag is rented again." },
];

export const Journey = () => {
  const [i, setI] = useState(0);
  const s = STAGES[i];
  return (
    <section className="bg-[#FFFFFF] border-y border-[#E2DFDA]" id="journey" data-testid="auth-journey">
      <div className="jd-container py-20 nav:py-28">
        <div className="mb-12 max-w-3xl">
          <p className="jd-eyebrow mb-4">Follow a bag's journey</p>
          <h2 className="text-[28px] nav:text-[42px] leading-[1.12]">From closet to your arm, step by step</h2>
          <p className="mt-4 text-[#4A423C]">Select a stage to see what happens and what the listing shows at that moment.</p>
        </div>
        <div className="flex overflow-x-auto jd-scroll border-b border-[#E2DFDA] -mx-5 px-5 nav:mx-0 nav:px-0" role="tablist" data-testid="journey-tabs">
          {STAGES.map((st, k) => (
            <button key={st.t} role="tab" aria-selected={k === i} onClick={() => setI(k)} data-testid={`journey-tab-${k + 1}`}
              className={`shrink-0 flex items-center gap-2.5 px-4 nav:px-5 pb-4 -mb-px border-b text-[11px] uppercase tracking-[0.16em] transition-colors ${k === i ? "border-[#1B1714] text-[#1B1714] font-medium" : "border-transparent text-[#7A716A] hover:text-[#1B1714]"}`}>
              <st.Ico size={15} strokeWidth={1.1} />{String(k + 1).padStart(2, "0")} {st.t}
            </button>
          ))}
        </div>
        <div key={i} className="grid nav:grid-cols-2 gap-10 nav:gap-16 pt-12 items-center jd-fade" data-testid="journey-panel">
          <div className="relative aspect-[4/3] jd-photo overflow-hidden">
            <LoadingImg src={s.img} alt={`${s.t} (sample illustration)`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="max-w-md">
            <p className="jd-eyebrow">{s.when}</p>
            <p className="font-serif text-[30px] nav:text-[38px] mt-3" data-testid="journey-stage-title">{s.t}</p>
            <p className="mt-5 text-[#4A423C]">{s.d}</p>
            <div className="mt-8 p-5 border border-[#E2DFDA] bg-[#F8F7F5]" data-testid="journey-listing-status">
              <p className="jd-label mb-3">What the listing shows</p>
              <AuthBadge status={s.status} testid="journey-status-badge" />
            </div>
            <div className="flex gap-3 mt-8">
              <button disabled={i === 0} onClick={() => setI(i - 1)} className="jd-btn-outline !px-6" data-testid="journey-prev">Previous</button>
              <button disabled={i === STAGES.length - 1} onClick={() => setI(i + 1)} className="jd-btn-solid !px-6" data-testid="journey-next">Next stage</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
