import { useState } from "react";
import { LoadingImg } from "../LoadingImg";
import { FitFigure, placement, sitsAt } from "./FitFigure";
import { DimensionsDrawing, WhatFits } from "./FitDetails";

const Card = ({ eyebrow, title, children, testid }) => (
  <div className="bg-[#FFFFFF] border border-[#E2DFDA] rounded-[28px] p-6 nav:p-10" data-testid={testid}>
    <p className="jd-eyebrow">{eyebrow}</p>
    <h3 className="font-serif text-[24px] nav:text-[28px] mt-2 mb-8">{title}</h3>
    {children}
  </div>
);

export const HowItWears = ({ l }) => {
  const f = l.fit;
  const [way, setWay] = useState(f.carry[0].way);
  const c = f.carry.find((x) => x.way === way);
  const p = placement(way, c.drop, f);
  const photo = l.images.find((im) => im.on_model && im.carry === way);
  const height = f.model_height || "5'9\"";

  return (
    <section className="jd-container mt-20 nav:mt-28" data-testid="how-it-wears">
      <div className="max-w-2xl mb-10 nav:mb-14">
        <p className="jd-eyebrow">How it wears</p>
        <h2 className="text-[30px] nav:text-[44px] leading-[1.08] mt-4">See it on the body</h2>
        <p className="mt-4 text-[#4A423C]">Choose a way to carry it. The figure is drawn to scale at {height}.</p>
      </div>
      <div className="grid nav:grid-cols-2 gap-4 nav:gap-6">
        <div className="bg-[#FFFFFF] border border-[#E2DFDA] rounded-[28px] p-6 nav:p-10 flex flex-col" data-testid="fit-guide">
          <div className="flex flex-wrap gap-2" data-testid="fit-carry-options">
            {f.carry.map((x) => (
              <button key={x.way} onClick={() => setWay(x.way)} aria-pressed={way === x.way} data-testid={`fit-carry-${x.way.toLowerCase().replace(/ /g, "-")}`}
                className={`jd-chip h-[40px] px-5 border text-[11px] uppercase tracking-[0.16em] ${way === x.way ? "bg-[#1B1714] text-[#F3F1ED] border-[#1B1714]" : "border-[#E2DFDA] hover:border-[#1B1714]"}`}>{x.way}</button>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center py-6"><div className="w-full max-w-[340px]"><FitFigure p={p} color={l.color} drop={c.drop} height={height} /></div></div>
          <p className="text-[15px]" data-testid="fit-summary"><span className="font-medium">{way}</span> · {c.drop}″ strap drop · sits {sitsAt(p)} on a {height} frame.</p>
          <p className="text-[11px] text-[#7A716A] mt-2">Sample measurements for the prototype. Lenders confirm exact sizes.</p>
        </div>
        <div className="relative rounded-[28px] overflow-hidden jd-photo aspect-[4/5] nav:aspect-auto nav:min-h-[420px]" data-testid="fit-model-photo">
          <LoadingImg key={photo?.url || "studio"} src={photo ? photo.url : l.images[0].url} alt={`${l.brand} ${l.name} ${photo ? photo.view : "studio view"} (sample image)`} className={`absolute inset-0 w-full h-full object-cover jd-fade ${photo ? "" : "jd-cleaned"}`} />
          <span className="absolute bottom-5 left-5 right-5 bg-[#FFFFFF]/90 rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-center" data-testid="fit-model-caption">
            {photo ? `${photo.view} · model is ${height}` : "On-model photography coming soon"}
          </span>
        </div>
      </div>
      <div className="grid nav:grid-cols-2 gap-4 nav:gap-6 mt-4 nav:mt-6">
        <Card eyebrow="Dimensions" title="Size, drawn to scale" testid="fit-dimensions-card"><DimensionsDrawing f={f} /></Card>
        <Card eyebrow="What fits inside" title="Room for the essentials" testid="fit-fits-card"><WhatFits fits={f.fits} /></Card>
      </div>
    </section>
  );
};
