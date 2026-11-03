import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { http, usd } from "../lib/api";
import { Gallery } from "../components/jadori/Gallery";
import { BookingCard } from "../components/jadori/BookingCard";
import { AuthBadge, AuthSeal, SampleTag } from "../components/jadori/AuthBadge";

const AuthCard = ({ l }) => (
  <div className={`p-6 flex gap-5 items-start ${l.auth_status === "verified" ? "bg-[#1F1A17] text-[#F3F1ED]" : "border border-[#E2DFDA]"}`} data-testid="authenticity-card">
    {l.auth_status === "verified" ? <AuthSeal size={72} light /> : <div className="w-[72px] h-[72px] shrink-0 rounded-full border border-dashed border-[#7A716A]" aria-hidden />}
    <div>
      <p className="text-xs uppercase tracking-[0.18em] font-medium" data-testid="authenticity-card-status">{l.auth_status === "verified" ? "Authenticated" : "Authenticated before handoff"}</p>
      <p className={`text-sm mt-2 ${l.auth_status === "verified" ? "text-[#F3F1ED]/75" : "text-[#4A423C]"}`}>
        {l.auth_status === "verified"
          ? "This bag passed an independent in-person inspection before a previous rental. (Sample status for the prototype.)"
          : "This listing is new. It will be independently inspected in person before it reaches you. If it does not pass, your booking is cancelled and fully refunded."}
      </p>
      <Link to="/authenticity" className={`text-xs mt-3 inline-block underline underline-offset-4 ${l.auth_status === "verified" ? "decoration-[#F3F1ED]/40" : "decoration-[#E2DFDA]"}`} data-testid="authenticity-card-link">How authentication works</Link>
    </div>
  </div>
);

const Lender = ({ l }) => (
  <div className="flex items-center gap-4 py-5 border-y border-[#E2DFDA]" data-testid="lender-profile">
    <div className="w-12 h-12 rounded-full jd-photo flex items-center justify-center font-serif text-lg">{l.lender.name[0]}</div>
    <div className="text-sm">
      <p className="font-medium">Lent by {l.lender.name}</p>
      <p className="text-[#7A716A] flex items-center gap-1.5">
        {l.lender.rating ? <><Star size={12} strokeWidth={1.25} className="fill-[#1B1714] text-[#1B1714]" />{l.lender.rating.toFixed(1)} sample rating</> : "New lender · no reviews yet"} · {l.lender.city}, MA
      </p>
    </div>
  </div>
);

const INFO = (l) => [
  ["details", "Details", `${l.color}. ${l.description} Dimensions and materials to be supplied by the lender.`],
  ["condition", "Condition report", `Lender-reported condition: ${l.condition}. Condition photographs are unretouched — wear is documented, never removed. Only the main thumbnail background is cleaned.`],
  ["delivery", "Delivery & returns", "Local handoff or courier within participating Massachusetts areas (service areas to be confirmed at launch). The refundable deposit is released after the return inspection."],
];

export default function Product() {
  const { id } = useParams();
  const [l, setL] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => { http.get(`/listings/${id}`).then((r) => setL(r.data)).catch(() => setErr(true)); }, [id]);
  if (err) return <div className="jd-container py-32 text-center"><p className="font-serif text-3xl">This bag could not be found.</p><Link to="/rent" className="jd-btn-outline mt-8">Back to catalogue</Link></div>;
  if (!l) return <div className="jd-container py-10"><div className="aspect-[4/5] max-w-3xl jd-photo animate-pulse" /></div>;

  return (
    <div data-testid="product-page" className="pb-28 nav:pb-24">
      <div className="jd-container pt-6 pb-4 text-xs text-[#7A716A] flex gap-2">
        <Link to="/rent" className="hover:text-[#1B1714]">Rent</Link><span>/</span>
        <Link to={`/rent?brand=${encodeURIComponent(l.brand)}`} className="hover:text-[#1B1714]">{l.brand}</Link><span>/</span><span>{l.name}</span>
      </div>
      <div className="jd-container grid nav:grid-cols-[minmax(0,1.35fr)_minmax(340px,1fr)] gap-8 wide:gap-14 items-start">
        <Gallery images={l.images} title={`${l.brand} ${l.name}`} />
        <div className="space-y-6 nav:sticky nav:top-[108px]">
          <div className="jd-fade">
            <div className="flex items-center gap-3 mb-3"><AuthBadge status={l.auth_status} testid="product-auth-badge" /><SampleTag className="!bg-[#EFEEEC]" /></div>
            <p className="jd-eyebrow !text-[#1B1714]" data-testid="product-brand">{l.brand}</p>
            <h1 className="text-[28px] nav:text-[38px] leading-tight mt-1" data-testid="product-name">{l.name}</h1>
            <p className="text-sm text-[#4A423C] mt-2">Condition: <span data-testid="product-condition">{l.condition}</span>{l.buy_enabled && <> · Also available to buy at {usd(l.buy_price)}</>}</p>
          </div>
          <Lender l={l} />
          <BookingCard l={l} />
          <AuthCard l={l} />
          <Accordion type="single" collapsible className="border-t border-[#E2DFDA]" data-testid="product-info-accordion">
            {INFO(l).map(([v, t, d]) => (
              <AccordionItem key={v} value={v} className="border-[#E2DFDA]">
                <AccordionTrigger className="text-xs uppercase tracking-[0.18em] font-medium hover:no-underline py-5" data-testid={`accordion-${v}`}>{t}</AccordionTrigger>
                <AccordionContent className="text-[15px] text-[#4A423C] leading-relaxed">{d}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="nav:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FFFFFF] border-t border-[#E2DFDA] px-5 py-3 flex items-center justify-between gap-4" data-testid="mobile-booking-bar">
        <p className="font-serif text-xl">{usd(l.rent_per_day)}<span className="font-sans text-xs text-[#7A716A]"> / day</span></p>
        <a href="#booking" className="jd-btn-solid !px-6" data-testid="mobile-book-button">Select dates</a>
      </div>
    </div>
  );
}
