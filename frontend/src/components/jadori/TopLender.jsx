import { useState } from "react";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const TOP_CRITERIA = ["Rated 4.8 or higher by renters", "Replies to requests within an hour", "Ten or more completed rentals", "No owner cancellations in 12 months"];

export const TopMark = ({ size = 14, light = false }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden>
    <circle cx="10" cy="10" r="9.2" fill="none" stroke={light ? "#F3F1ED" : "#1B1714"} strokeWidth="0.9" />
    <path d="M10 4.6l1.5 3.4 3.7.3-2.8 2.4.9 3.6L10 12.4l-3.3 1.9.9-3.6-2.8-2.4 3.7-.3z" fill={light ? "#F3F1ED" : "#1B1714"} />
  </svg>
);

export const TopLenderBadge = ({ testid = "top-lender-badge" }) => {
  const [open, setOpen] = useState(false);
  const toggle = (e) => { e.preventDefault(); e.stopPropagation(); setOpen((o) => !o); };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span role="button" tabIndex={0} onClick={toggle} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(e)} data-testid={testid}
          className="jd-chip inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-medium border border-[#1B1714] px-2.5 py-1 cursor-pointer hover:bg-[#1B1714] hover:text-[#F3F1ED] group">
          <TopMark size={12} /> Top Lender
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} onClick={(e) => e.stopPropagation()} className="w-[280px] rounded-none border-[#E2DFDA] bg-[#FFFFFF] p-5 shadow-[0_20px_40px_-20px_rgba(27,23,20,0.35)]" data-testid={`${testid}-popover`}>
        <div className="flex items-center gap-3"><TopMark size={30} /><p className="text-[11px] uppercase tracking-[0.18em] font-medium">Top Lender</p></div>
        <p className="text-[13px] text-[#4A423C] mt-3 leading-relaxed">Awarded each quarter to owners who look after renters exceptionally well.</p>
        <ul className="mt-4 space-y-1.5">{TOP_CRITERIA.map((c) => <li key={c} className="flex gap-2 text-[13px]"><Check size={13} strokeWidth={1.5} className="mt-0.5 shrink-0" />{c}</li>)}</ul>
        <p className="text-[10px] uppercase tracking-[0.16em] text-[#7A716A] mt-4">Sample criteria · to be confirmed</p>
      </PopoverContent>
    </Popover>
  );
};
