import { addDays, eachDayOfInterval, format, parseISO, startOfToday } from "date-fns";
import { Calendar } from "../ui/calendar";

export const toRanges = (blocked, kind) => blocked.filter((b) => b.kind === kind).map((b) => ({ from: parseISO(b.start), to: parseISO(b.end) }));

export const clashes = (range, blocked) => {
  if (!range?.from || !blocked.length) return false;
  const days = eachDayOfInterval({ start: range.from, end: range.to || range.from }).map((d) => format(d, "yyyy-MM-dd"));
  return blocked.some((b) => days.some((d) => d >= b.start && d <= b.end));
};

export const nextLabel = (iso) => format(parseISO(iso), "MMM d");

const Legend = () => (
  <div className="flex flex-wrap gap-x-5 gap-y-2 px-4 pb-4 pt-1 text-[10px] uppercase tracking-[0.14em] text-[#4A423C]" data-testid="availability-legend">
    <span className="flex items-center gap-2"><span className="w-3 h-3 border border-[#E2DFDA] bg-[#FFFFFF]" />Free</span>
    <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#EFEEEC] relative overflow-hidden after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-[#7A716A]" />Booked</span>
    <span className="flex items-center gap-2"><span className="w-3 h-3 border border-dashed border-[#7A716A]" />Inspection day</span>
  </div>
);

export const AvailabilityCalendar = ({ blocked, range, onSelect }) => {
  const booked = toRanges(blocked, "booked");
  const buffer = toRanges(blocked, "buffer");
  return (
    <div data-testid="availability-calendar">
      <Calendar mode="range" numberOfMonths={1} selected={range} defaultMonth={range.from} onSelect={onSelect}
        disabled={[{ before: addDays(startOfToday(), 1) }, ...booked, ...buffer]}
        modifiers={{ booked, buffer }}
        modifiersClassNames={{ booked: "jd-day-booked", buffer: "jd-day-buffer" }} />
      <Legend />
    </div>
  );
};
