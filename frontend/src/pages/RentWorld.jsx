import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Umbrella, MapPin, RotateCcw } from "lucide-react";
import { http, usd } from "../lib/api";
import { quote } from "../components/jadori/BookingCard";
import { WorldHero, SectionHead, Timeline, Pillars, FeaturedRow, WorldFAQ, CTABand } from "../components/jadori/World";
import { LoadingImg } from "../components/jadori/LoadingImg";
import { MonthlyEdits } from "../components/jadori/MonthlyEdits";

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=80`;

const OCCASIONS = [
  ["Wedding guest", "Crossbody", U("1746730921536-6123c87a074d"), "Polished, hands-free, photographs beautifully."],
  ["Gala & evening", "Mini", U("1713425887412-9d39ecf06b24"), "A jewel of a bag for black tie and late dinners."],
  ["Weekend away", "Tote", U("1676716107070-1f9ef2a1ac3e"), "Room for the essentials, from Boston to the Cape."],
  ["City days", "Shoulder", U("1559127452-9328c6b697bd"), "The everyday icon, borrowed for the week."],
];

const STEPS = [
  ["Up to 7 days before", "Request", "Choose your bag and dates. The lender confirms your request."],
  ["Before handoff", "Authenticated", "The bag is inspected in person and documented with unretouched photos."],
  ["Day 1", "Handoff", "Local delivery or collection in participating Massachusetts areas."],
  ["Your dates", "Carry it", "Wear it to the occasion. Damage protection is included."],
  ["Final day", "Return", "Return it on your end date. Your deposit is released after inspection."],
];

const INCLUDED = [
  [ShieldCheck, "Authenticated before handoff", "Every bag is independently inspected before it reaches you."],
  [Umbrella, "Damage protection", "Everyday wear is covered by a small daily protection fee."],
  [MapPin, "Local handoff", "Delivered or collected near you, beginning in Massachusetts."],
  [RotateCcw, "Refundable deposit", "Held during your rental and released after the return inspection."],
];

const FAQ = [
  ["How long can I rent a bag?", "The minimum rental is 2 days. Longer rentals are set by each lender's availability."],
  ["What does the deposit cover?", "The refundable deposit is held during your rental and released after the bag passes its return inspection."],
  ["What if the bag isn't authentic?", "Bags are authenticated before handoff. If a bag does not pass, your booking is cancelled and fully refunded."],
  ["Can I buy the bag after renting?", "Only if its owner has enabled the purchase option. Look for a purchase price on the listing."],
];

const PriceExample = () => {
  const [l, setL] = useState(null);
  useEffect(() => { http.get("/listings/sample-01").then((r) => setL(r.data)); }, []);
  if (!l) return null;
  const q = quote(l, 3);
  const rows = [[`${usd(l.rent_per_day)} × 3 days`, q.rental], ["Service fee (10%)", q.service], ["Authentication & handling", q.handling], ["Damage protection", q.protection], ["Refundable deposit", q.deposit]];
  return (
    <section className="bg-[#FFFFFF] border-y border-[#E2DFDA]" data-testid="rent-price-example">
      <div className="jd-container py-20 nav:py-28 grid nav:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] jd-photo overflow-hidden max-w-[520px]"><LoadingImg src={l.images[0].url} alt={`${l.brand} ${l.name} (sample)`} className="absolute inset-0 w-full h-full object-cover" /></div>
        <div className="max-w-md">
          <SectionHead eyebrow="Transparent pricing · example" title="What a three-day rental looks like">Every fee is shown before you request. Nothing is charged in this concept.</SectionHead>
          <p className="jd-eyebrow !text-[#1B1714]">{l.brand}</p><p className="font-serif text-[24px] mb-6">{l.name}</p>
          {rows.map(([k, v]) => <div key={k} className="flex justify-between py-2.5 border-b border-[#E2DFDA] text-[15px]"><span className="text-[#4A423C]">{k}</span><span>{usd(v)}</span></div>)}
          <div className="flex justify-between pt-4 font-medium text-lg" data-testid="rent-price-example-total"><span>Total due</span><span>{usd(q.total)}</span></div>
          <p className="text-xs text-[#7A716A] mt-3">Of which {usd(q.deposit)} is returned after the return inspection. {l.retail_verified ? `Retail reference ${usd(l.retail_price)}.` : ""} Illustrative fees, not final.</p>
          <Link to={`/bag/${l.id}`} className="jd-btn-solid mt-8" data-testid="rent-price-example-button">Choose dates</Link>
        </div>
      </div>
    </section>
  );
};

export default function RentWorld() {
  return (
    <div data-testid="rent-world">
      <WorldHero world="RENT" testid="rent-hero" eyebrow="Rent with JADORI" title="Carry it for the occasion. Return it after."
        copy="Why pay full price when you can rent it for a few days? Choose an authenticated designer bag from owners near you, for exactly the dates you need."
        img={U("1605813810260-1330807535bb")} imgAlt="Model carrying a handbag to an occasion (stock placeholder)"
        ctas={<><Link to="/rent/all" className="jd-btn-solid" data-testid="rent-hero-browse">Browse bags to rent</Link><Link to="/how-renting-works" className="jd-btn-outline" data-testid="rent-hero-how">How renting works</Link></>} />

      <section className="jd-container py-20 nav:py-28" data-testid="rent-occasions">
        <SectionHead eyebrow="Rent by occasion" title="A bag for every moment on your calendar" />
        <div className="flex nav:grid nav:grid-cols-4 gap-3 overflow-x-auto snap-x snap-mandatory jd-scroll -mx-5 px-5 scroll-pl-5 nav:mx-0 nav:px-0">
          {OCCASIONS.map(([t, style, img, d]) => (
            <Link key={t} to={`/rent/all?style=${style}`} className="group shrink-0 w-[70vw] sm:w-[44vw] nav:w-auto snap-start" data-testid={`occasion-${style.toLowerCase()}`}>
              <div className="relative aspect-[2/3] overflow-hidden jd-photo"><LoadingImg src={img} alt={`${t} (stock placeholder)`} loading="lazy" className="absolute inset-0 w-full h-full object-cover duration-[900ms] group-hover:scale-[1.03]" /></div>
              <p className="font-serif text-[22px] mt-4">{t}</p>
              <p className="text-[14px] text-[#4A423C] mt-1">{d}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] mt-3 underline underline-offset-4 decoration-[#E2DFDA] group-hover:decoration-[#1B1714]">Shop {style.toLowerCase()} bags</p>
            </Link>
          ))}
        </div>
      </section>

      <MonthlyEdits />

      <section id="rent-steps" className="jd-container py-20 nav:py-28 scroll-mt-28">
        <SectionHead eyebrow="The rental, step by step" title="From request to return" />
        <Timeline steps={STEPS} testid="rent-timeline" />
      </section>

      <PriceExample />

      <section className="jd-container py-20 nav:py-28">
        <SectionHead eyebrow="Included with every rental" title="Considered, protected, local" />
        <Pillars items={INCLUDED} testid="rent-included" />
      </section>

      <FeaturedRow testid="rent-featured" eyebrow="Available now · sample listings" title="Ready for your dates" to="/rent/all" filter={(l) => l.available} />
      <WorldFAQ items={FAQ} testid="rent-faq" />
      <CTABand testid="rent-cta" title="Your next occasion deserves the bag." copy="Browse authenticated designer handbags from owners across Massachusetts." cta="Browse bags to rent" to="/rent/all" />
    </div>
  );
}
