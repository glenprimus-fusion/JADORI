import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../lib/api";
import { monthlyEdits } from "../../lib/edits";
import { ListingCard } from "./ListingCard";
import { QuickView } from "./QuickView";
import { LoadingImg, PlaceholderTile } from "./LoadingImg";

const Edit = ({ e, all, flip, onQuick }) => {
  const bags = all ? e.ids.map((id) => all.find((l) => l.id === id)).filter(Boolean) : null;
  return (
    <article className={`grid nav:grid-cols-[1fr_1.35fr] gap-6 nav:gap-10 items-start ${flip ? "nav:[&>*:first-child]:order-2" : ""}`} data-testid={`edit-${e.slug}`}>
      <Link to={`/rent/all?edit=${e.slug}`} className="group block relative aspect-[4/5] overflow-hidden jd-photo" data-testid={`edit-${e.slug}-image-link`}>
        <LoadingImg src={e.img} alt={`${e.title} (stock placeholder)`} loading="lazy" className="absolute inset-0 w-full h-full object-cover duration-[900ms] group-hover:scale-[1.02]" />
        <div className="absolute inset-x-0 bottom-0 p-6 nav:p-8 bg-gradient-to-t from-[#1F1A17]/60 to-transparent text-[#F3F1ED]">
          <p className="text-[11px] uppercase tracking-[0.22em] opacity-80">The edit</p>
          <p className="font-serif text-[30px] nav:text-[40px] leading-tight mt-1">{e.title}</p>
        </div>
      </Link>
      <div className="min-w-0">
        <p className="text-[15px] text-[#4A423C] max-w-md mb-8">{e.blurb}</p>
        <div className="flex nav:grid nav:grid-cols-3 gap-2 nav:gap-3 overflow-x-auto nav:overflow-visible snap-x snap-mandatory jd-scroll -mx-5 px-5 scroll-pl-5 nav:mx-0 nav:px-0">
          {(bags || Array.from({ length: 3 })).map((l, k) => <div key={l?.id || k} className="shrink-0 w-[46vw] nav:w-auto snap-start">{l ? <ListingCard l={l} onQuickView={onQuick} compact /> : <PlaceholderTile />}</div>)}
        </div>
        <Link to={`/rent/all?edit=${e.slug}`} className="jd-btn-outline mt-8" data-testid={`edit-${e.slug}-shop`}>Shop the edit</Link>
      </div>
    </article>
  );
};

export const MonthlyEdits = () => {
  const { month, edits } = monthlyEdits();
  const [all, setAll] = useState(null);
  const [quick, setQuick] = useState(null);
  useEffect(() => { http.get("/listings").then((r) => setAll(r.data)); }, []);
  return (
    <section className="bg-[#FFFFFF] border-y border-[#E2DFDA]" data-testid="rent-edits">
      <div className="jd-container py-20 nav:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 nav:mb-16">
          <div>
            <p className="jd-eyebrow mb-4" data-testid="rent-edits-month">The {month} edits · refreshed monthly</p>
            <h2 className="text-[28px] nav:text-[42px] leading-[1.12] max-w-2xl">Hand-picked for the month ahead</h2>
          </div>
          <p className="text-xs text-[#7A716A]">Curated sample selection</p>
        </div>
        <div className="space-y-20 nav:space-y-28">
          {edits.map((e, i) => <Edit key={e.slug} e={e} all={all} flip={i % 2 === 1} onQuick={setQuick} />)}
        </div>
      </div>
      <QuickView l={quick} onClose={() => setQuick(null)} />
    </section>
  );
};
