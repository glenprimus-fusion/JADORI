import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { http } from "../lib/api";
import { BRANDS } from "../lib/content";
import { ListingCard } from "../components/jadori/ListingCard";
import { FilterSheet } from "../components/jadori/FilterSheet";

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

  useEffect(() => { http.get("/listings").then((r) => setAll(r.data)); }, []);
  useEffect(() => { const b = params.get("brand"); setF((x) => ({ ...x, brands: b ? [b] : [] })); }, [params]);

  const items = useMemo(() => {
    if (!all) return null;
    const price = (l) => (mode === "buy" ? l.buy_price : l.rent_per_day);
    let r = all.filter((l) => (mode === "buy" ? l.buy_enabled : true)
      && (!f.brands.length || f.brands.includes(l.brand))
      && (!f.colors.length || f.colors.includes(l.color))
      && (f.availability === "all" || l.available)
      && (f.auth === "all" || l.auth_status === f.auth)
      && (!q || `${l.brand} ${l.name} ${l.color}`.toLowerCase().includes(q.toLowerCase())));
    if (sort === "low") r = [...r].sort((a, b) => price(a) - price(b));
    if (sort === "high") r = [...r].sort((a, b) => price(b) - price(a));
    return r;
  }, [all, f, sort, mode, q]);

  const setBrand = (b) => setParams(b ? { brand: b } : {});
  const activeCount = f.brands.length + f.colors.length + (f.availability !== "all") + (f.auth !== "all");

  return (
    <div data-testid="catalogue-page">
      <div className="jd-container pt-12 nav:pt-16 pb-8 jd-fade">
        <p className="jd-eyebrow mb-3">Massachusetts · Sample inventory</p>
        <h1 className="text-[32px] nav:text-[48px] leading-tight" data-testid="catalogue-title">
          {f.brands.length === 1 ? f.brands[0] : mode === "buy" ? "Bags to buy" : "Bags to rent"}
        </h1>
        {q && <p className="mt-2 text-[#4A423C]">Results for “{q}” <button className="jd-link ml-2 text-sm" onClick={() => setParams({})} data-testid="clear-search-button">Clear</button></p>}
      </div>

      <div className="sticky top-[68px] nav:top-[84px] z-30 bg-[#F8F7F5] border-y border-[#E2DFDA]">
        <div className="jd-container flex items-center gap-4 h-[64px]">
          <div className="flex border border-[#1B1714] h-[40px]" role="tablist" data-testid="rent-buy-switch">
            {["rent", "buy"].map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => nav(`/${m}${params.toString() ? `?${params}` : ""}`)} data-testid={`switch-${m}`}
                className={`px-5 text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${mode === m ? "bg-[#1B1714] text-[#F3F1ED]" : "hover:bg-[#EFEEEC]"}`}>{m}</button>
            ))}
          </div>
          <button onClick={() => setOpen(true)} data-testid="open-filters-button" className="flex items-center gap-2 h-[40px] px-4 border border-[#1B1714] text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-[#1B1714] hover:text-[#F3F1ED] transition-colors">
            <SlidersHorizontal size={15} strokeWidth={1.25} /> Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
          <span className="hidden sm:inline text-sm text-[#7A716A]" data-testid="results-count">{items ? `${items.length} bags` : ""}</span>
          <label className="ml-auto flex items-center gap-2">
            <span className="hidden sm:inline jd-label">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} data-testid="sort-select" className="jd-select !py-1 text-sm w-[150px]">
              <option value="recommended">Recommended</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="jd-container py-5 flex gap-2 overflow-x-auto jd-scroll" data-testid="brand-shortcuts">
        {[null, ...BRANDS.map((b) => b.name)].map((b) => {
          const on = b ? f.brands.length === 1 && f.brands[0] === b : !f.brands.length;
          return (
            <button key={b || "all"} onClick={() => setBrand(b)} data-testid={`brand-shortcut-${(b || "all").toLowerCase().replace(/\s+/g, "-")}`}
              className={`shrink-0 px-4 h-[36px] text-[12px] uppercase tracking-[0.14em] border transition-colors ${on ? "border-[#1B1714] bg-[#1B1714] text-[#F3F1ED]" : "border-[#E2DFDA] hover:border-[#1B1714]"}`}>{b || "All brands"}</button>
          );
        })}
      </div>

      <div className="jd-container pb-24">
        {items && !items.length ? (
          <div className="py-24 text-center" data-testid="catalogue-empty">
            <p className="font-serif text-2xl">No bags match these filters.</p>
            <button className="jd-btn-outline mt-8" onClick={() => { setF(EMPTY); setParams({}); }}>Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 nav:grid-cols-3 wide:grid-cols-4 gap-x-4 nav:gap-x-6 gap-y-12" data-testid="catalogue-grid">
            {(items || Array.from({ length: 8 })).map((l, k) => l ? <ListingCard key={l.id} l={l} mode={mode} /> : <div key={k} className="aspect-[2/3] jd-photo animate-pulse" />)}
          </div>
        )}
      </div>
      <FilterSheet open={open} onOpenChange={setOpen} f={f} setF={setF} count={items?.length ?? 0} reset={() => { setF(EMPTY); setParams({}); }} />
    </div>
  );
}
