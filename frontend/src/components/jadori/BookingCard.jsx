import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { http, usd } from "../../lib/api";
import { PLANS, FULFILMENT, quote, rangeFrom, daysOf } from "../../lib/plans";
import { AvailabilityCalendar, clashes, nextLabel } from "./AvailabilityCalendar";
import { RequestDialog } from "./RequestDialog";
import { OfferDialog } from "./OfferDialog";

export { quote };

const Row = ({ k, v, strong, testid }) => (
  <div className={`flex justify-between py-1.5 ${strong ? "font-medium text-base border-t border-[#1B1714] pt-3 mt-2" : "text-sm text-[#4A423C]"}`}>
    <span>{k}</span><span data-testid={testid}>{v}</span>
  </div>
);

const DateField = ({ label, value, testid }) => (
  <div className="flex-1 text-left">
    <span className="jd-label">{label}</span>
    <span className="block border-b border-[#E2DFDA] py-3 text-[15px]" data-testid={testid}>{value ? format(value, "EEE, MMM d") : <span className="text-[#7A716A]">Select date</span>}</span>
  </div>
);

const Choice = ({ label, items, value, set, price, testid }) => (
  <fieldset className="mt-7" data-testid={testid}>
    <legend className="jd-label mb-3">{label}</legend>
    <div className="space-y-2">
      {items.map((it) => (
        <button type="button" key={it.key} onClick={() => set(it.key)} aria-pressed={value === it.key} data-testid={`${testid}-${it.key}`}
          className={`w-full text-left p-4 border flex gap-4 items-start transition-colors ${value === it.key ? "border-[#1B1714] bg-[#F8F7F5]" : "border-[#E2DFDA] hover:border-[#7A716A]"}`}>
          <span className={`mt-1 w-[11px] h-[11px] shrink-0 rounded-full border border-[#1B1714] ${value === it.key ? "bg-[#1B1714]" : ""}`} />
          <span className="flex-1 min-w-0">
            <span className="flex justify-between gap-3 text-[13px] uppercase tracking-[0.14em] font-medium"><span>{it.name}</span><span className="normal-case tracking-normal font-normal text-[#4A423C]">{price(it)}</span></span>
            <span className="block text-[13px] text-[#7A716A] mt-1">{it.line}</span>
          </span>
        </button>
      ))}
    </div>
  </fieldset>
);

