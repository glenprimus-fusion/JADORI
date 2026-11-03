import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { http } from "../lib/api";
import { Link } from "react-router-dom";
import { BRANDS, DOORS, STYLES, slug } from "../lib/content";
import { QuickView } from "../components/jadori/QuickView";
import { EDITS } from "../lib/edits";
import { PlaceholderTile } from "../components/jadori/LoadingImg";
import { ListingCard } from "../components/jadori/ListingCard";
import { FilterSheet } from "../components/jadori/FilterSheet";
import { RentSearch } from "../components/jadori/RentSearch";
import { rangeFrom, daysOf, rangeLabel } from "../lib/plans";

const EditorialTile = () => (
  <Link to="/lend" className="col-span-2 group block" data-testid="catalogue-editorial-tile">
    <div className="relative aspect-[4/3] overflow-hidden jd-photo">
      <img src={DOORS.rent[0]} alt="Editorial placeholder" className="absolute inset-0 w-full h-full object-cover object-[center_75%] transition-transform duration-[900ms] group-hover:scale-[1.02]" />
      <div className="absolute inset-x-0 bottom-0 p-6 nav:p-8 bg-gradient-to-t from-[#1F1A17]/55 to-transparent text-[#F3F1ED]">
        <p className="text-[11px] uppercase tracking-[0.22em] opacity-90">Lend with JADORI</p>
        <p className="font-serif text-[22px] nav:text-[32px] leading-tight mt-2 max-w-md">Make money from a bag sitting in your closet.</p>
      </div>
    </div>
    <p className="pt-4 text-[11px] uppercase tracking-[0.2em] underline underline-offset-4 decoration-[#E2DFDA] group-hover:decoration-[#1B1714]">Start a listing</p>
  </Link>
);

const EMPTY = { brands: [], colors: [], availability: "all", auth: "all" };

