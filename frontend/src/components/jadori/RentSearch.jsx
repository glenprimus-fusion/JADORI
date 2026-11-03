import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addDays, format, startOfToday } from "date-fns";
import { MapPin, CalendarDays, Search } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CITIES } from "../../lib/content";
import { rangeFrom, ymd } from "../../lib/plans";

const Cell = ({ icon: Ico, label, children }) => (
  <div className="flex-1 min-w-0 flex items-center gap-3 px-5 h-[64px] border-b nav:border-b-0 nav:border-r border-[#E2DFDA]">
    <Ico size={16} strokeWidth={1.1} className="shrink-0 text-[#7A716A]" />
    <div className="min-w-0 flex-1"><span className="block text-[10px] uppercase tracking-[0.18em] text-[#7A716A]">{label}</span>{children}</div>
  </div>
);

export const RentSearch = ({ testid = "rent-search", className = "" }) => {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [city, setCity] = useState(params.get("city") || "");
  const [range, setRange] = useState(rangeFrom(params));
  const [open, setOpen] = useState(false);
  const go = () => {
    const p = new URLSearchParams(params);
    ["city", "from", "to"].forEach((k) => p.delete(k));
    if (city) p.set("city", city);
    if (range.from && range.to) { p.set("from", ymd(range.from)); p.set("to", ymd(range.to)); }
    nav(`/rent/all${p.toString() ? `?${p}` : ""}`);
  };
  const label = range.from ? `${format(range.from, "EEE, MMM d")}${range.to ? ` – ${format(range.to, "MMM d")}` : ""}` : "Add dates";
  return (
    <div className={`bg-[#FFFFFF] border border-[#E2DFDA] rounded-[28px] nav:rounded-full overflow-hidden nav:overflow-visible nav:p-1.5 flex flex-col nav:flex-row shadow-[0_24px_48px_-32px_rgba(27,23,20,0.35)] ${className}`} data-testid={testid}>
      <Cell icon={MapPin} label="Where">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent text-[15px] outline-none cursor-pointer appearance-none" data-testid={`${testid}-city`}>
          <option value="">All of Massachusetts</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}, MA</option>)}
        </select>
      </Cell>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className="flex-[1.3] min-w-0 text-left" data-testid={`${testid}-dates`}>
            <Cell icon={CalendarDays} label="Your dates"><span className={`block text-[15px] truncate ${range.from ? "" : "text-[#7A716A]"}`}>{label}</span></Cell>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0 rounded-none border-[#E2DFDA]" data-testid={`${testid}-calendar`}>
          <Calendar mode="range" numberOfMonths={1} selected={range} onSelect={(r) => { setRange(r || {}); if (r?.from && r?.to && r.from.getTime() !== r.to.getTime()) setOpen(false); }} disabled={[{ before: addDays(startOfToday(), 1) }]} />
        </PopoverContent>
      </Popover>
      <button onClick={go} className="jd-btn-solid nav:!h-auto nav:w-[160px] shrink-0" data-testid={`${testid}-submit`}><Search size={15} strokeWidth={1.25} /> Search</button>
    </div>
  );
};
