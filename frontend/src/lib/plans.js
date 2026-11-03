import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";

// Sample protection tiers: higher daily fee, smaller refundable deposit.
export const PLANS = [
  { key: "essential", name: "Essential", perDay: 4, share: 1, line: "Everyday wear covered. Full deposit held." },
  { key: "signature", name: "Signature", perDay: 9, share: 0.5, line: "Adds minor scuffs and stains. Half deposit." },
  { key: "complete", name: "Complete", perDay: 16, share: 0.25, line: "Accidental damage covered. Smallest deposit." },
];

export const FULFILMENT = [
  { key: "pickup", name: "Meet the owner", fee: 0, line: "Collect from the lender at an agreed place nearby." },
  { key: "delivery", name: "Courier delivery", fee: 45, line: "Delivered to your door and collected after, in participating areas." },
];

export const quote = (l, days, plan = "essential", fulfil = "pickup") => {
  const p = PLANS.find((x) => x.key === plan);
  const rental = l.rent_per_day * days;
  const service = Math.round(rental * 0.1);
  const handling = 25;
  const protection = p.perDay * days;
  const delivery = FULFILMENT.find((x) => x.key === fulfil).fee;
  const deposit = Math.floor((l.deposit * p.share) / 50 + 0.5) * 50;
  return { rental, service, handling, protection, delivery, deposit, total: rental + service + handling + protection + delivery + deposit };
};

export const ymd = (d) => format(d, "yyyy-MM-dd");
const parse = (s) => { const d = s ? parseISO(s) : null; return d && isValid(d) ? d : undefined; };
export const rangeFrom = (params) => ({ from: parse(params.get("from")), to: parse(params.get("to")) });
export const daysOf = (r) => (r.from && r.to ? differenceInCalendarDays(r.to, r.from) + 1 : 0);
export const rangeLabel = (r) => (r.from && r.to ? `${format(r.from, "MMM d")} – ${format(r.to, "MMM d")}` : "");