export default function Catalogue() {
  const { pathname } = useLocation();
  const mode = pathname.startsWith("/buy") ? "buy" : "rent";
  const nav = useNavigate();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [all, setAll] = useState(null);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [f, setF] = useState({ ...EMPTY, brands: params.get("brand") ? [params.get("brand")] : [] });
  const style = params.get("style") || "";
  const edit = EDITS.find((e) => e.slug === params.get("edit"));
  const [quick, setQuick] = useState(null);
  const city = params.get("city") || "";
  const range = rangeFrom(params);
  const days = mode === "rent" ? daysOf(range) : 0;
  const dateSearch = days > 0 ? `?from=${params.get("from")}&to=${params.get("to")}` : "";
  useEffect(() => {
    const p = days > 0 ? { start: params.get("from"), end: params.get("to") } : {};
    http.get("/listings", { params: p }).then((r) => setAll(r.data));
  }, [dateSearch]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { const b = params.get("brand"); setF((x) => ({ ...x, brands: b ? [b] : [] })); }, [params]);

  const [items, hidden] = useMemo(() => {
    if (!all) return [null, 0];
    const price = (l) => (mode === "buy" ? l.buy_price : l.rent_per_day);
    const matches = all.filter((l) => (mode === "buy" ? l.buy_enabled : true)
      && (!style || l.style === style)
      && (!edit || edit.ids.includes(l.id))
      && (!city || l.lender.city === city)
      && (!f.brands.length || f.brands.includes(l.brand))
      && (!f.colors.length || f.colors.includes(l.color))
      && (f.availability === "all" || l.available)
      && (f.auth === "all" || l.auth_status === f.auth)
      && (!q || `${l.brand} ${l.name} ${l.color} ${l.style}`.toLowerCase().includes(q.toLowerCase())));
    let r = days > 0 ? matches.filter((l) => l.free_for_dates !== false) : matches;
    if (sort === "low") r = [...r].sort((a, b) => price(a) - price(b));
    if (sort === "high") r = [...r].sort((a, b) => price(b) - price(a));
    return [r, matches.length - r.length];
  }, [all, f, sort, mode, q, style, edit, city, days]);

  const setParam = (k, v) => { const p = new URLSearchParams(params); p.delete("q"); v ? p.set(k, v) : p.delete(k); setParams(p); };
  const setBrand = (b) => setParam("brand", b);
  const activeCount = f.brands.length + f.colors.length + (f.availability !== "all") + (f.auth !== "all") + (style ? 1 : 0) + (edit ? 1 : 0) + (city ? 1 : 0);
  const styleLabel = STYLES.find(([v]) => v === style)?.[1];

  return (
    <div data-testid="catalogue-page">
      <div className="jd-container pt-12 nav:pt-16 pb-8 jd-fade">
        <p className="jd-eyebrow mb-3">Massachusetts · Sample inventory</p>
        <h1 className="text-[32px] nav:text-[48px] leading-tight" data-testid="catalogue-title">
          {edit ? `The edit · ${edit.title}` : [f.brands.length === 1 ? f.brands[0] : null, styleLabel].filter(Boolean).join(" · ") || (mode === "buy" ? "Handbags to buy" : "Handbags to rent")}{city && !edit ? <span className="text-[#7A716A]"> in {city}</span> : null}
        </h1>
        {mode === "rent" && <RentSearch key={`${city}${params.get("from")}${params.get("to")}`} testid="catalogue-search" className="mt-8 max-w-4xl" />}
        {mode === "rent" && (city || days > 0) && (
          <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-[#4A423C]" data-testid="catalogue-search-summary">
            {[city ? `${city}, MA` : "All of Massachusetts", days > 0 ? `${rangeLabel(range)} · ${days} days` : null].filter(Boolean).join(" · ")}
            {days > 0 && hidden > 0 && <span className="normal-case tracking-normal text-[13px] text-[#7A716A] ml-3" data-testid="catalogue-hidden-booked">{hidden} {hidden === 1 ? "bag is" : "bags are"} booked for your dates and not shown</span>}
            <button className="jd-link ml-3 normal-case tracking-normal text-[13px]" onClick={() => { const p = new URLSearchParams(params); ["city", "from", "to"].forEach((k) => p.delete(k)); setParams(p); }} data-testid="clear-rent-search">Clear</button>
          </p>
        )}
        {edit && <p className="mt-3 text-[#4A423C] max-w-xl" data-testid="catalogue-edit-blurb">{edit.blurb} <button className="jd-link ml-1 text-sm" onClick={() => setParam("edit", "")} data-testid="clear-edit-button">See all bags</button></p>}
        {q && <p className="mt-2 text-[#4A423C]">Results for “{q}” <button className="jd-link ml-2 text-sm" onClick={() => setParams({})} data-testid="clear-search-button">Clear</button></p>}
        <nav className="mt-8 flex gap-5 nav:gap-8 overflow-x-auto jd-scroll border-b border-[#E2DFDA]" aria-label="Shop by style" data-testid="style-shortcuts">
          {[["", "All"], ...STYLES].map(([v, label]) => (
            <button key={v || "all"} onClick={() => setParam("style", v)} data-testid={`style-shortcut-${v ? v.toLowerCase() : "all"}`} aria-current={style === v}
              className={`shrink-0 pb-3 -mb-px text-[11px] nav:text-[12px] uppercase tracking-[0.12em] nav:tracking-[0.18em] border-b transition-colors ${style === v ? "border-[#1B1714] text-[#1B1714] font-medium" : "border-transparent text-[#7A716A] hover:text-[#1B1714]"}`}>{label}</button>
          ))}
        </nav>
      </div>

      <div className="jd-container pb-8 flex gap-3 nav:gap-4 overflow-x-auto jd-scroll" data-testid="brand-shortcuts">
        {[null, ...BRANDS.map((b) => b.name)].map((b) => {
          const on = b ? f.brands.length === 1 && f.brands[0] === b : !f.brands.length;
          const img = (b ? all?.find((l) => l.brand === b) : all?.[11])?.images[0].url;
          return (
            <button key={b || "all"} onClick={() => setBrand(b)} data-testid={`brand-shortcut-${slug(b || "all")}`} className="shrink-0 w-[96px] nav:w-[124px] text-left group">
              <span className={`block aspect-[4/5] jd-photo overflow-hidden border-b-2 transition-colors ${on ? "border-[#1B1714]" : "border-transparent"}`}>
                {img && <img src={img} alt="" className="w-full h-full object-cover scale-[1.3] group-hover:scale-[1.36] transition-transform duration-700" />}
              </span>
              <span className={`block mt-2 text-[11px] uppercase tracking-[0.14em] ${on ? "text-[#1B1714] font-medium" : "text-[#4A423C]"}`}>{b || "View all"}</span>
            </button>
          );
        })}
      </div>

      <div className="sticky top-[68px] nav:top-[84px] z-30 bg-[#F8F7F5]/95 backdrop-blur border-y border-[#E2DFDA]">
        <div className="jd-container flex items-center gap-3 sm:gap-6 h-[60px]">
          <div className="flex" role="tablist" data-testid="rent-buy-switch">
            {["rent", "buy"].map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => nav(`/${m}/all${params.toString() ? `?${params}` : ""}`)} data-testid={`switch-${m}`}
                className={`px-3 sm:px-4 h-[59px] text-[11px] uppercase tracking-[0.2em] font-medium border-b transition-colors ${mode === m ? "border-[#1B1714] text-[#1B1714]" : "border-transparent text-[#7A716A] hover:text-[#1B1714]"}`}>{m}</button>
            ))}
          </div>
          <span className="text-[12px] text-[#7A716A] tracking-[0.06em]" data-testid="results-count">{items ? `${items.length} ${items.length === 1 ? "bag" : "bags"}` : ""}</span>
          <button onClick={() => setOpen(true)} data-testid="open-filters-button" className="ml-auto flex items-center gap-2.5 h-[40px] px-4 sm:px-5 border border-[#1B1714] text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-[#1B1714] hover:text-[#F3F1ED] transition-colors">
            <SlidersHorizontal size={14} strokeWidth={1.25} /><span className="hidden sm:inline">Filters & Sort</span><span className="sm:hidden">Filters</span>{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>
      </div>

      <div className="jd-container pt-8 pb-24">
        {items && !items.length ? (
          <div className="py-24 text-center" data-testid="catalogue-empty">
            <p className="font-serif text-2xl">{days > 0 && hidden ? "Every matching bag is booked for these dates." : "No bags match these filters."}</p>
            {days > 0 && hidden > 0 && <p className="text-[#4A423C] mt-3">Try moving your dates by a day or two.</p>}
            <button className="jd-btn-outline mt-8" onClick={() => { setF(EMPTY); setParams({}); }}>Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-flow-row-dense grid-cols-2 nav:grid-cols-3 wide:grid-cols-4 gap-x-2 nav:gap-x-3 gap-y-10" data-testid="catalogue-grid">
            {(items || Array.from({ length: 8 })).flatMap((l, k) => {
              const card = l ? <ListingCard key={l.id} l={l} mode={mode} onQuickView={setQuick} days={days} search={dateSearch} /> : <PlaceholderTile key={k} />;
              return k === 5 && items && items.length >= 8 && !activeCount && !q && sort === "recommended" ? [<EditorialTile key="editorial" />, card] : [card];
            })}
          </div>
        )}
      </div>
      <QuickView l={quick} onClose={() => setQuick(null)} />
      <FilterSheet open={open} onOpenChange={setOpen} style={style} setStyle={(v) => setParam("style", v)} f={f} setF={setF} sort={sort} setSort={setSort} count={items?.length ?? 0} reset={() => { setF(EMPTY); setSort("recommended"); setParams({}); }} />
    </div>
  );
}
