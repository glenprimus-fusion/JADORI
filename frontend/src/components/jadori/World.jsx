import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { http } from "../../lib/api";
import { ListingCard } from "./ListingCard";
import { QuickView } from "./QuickView";
import { PlaceholderTile, LoadingImg } from "./LoadingImg";
import { MonogramPattern } from "./Monogram";

export const WorldHero = ({ world, eyebrow, title, copy, img, imgAlt, ctas, dark = false, testid }) => (
  <section className={dark ? "bg-[#1F1A17] text-[#F3F1ED]" : ""} data-testid={testid}>
    <div className="jd-container grid nav:grid-cols-[1.15fr_1fr] gap-8 nav:gap-16 py-8 nav:py-12 items-center">
      <div className="relative aspect-[4/5] nav:aspect-auto nav:h-[min(76vh,780px)] overflow-hidden jd-photo">
        <LoadingImg src={img} alt={imgAlt} className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute top-5 left-5 font-serif text-[#F3F1ED] text-[40px] nav:text-[64px] tracking-[0.2em] leading-none drop-shadow-sm">{world}</span>
      </div>
      <div className="jd-fade max-w-xl">
        <p className={`text-[11px] uppercase tracking-[0.22em] font-medium mb-5 ${dark ? "text-[#F3F1ED]/60" : "text-[#7A716A]"}`}>{eyebrow}</p>
        <h1 className="text-[34px] nav:text-[54px] leading-[1.06]">{title}</h1>
        <p className={`mt-6 ${dark ? "text-[#F3F1ED]/75" : "text-[#4A423C]"}`}>{copy}</p>
        <div className="flex flex-wrap gap-3 mt-10">{ctas}</div>
      </div>
    </div>
  </section>
);

export const SectionHead = ({ eyebrow, title, children, light = false }) => (
  <div className="mb-12 nav:mb-14 max-w-3xl">
    {eyebrow && <p className={`text-[11px] uppercase tracking-[0.22em] font-medium mb-4 ${light ? "text-[#F3F1ED]/60" : "text-[#7A716A]"}`}>{eyebrow}</p>}
    <h2 className="text-[28px] nav:text-[42px] leading-[1.12]">{title}</h2>
    {children && <p className={`mt-4 ${light ? "text-[#F3F1ED]/75" : "text-[#4A423C]"}`}>{children}</p>}
  </div>
);

export const Timeline = ({ steps, testid, light = false }) => (
  <ol className="grid gap-10 nav:gap-0" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(170px, 1fr))` }} data-testid={testid}>
    {steps.map(([tag, t, d], i) => (
      <li key={t} className="relative nav:pr-8">
        <div className="flex items-center gap-3 mb-5">
          <span className={`w-[11px] h-[11px] rounded-full border ${light ? "border-[#F3F1ED] bg-[#1F1A17]" : "border-[#1B1714] bg-[#F8F7F5]"} ${i === steps.length - 1 ? (light ? "!bg-[#F3F1ED]" : "!bg-[#1B1714]") : ""}`} />
          <span className={`hidden nav:block flex-1 h-px ${light ? "bg-[#F3F1ED]/25" : "bg-[#E2DFDA]"} ${i === steps.length - 1 ? "opacity-0" : ""}`} />
        </div>
        <p className={`text-[11px] uppercase tracking-[0.2em] ${light ? "text-[#F3F1ED]/55" : "text-[#7A716A]"}`}>{tag}</p>
        <p className="font-serif text-[21px] mt-2">{t}</p>
        <p className={`text-[15px] mt-2 ${light ? "text-[#F3F1ED]/70" : "text-[#4A423C]"}`}>{d}</p>
      </li>
    ))}
  </ol>
);

export const Pillars = ({ items, testid }) => (
  <div className="grid sm:grid-cols-2 wide:grid-cols-4 border-t border-l border-[#E2DFDA]" data-testid={testid}>
    {items.map(([Ico, t, d]) => (
      <div key={t} className="p-7 nav:p-8 border-r border-b border-[#E2DFDA] bg-[#FFFFFF]">
        <Ico size={26} strokeWidth={1} />
        <p className="mt-6 text-[13px] uppercase tracking-[0.16em] font-medium">{t}</p>
        <p className="mt-3 text-[15px] text-[#4A423C]">{d}</p>
      </div>
    ))}
  </div>
);

export const FeaturedRow = ({ filter, mode = "rent", title, eyebrow, to, testid }) => {
  const [items, setItems] = useState(null);
  const [quick, setQuick] = useState(null);
  useEffect(() => { http.get("/listings").then((r) => setItems(r.data.filter(filter).slice(0, 4))); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section className="jd-container py-20 nav:py-28" data-testid={testid}>
      <div className="flex items-end justify-between gap-6 mb-10">
        <div><p className="jd-eyebrow mb-3">{eyebrow}</p><h2 className="text-[28px] nav:text-[40px] leading-tight">{title}</h2></div>
        <Link to={to} className="jd-btn-outline hidden sm:inline-flex" data-testid={`${testid}-view-all`}>View all</Link>
      </div>
      <div className="grid grid-cols-2 wide:grid-cols-4 gap-x-2 nav:gap-x-3 gap-y-10">
        {(items || Array.from({ length: 4 })).map((l, k) => l ? <ListingCard key={l.id} l={l} mode={mode} onQuickView={setQuick} /> : <PlaceholderTile key={k} />)}
      </div>
      <Link to={to} className="jd-btn-outline w-full mt-10 sm:hidden">View all</Link>
      <QuickView l={quick} onClose={() => setQuick(null)} />
    </section>
  );
};

export const WorldFAQ = ({ items, testid }) => (
  <section className="jd-container py-20 nav:py-24 grid nav:grid-cols-[1fr_1.6fr] gap-10" data-testid={testid}>
    <h2 className="text-[28px] nav:text-[38px]">Questions</h2>
    <Accordion type="single" collapsible className="border-t border-[#E2DFDA]">
      {items.map(([q, a], i) => (
        <AccordionItem key={q} value={`q${i}`} className="border-[#E2DFDA]">
          <AccordionTrigger className="text-left font-serif text-[19px] font-normal hover:no-underline py-6" data-testid={`${testid}-q${i}`}>{q}</AccordionTrigger>
          <AccordionContent className="text-[15px] text-[#4A423C] leading-relaxed">{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export const CTABand = ({ title, copy, cta, to, testid }) => (
  <section className="relative bg-[#1F1A17] text-[#F3F1ED] overflow-hidden" data-testid={testid}>
    <div className="absolute inset-0"><MonogramPattern color="#F3F1ED" bg="#1F1A17" opacity={0.08} tile={110} testid={`${testid}-pattern`} /></div>
    <div className="relative jd-container py-20 nav:py-28 flex flex-col nav:flex-row nav:items-end justify-between gap-10">
      <div className="max-w-2xl"><h2 className="text-[30px] nav:text-[46px] leading-[1.1]">{title}</h2><p className="mt-5 text-[#F3F1ED]/70">{copy}</p></div>
      <Link to={to} className="jd-btn-light shrink-0" data-testid={`${testid}-button`}>{cta}</Link>
    </div>
  </section>
);
