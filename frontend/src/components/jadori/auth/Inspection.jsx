import { useState } from "react";
import { LoadingImg } from "../LoadingImg";

const BAG = "https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/64e75346aff96195fec1f59f116b228beb87b5c68bf89da891bd47fd1b916b68.jpeg";

const POINTS = [
  { x: 40, y: 33, t: "Strap & chain", d: "Weight, link finish, leather threading and the way the chain meets its anchors. Counterfeit chains are often lighter and hollow-sounding." },
  { x: 50, y: 71, t: "Hardware & clasp", d: "Engraving depth, plating colour, screw heads and the precision of the closing turn. Every hardware detail is photographed close up." },
  { x: 36, y: 62, t: "Stitching", d: "Stitch count per inch, thread colour, tension and alignment across the quilting. Matching seams across panels is a hallmark of the real thing." },
  { x: 64, y: 60, t: "Leather & materials", d: "Grain, scent, thickness and how the leather ages. Specialists compare against known reference examples." },
  { x: 73, y: 77, t: "Shape & construction", d: "Edge paint, corner structure, base shape and the symmetry of the silhouette from every side." },
  { x: 50, y: 55, t: "Serial & date code", d: "Serial tags, date codes or microchips are checked for format, placement and consistency with the bag's era." },
];

export const Inspection = () => {
  const [i, setI] = useState(1);
  const p = POINTS[i];
  return (
    <section className="jd-container py-20 nav:py-28" data-testid="auth-inspection">
      <div className="mb-12 nav:mb-16 max-w-3xl">
        <p className="jd-eyebrow mb-4">The inspection · interactive</p>
        <h2 className="text-[28px] nav:text-[42px] leading-[1.12]">Six places a specialist looks first</h2>
        <p className="mt-4 text-[#4A423C]">Tap each point to see what is examined during the in-person inspection.</p>
      </div>
      <div className="grid nav:grid-cols-[1.1fr_1fr] gap-10 nav:gap-16 items-center">
        <div className="relative aspect-[2/3] max-h-[780px] jd-photo overflow-hidden" data-testid="inspection-image">
          <LoadingImg src={BAG} alt="Sample quilted flap bag used to illustrate the inspection" className="absolute inset-0 w-full h-full object-cover" />
          {POINTS.map((pt, k) => (
            <button key={pt.t} onClick={() => setI(k)} aria-label={pt.t} aria-pressed={k === i} data-testid={`inspection-point-${k + 1}`}
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-medium transition-colors duration-300 ${k === i ? "bg-[#1B1714] text-[#F3F1ED] ring-[6px] ring-[#1B1714]/15" : "bg-[#FFFFFF]/95 text-[#1B1714] hover:bg-[#1B1714] hover:text-[#F3F1ED]"}`}>
              {k + 1}
            </button>
          ))}
          <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-[#7A716A]">Sample illustration</span>
        </div>
        <div>
          <ol className="border-t border-[#E2DFDA]">
            {POINTS.map((pt, k) => (
              <li key={pt.t} className="border-b border-[#E2DFDA]">
                <button onClick={() => setI(k)} className="w-full flex items-baseline gap-5 py-5 text-left group" data-testid={`inspection-item-${k + 1}`}>
                  <span className={`font-serif text-[20px] w-8 ${k === i ? "text-[#1B1714]" : "text-[#7A716A]"}`}>0{k + 1}</span>
                  <span className="flex-1">
                    <span className={`block text-[13px] uppercase tracking-[0.16em] font-medium ${k === i ? "" : "text-[#4A423C] group-hover:text-[#1B1714]"}`}>{pt.t}</span>
                    {k === i && <span className="block mt-3 text-[15px] text-[#4A423C] jd-fade" data-testid="inspection-detail">{p.d}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
