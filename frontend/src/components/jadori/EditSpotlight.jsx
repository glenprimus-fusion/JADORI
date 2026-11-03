import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { http } from "../../lib/api";
import { monthlyEdits } from "../../lib/edits";

const Thumb = ({ l }) => (
  <Link to={`/bag/${l.id}`} className="group block jd-zoom" data-testid={`spotlight-bag-${l.id}`}>
    <div className="aspect-[2/3] overflow-hidden jd-photo">
      <img src={l.images[0].url} alt={`${l.brand} ${l.name} (sample)`} loading="lazy" className="w-full h-full object-cover" />
    </div>
    <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-[#7A716A] truncate">{l.brand}</p>
    <p className="text-[13px] leading-snug truncate">{l.name}</p>
    <p className="text-[12px] text-[#7A716A] mt-0.5">${l.rent_per_day}/day</p>
  </Link>
);

export const EditSpotlight = () => {
  const { month, edits } = monthlyEdits();
  const e = edits[0];
  const [bags, setBags] = useState([]);
  useEffect(() => {
    http.get("/listings").then((r) => setBags(e.ids.map((id) => r.data.find((l) => l.id === id)).filter(Boolean))).catch(() => setBags(null));
  }, [e.slug]); // eslint-disable-line react-hooks/exhaustive-deps
  const to = `/rent/all?edit=${e.slug}`;
  return (
    <section className="jd-container pt-20 nav:pt-28" data-testid="home-edit-spotlight">
      <div className="grid nav:grid-cols-[1.25fr_1fr] gap-8 nav:gap-16 items-center">
        <Link to={to} className="relative block aspect-[4/5] nav:aspect-auto nav:h-[min(82vh,860px)] overflow-hidden jd-photo jd-zoom" data-testid="spotlight-image-link">
          <img src={e.img} alt={`${e.title} edit (stock placeholder)`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#1F1A17]/50 to-transparent nav:hidden">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#F3F1ED]">The {month} Edit</p>
          </div>
        </Link>
        <div className="nav:py-10">
          <p className="jd-eyebrow hidden nav:block" data-testid="spotlight-eyebrow">The {month} Edit</p>
          <h2 className="font-serif text-[34px] nav:text-[52px] leading-[1.05] nav:mt-5" data-testid="spotlight-title">{e.title}</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#4A423C] max-w-md" data-testid="spotlight-blurb">{e.blurb}</p>
          {bags && <div className="mt-10 grid grid-cols-3 gap-3 nav:gap-4" data-testid="spotlight-bags">
            {(bags.length ? bags : e.ids.map(() => null)).map((l, k) => l ? <Thumb key={l.id} l={l} /> : <div key={k} className="aspect-[2/3] jd-photo animate-pulse" />)}
          </div>}
          <Link to={to} className="jd-btn-outline mt-10 w-full sm:w-auto gap-3 group" data-testid="spotlight-discover">
            Discover the edit <ArrowRight size={15} strokeWidth={1.25} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