export const BookingCard = ({ l }) => {
  const [params] = useSearchParams();
  const [range, setRange] = useState(() => rangeFrom(params));
  const [plan, setPlan] = useState("signature");
  const [fulfil, setFulfil] = useState("pickup");
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [avail, setAvail] = useState(null);
  useEffect(() => { http.get(`/listings/${l.id}/availability`).then((r) => setAvail(r.data)); }, [l.id, dialog]);
  const blocked = avail?.blocked || [];
  const pick = (r, day) => {
    if (r?.from && r?.to && clashes(r, blocked)) { setRange({ from: day, to: undefined }); return; }
    setRange(r || {});
    if (r?.from && r?.to && r.from.getTime() !== r.to.getTime()) setOpen(false);
  };
  const clash = clashes(range, blocked);
  const days = daysOf(range);
  const q = days && !clash ? quote(l, days, plan, fulfil) : null;
  const tooShort = days === 1;

  return (
    <div className="bg-[#FFFFFF] border border-[#E2DFDA] p-6 nav:p-8 scroll-mt-[110px]" id="booking" data-testid="booking-card">
      <div className="flex items-baseline justify-between">
        <p className="font-serif text-[28px]" data-testid="booking-price-per-day">{usd(l.rent_per_day)}<span className="font-sans text-sm text-[#7A716A]"> / day</span></p>
        {l.retail_verified && <p className="text-sm text-[#7A716A] line-through">{usd(l.retail_price)} retail</p>}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="flex gap-6 w-full mt-6" data-testid="booking-dates-trigger">
            <DateField label="Start date" value={range.from} testid="booking-start-date" />
            <DateField label="End date" value={range.to} testid="booking-end-date" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0 rounded-none border-[#E2DFDA]" data-testid="booking-calendar">
          <AvailabilityCalendar blocked={blocked} range={range} onSelect={pick} />
        </PopoverContent>
      </Popover>
      <p className="text-xs text-[#7A716A] mt-3">Minimum rental 2 days. Booked days are crossed out; one inspection day follows every rental. Sample availability.</p>
      {avail && <p className="text-[12px] uppercase tracking-[0.14em] mt-3" data-testid="booking-next-available">{l.available ? "Next free from" : "Currently rented · available from"} {nextLabel(avail.next_available)}</p>}

      <Choice label="Protection plan" items={PLANS} value={plan} set={setPlan} testid="plan-choice"
        price={(p) => `${usd(p.perDay)}/day · ${usd(Math.floor((l.deposit * p.share) / 50 + 0.5) * 50)} deposit`} />
      <Choice label="Handoff" items={FULFILMENT} value={fulfil} set={setFulfil} testid="fulfilment-choice" price={(f) => (f.fee ? usd(f.fee) : "Free")} />

      {q && (
        <div className="mt-7" data-testid="booking-breakdown">
          <Row k="Rental duration" v={`${days} days`} testid="booking-duration" />
          <Row k={`${usd(l.rent_per_day)} × ${days} days`} v={usd(q.rental)} testid="booking-rental-subtotal" />
          <Row k="Service fee (10%)" v={usd(q.service)} testid="booking-service-fee" />
          <Row k="Authentication & handling" v={usd(q.handling)} testid="booking-handling-fee" />
          <Row k={`${PLANS.find((p) => p.key === plan).name} protection`} v={usd(q.protection)} testid="booking-protection-fee" />
          {!!q.delivery && <Row k="Courier delivery & collection" v={usd(q.delivery)} testid="booking-delivery-fee" />}
          <Row k="Refundable deposit" v={usd(q.deposit)} testid="booking-deposit" />
          <Row k="Total due" v={usd(q.total)} strong testid="booking-total" />
          <p className="text-[11px] text-[#7A716A] mt-2">Fees and protection plans are illustrative and not final.</p>
        </div>
      )}
      {tooShort && <p className="text-sm mt-4" data-testid="booking-min-error">Please choose at least 2 days.</p>}
      {clash && <p className="text-sm mt-4" data-testid="booking-clash-error">Some of these days are already booked. Please choose free days.</p>}

      <button disabled={!q || tooShort} onClick={() => setDialog("rent")} className="jd-btn-solid w-full mt-6" data-testid="request-to-rent-button">
        Request to rent
      </button>
      {l.buy_enabled && (
        <div className="mt-6 pt-6 border-t border-[#E2DFDA]" data-testid="buy-option">
          <div className="flex justify-between items-baseline mb-4"><span className="jd-label">Also available to buy</span><span className="font-serif text-xl" data-testid="buy-price">{usd(l.buy_price)}</span></div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setDialog("buy")} className="jd-btn-outline !px-3" data-testid="request-to-buy-button">Buy now</button>
            <button onClick={() => setDialog("offer")} className="jd-btn-outline !px-3" data-testid="make-offer-button">Make an offer</button>
          </div>
        </div>
      )}
      <p className="text-[11px] text-[#7A716A] mt-5">No payment is taken in this concept prototype. Your request is sent to the lender for confirmation.</p>
      <RequestDialog kind={dialog === "offer" ? null : dialog} onClose={() => setDialog(null)} l={l} range={range} q={q} days={days} plan={plan} fulfil={fulfil} />
      {l.buy_enabled && <OfferDialog open={dialog === "offer"} onClose={() => setDialog(null)} l={l} />}
    </div>
  );
};
