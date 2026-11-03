import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { AuthBadge, SampleTag } from "./AuthBadge";
import { usd } from "../../lib/api";

export const ListingCard = ({ l, mode = "rent" }) => (
  <Link to={`/bag/${l.id}`} className="group block" data-testid={`listing-card-${l.id}`}>
    <div className="relative aspect-[2/3] jd-photo overflow-hidden jd-zoom">
      <img src={l.images[0].url} alt={`${l.brand} ${l.name} (sample image)`} loading="lazy" className="absolute inset-0 w-full h-full object-cover jd-cleaned" />
      <SampleTag className="absolute top-3 left-3" />
      {!l.available && <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-[#1B1714] text-[#F3F1ED] px-2 py-1">Currently rented</span>}
    </div>
    <div className="pt-4 space-y-1.5">
      <AuthBadge status={l.auth_status} testid={`listing-auth-${l.id}`} />
      <p className="jd-eyebrow !text-[#1B1714]">{l.brand}</p>
      <p className="font-serif text-[17px] leading-snug">{l.name}</p>
      <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
        {mode === "buy" && l.buy_enabled ? (
          <span className="font-medium" data-testid={`listing-buy-price-${l.id}`}>{usd(l.buy_price)}</span>
        ) : (
          <span className="font-medium" data-testid={`listing-rent-price-${l.id}`}>{usd(l.rent_per_day)}<span className="text-[#7A716A] font-normal"> / day</span></span>
        )}
        {l.retail_verified && <span className="text-[#7A716A] line-through" title="Retail reference verified (sample)">{usd(l.retail_price)} retail</span>}
      </div>
      {mode === "rent" && l.buy_enabled && <p className="text-xs text-[#4A423C]">Also to buy · {usd(l.buy_price)}</p>}
      <p className="text-xs text-[#7A716A] flex items-center gap-1.5">
        {l.lender.name}
        {l.lender.rating ? <><span>·</span><Star size={11} strokeWidth={1.25} className="fill-[#1B1714] text-[#1B1714]" />{l.lender.rating.toFixed(1)} <span className="opacity-70">(sample)</span></> : <><span>·</span>New lender</>}
        <span>·</span>{l.lender.city}, MA
      </p>
    </div>
  </Link>
);
