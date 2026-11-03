import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, User, Menu, X, Heart } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { Wordmark } from "./Wordmark";
import { getUser } from "../../lib/api";
import { useSaved } from "../../lib/wishlist";

const NAV = [["Lend", "/lend"], ["Rent", "/rent"], ["Buy", "/buy"], ["How it works", "/how-renting-works"], ["Authenticity", "/authenticity"], ["Creators", "/creators"], ["Support", "/support"]];

const SearchBox = ({ onDone }) => {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const go = (e) => { e.preventDefault(); nav(`/rent/all?q=${encodeURIComponent(q)}`); onDone?.(); };
  return (
    <form onSubmit={go} className="flex items-center gap-2 border-b border-[#E2DFDA] focus-within:border-[#1B1714]">
      <Search size={16} strokeWidth={1.25} />
      <input data-testid="header-search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand or bag" className="bg-transparent outline-none py-2 text-sm w-full placeholder:text-[#7A716A]" />
    </form>
  );
};

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const user = getUser();
  const saved = useSaved();
  const account = user ? (user.role === "lend" ? "/account/lender" : "/account/renter") : "/register";
  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F5]/95 backdrop-blur border-b border-[#E2DFDA]" data-testid="site-header">
      <div className="jd-container h-[68px] nav:h-[84px] grid grid-cols-[1fr_auto_1fr] items-center">
        <nav className="hidden nav:flex items-center gap-8 text-[12px] uppercase tracking-[0.18em]">
          {NAV.slice(0, 3).map(([l, h]) => (
            <NavLink key={h} to={h} data-testid={`nav-${l.toLowerCase()}`} className={({ isActive }) => `py-1 border-b ${isActive ? "border-[#1B1714]" : "border-transparent hover:border-[#1B1714]"} transition-colors`}>{l}</NavLink>
          ))}
        </nav>
        <button className="nav:hidden flex items-center gap-2 text-[12px] uppercase tracking-[0.18em]" onClick={() => setOpen(true)} data-testid="mobile-menu-button">
          <Menu size={20} strokeWidth={1.25} /> Menu
        </button>
        <Wordmark />
        <div className="flex items-center justify-end gap-4 nav:gap-6 text-[12px] uppercase tracking-[0.18em]">
          <NavLink to="/authenticity" className="hidden wide:inline hover:opacity-70" data-testid="nav-authenticity">Authenticity</NavLink>
          <button onClick={() => setSearch((s) => !s)} aria-label="Search" data-testid="header-search-toggle" className="hidden nav:block hover:opacity-70"><Search size={19} strokeWidth={1.25} /></button>
          <Link to="/account/saved" aria-label={`Saved bags (${saved.length})`} data-testid="header-saved-link" className="relative hover:opacity-70">
            <Heart size={19} strokeWidth={1.25} />
            {saved.length > 0 && <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#1B1714] text-[#F3F1ED] text-[9px] leading-[16px] text-center tracking-normal" data-testid="header-saved-count">{saved.length}</span>}
          </Link>
          <Link to={account} aria-label="Account" data-testid="header-account-link" className="flex items-center gap-2 hover:opacity-70">
            <User size={19} strokeWidth={1.25} /><span className="hidden nav:inline">{user ? user.full_name.split(" ")[0] : "Account"}</span>
          </Link>
        </div>
      </div>
      {search && <div className="jd-container pb-4 max-w-xl"><SearchBox onDone={() => setSearch(false)} /></div>}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="bg-[#F8F7F5] w-full sm:max-w-sm border-r border-[#E2DFDA] p-8 [&>button]:hidden" data-testid="mobile-menu-sheet">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex justify-between items-center mb-12">
            <span className="font-serif uppercase tracking-[0.42em] text-xl">Jadori</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" data-testid="mobile-menu-close"><X size={22} strokeWidth={1.25} /></button>
          </div>
          <nav className="flex flex-col">
            {NAV.map(([l, h]) => (
              <Link key={h} to={h} onClick={() => setOpen(false)} data-testid={`mobile-nav-${l.toLowerCase()}`} className="font-serif text-[30px] py-3 border-b border-[#E2DFDA]">{l}</Link>
            ))}
            <Link to={account} onClick={() => setOpen(false)} data-testid="mobile-nav-account" className="mt-8 jd-eyebrow">{user ? "My account" : "Create account"}</Link>
          </nav>
          <div className="mt-10"><SearchBox onDone={() => setOpen(false)} /></div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
