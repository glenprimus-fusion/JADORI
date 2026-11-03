import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { AuthBadge } from "./AuthBadge";
import { usd } from "../../lib/api";

const WKEY = "jadori_wishlist";
const readW = () => { try { return JSON.parse(localStorage.getItem(WKEY)) || []; } catch { return []; } };

const Wish = ({ id }) => {
  const [on, setOn] = useState(() => readW().includes(id));
  const toggle = (e) => {
    e.preventDefault();
    const w = readW();
    const next = w.includes(id) ? w.filter((x) => x !== id) : [...w, id];
    localStorage.setItem(WKEY, JSON.stringify(next));
    setOn(next.includes(id));
  };
  return (
    <button onClick={toggle} aria-label={on ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={on} data-testid={`wishlist-button-${id}`} className="absolute top-3 right-3 z-10 p-1.5 hover:opacity-60 transition-opacity">
      <Heart size={18} strokeWidth={1.1} className={on ? "fill-[#1B1714] text-[#1B1714]" : "text-[#1B1714]"} />
    </button>
  );
};

export const ListingCard = ({ l, mode = "rent" }) => {
  const worn = l.images.find((im) => im.view.startsWith("Worn"));
  return (
    <Link to={`/bag/${l.id}`} className="group block" data-testid={`listing-card-${l.id}`}>
      <div className="relative aspect-[2/3] jd-photo overflow-hidden">
        <img src={l.images[0].url} alt={`${l.brand} ${l.name} (sample image)`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]" />
        {worn && <img src={worn.url} alt="" aria-hidden loading="lazy" className="hidden nav:block absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
        <div className="hidden nav:block absolute top-3 left-3 z-10 bg-[#EFEEEC]/80 px-2 py-0.5"><AuthBadge status={l.auth_status} testid={`listing-auth-${l.id}`} /></div>
        <Wish id={l.id} />
        <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-[#7A716A] group-hover:opacity-0 transition-opacity">Sample</span>
        {!l.available && <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.18em] bg-[#1B1714] text-[#F3F1ED] px-2 py-1">Currently rented</span>}
      </div>
      <div className="pt-4 pb-2 px-0.5">
        <div className="nav:hidden mb-1.5"><AuthBadge status={l.auth_status} testid={`listing-auth-mobile-${l.id}`} /></div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A716A]">{l.brand}</p>
        <p className="mt-1 text-[15px] leading-snug text-[#1B1714]">{l.name}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5 text-[14px]">
          {mode === "buy" && l.buy_enabled ? (
            <span data-testid={`listing-buy-price-${l.id}`}>{usd(l.buy_price)}</span>
          ) : (
            <span data-testid={`listing-rent-price-${l.id}`}>{usd(l.rent_per_day)}<span className="text-[#7A716A]"> / day</span></span>
          )}
          {l.retail_verified && <span className="text-[#7A716A] line-through text-[13px]" title="Retail reference verified (sample)">{usd(l.retail_price)}</span>}
          {mode === "rent" && l.buy_enabled && <span className="text-[13px] text-[#4A423C]">· Buy {usd(l.buy_price)}</span>}
        </div>
        <p className="mt-1.5 text-[12px] text-[#7A716A] flex flex-wrap items-center gap-x-1.5">
          {l.lender.name}
          {l.lender.rating ? <><Star size={10} strokeWidth={1.25} className="fill-[#7A716A] text-[#7A716A]" />{l.lender.rating.toFixed(1)}<span className="opacity-70">(sample)</span></> : <span>· New lender</span>}
          <span>·</span><span className="whitespace-nowrap">{l.lender.city}, MA</span>
        </p>
      </div>
    </Link>
  );
};
