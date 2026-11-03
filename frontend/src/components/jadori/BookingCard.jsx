import { useState } from "react";
import { addDays, differenceInCalendarDays, format, startOfToday } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { usd } from "../../lib/api";
import { RequestDialog } from "./RequestDialog";

export const quote = (l, days) => {
  const rental = l.rent_per_day * days;
  const service = Math.round(rental * 0.1);
  const handling = 25;
  const protection = 4 * days;
  return { rental, service, handling, protection, deposit: l.deposit, total: rental + service + handling + protection + l.deposit };
};

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

export const BookingCard = ({ l }) => {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const days = range.from && range.to ? differenceInCalendarDays(range.to, range.from) + 1 : 0;
  const q = days ? quote(l, days) : null;
  const tooShort = days === 1;

  return (
    <div className="bg-[#FFFFFF] border border-[#E2DFDA] p-6 nav:p-8" id="booking" data-testid="booking-card">
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
          <Calendar mode="range" numberOfMonths={1} selected={range} onSelect={(r) => { setRange(r || {}); if (r?.from && r?.to) setOpen(false); }}
            disabled={[{ before: addDays(startOfToday(), 1) }]} />
        </PopoverContent>
      </Popover>
      <p className="text-xs text-[#7A716A] mt-3">Minimum rental 2 days. Availability shown is sample data.</p>

      {q && (
        <div className="mt-6" data-testid="booking-breakdown">
          <Row k="Rental duration" v={`${days} days`} testid="booking-duration" />
          <Row k={`${usd(l.rent_per_day)} × ${days} days`} v={usd(q.rental)} testid="booking-rental-subtotal" />
          <Row k="Service fee (10%)" v={usd(q.service)} testid="booking-service-fee" />
          <Row k="Authentication & handling" v={usd(q.handling)} testid="booking-handling-fee" />
          <Row k="Damage protection" v={usd(q.protection)} testid="booking-protection-fee" />
          <Row k="Refundable deposit" v={usd(q.deposit)} testid="booking-deposit" />
          <Row k="Total due" v={usd(q.total)} strong testid="booking-total" />
          <p className="text-[11px] text-[#7A716A] mt-2">Fee structure is illustrative and not final.</p>
        </div>
      )}
      {tooShort && <p className="text-sm mt-4" data-testid="booking-min-error">Please choose at least 2 days.</p>}

      <button disabled={!q || tooShort || !l.available} onClick={() => setDialog("rent")} className="jd-btn-solid w-full mt-6" data-testid="request-to-rent-button">
        {l.available ? "Request to rent" : "Currently rented"}
      </button>
      {l.buy_enabled && (
        <div className="mt-6 pt-6 border-t border-[#E2DFDA]" data-testid="buy-option">
          <div className="flex justify-between items-baseline mb-4"><span className="jd-label">Owner accepts offers to buy</span><span className="font-serif text-xl" data-testid="buy-price">{usd(l.buy_price)}</span></div>
          <button onClick={() => setDialog("buy")} className="jd-btn-outline w-full" data-testid="request-to-buy-button">Request to buy</button>
        </div>
      )}
      <p className="text-[11px] text-[#7A716A] mt-5">No payment is taken in this concept prototype. Your request is sent to the lender for confirmation.</p>
      <RequestDialog kind={dialog} onClose={() => setDialog(null)} l={l} range={range} q={q} days={days} />
    </div>
  );
};
