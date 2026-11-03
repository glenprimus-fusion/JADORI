import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { X } from "lucide-react";
import { BRANDS, COLORS, STYLES, slug } from "../../lib/content";

const Check = ({ label, checked, onChange, testid }) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer text-[15px]">
    <input type="checkbox" checked={checked} onChange={onChange} data-testid={testid} className="w-4 h-4 accent-[#1B1714] rounded-none" />
    {label}
  </label>
);

const Radio = ({ name, value, current, label, onChange }) => (
  <label className="flex items-center gap-3 py-2 cursor-pointer text-[15px]">
    <input type="radio" name={name} checked={current === value} onChange={() => onChange(value)} data-testid={`filter-${name}-${value}`} className="w-4 h-4 accent-[#1B1714]" />
    {label}
  </label>
);

const Group = ({ title, children }) => (
  <fieldset className="border-t border-[#E2DFDA] py-6">
    <legend className="jd-label mb-3 float-left w-full">{title}</legend>
    <div className="clear-both">{children}</div>
  </fieldset>
);

export const FilterSheet = ({ open, onOpenChange, f, setF, sort, setSort, style, setStyle, count, reset }) => {
  const toggle = (key, v) => setF({ ...f, [key]: f[key].includes(v) ? f[key].filter((x) => x !== v) : [...f[key], v] });
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-[#F8F7F5] w-full sm:max-w-md p-0 flex flex-col [&>button]:hidden" data-testid="filter-sheet">
        <div className="flex items-center justify-between px-8 h-[72px] border-b border-[#E2DFDA]">
          <SheetTitle className="text-xs uppercase tracking-[0.2em] font-medium font-sans">Filters & Sort</SheetTitle>
          <button onClick={() => onOpenChange(false)} aria-label="Close filters" data-testid="filter-close-button"><X size={20} strokeWidth={1.25} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-8">
          <Group title="Sort by">
            <select value={sort} onChange={(e) => setSort(e.target.value)} data-testid="sort-select" className="jd-select text-[15px]">
              <option value="recommended">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </Group>
          <Group title="Style">
            <div className="grid grid-cols-2">
              <Radio name="style" value="" current={style} label="All styles" onChange={setStyle} />
              {STYLES.map(([v, label]) => <Radio key={v} name="style" value={v} current={style} label={label} onChange={setStyle} />)}
            </div>
          </Group>
          <Group title="Brand">
            <div className="grid grid-cols-2">{BRANDS.map((b) => <Check key={b.name} label={b.name} checked={f.brands.includes(b.name)} onChange={() => toggle("brands", b.name)} testid={`filter-brand-${slug(b.name)}`} />)}</div>
          </Group>
          <Group title="Color">
            <div className="grid grid-cols-2">{COLORS.map((c) => <Check key={c} label={c} checked={f.colors.includes(c)} onChange={() => toggle("colors", c)} testid={`filter-color-${c.toLowerCase()}`} />)}</div>
          </Group>
          <Group title="Availability">
            <Radio name="availability" value="all" current={f.availability} label="All bags" onChange={(v) => setF({ ...f, availability: v })} />
            <Radio name="availability" value="available" current={f.availability} label="Available now" onChange={(v) => setF({ ...f, availability: v })} />
          </Group>
          <Group title="Authentication status">
            <Radio name="auth" value="all" current={f.auth} label="All statuses" onChange={(v) => setF({ ...f, auth: v })} />
            <Radio name="auth" value="verified" current={f.auth} label="Authenticated" onChange={(v) => setF({ ...f, auth: v })} />
            <Radio name="auth" value="pending" current={f.auth} label="Authenticated before handoff" onChange={(v) => setF({ ...f, auth: v })} />
          </Group>
        </div>
        <div className="grid grid-cols-2 gap-3 p-6 border-t border-[#E2DFDA] bg-[#FFFFFF]">
          <button onClick={reset} className="jd-btn-outline px-2" data-testid="filter-clear-button">Clear</button>
          <button onClick={() => onOpenChange(false)} className="jd-btn-solid px-2" data-testid="filter-apply-button">Show {count}</button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
