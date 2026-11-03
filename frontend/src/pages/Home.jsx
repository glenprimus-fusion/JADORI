import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { http } from "../lib/api";
import { DOORS, BRANDS, slug } from "../lib/content";
import { ListingCard } from "../components/jadori/ListingCard";
import { QuickView } from "../components/jadori/QuickView";
import { HeroBanner } from "../components/jadori/HeroSeasonal";
import { PlaceholderTile } from "../components/jadori/LoadingImg";
import { AuthSeal } from "../components/jadori/AuthBadge";
import { Newsletter } from "../components/jadori/Newsletter";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DoorLabel = ({ word, line }) => (
  <div className="absolute inset-x-0 bottom-0 p-6 nav:p-8 bg-gradient-to-t from-[#1F1A17]/55 to-transparent text-[#F3F1ED]">
    <p className="font-serif text-[40px] nav:text-[52px] tracking-[0.18em] leading-none">{word}</p>
    <p className="mt-3 text-[13px] uppercase tracking-[0.18em] opacity-90">{line}</p>
  </div>
);

const RentImages = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const t = setInterval(() => setI((x) => (x + 1) % DOORS.rent.length), 6600);
    return () => clearInterval(t);
  }, []);
  return DOORS.rent.map((src, k) => (
    <img key={src} src={src} alt="Model styling a handbag for an occasion (stock placeholder)" data-testid={`rent-door-image-${k}`} data-active={k === i}
      className={`absolute inset-0 w-full h-full object-cover jd-crossfade ${k === i ? "opacity-100" : "opacity-0"}`} />
  ));
};

const Door = ({ to, word, line, children, testid }) => (
  <Link to={to} data-testid={testid} className="relative block shrink-0 w-[82vw] nav:w-auto snap-start aspect-[3/4] nav:aspect-auto nav:h-[min(78vh,820px)] overflow-hidden jd-photo jd-zoom">
    {children}
    <DoorLabel word={word} line={line} />
  </Link>
);

const Doors = () => (
  <section id="doors" className="jd-container pt-6 nav:pt-8 scroll-mt-24" data-testid="home-doors">
    <div className="flex nav:grid nav:grid-cols-3 gap-3 nav:gap-4 overflow-x-auto snap-x snap-mandatory jd-scroll -mx-5 px-5 scroll-pl-5 nav:mx-0 nav:px-0">
      <Door to="/lend" word="LEND" line="List the bag in your closet" testid="door-lend">
        <img src={DOORS.lend} alt="Handbag owner presenting her bag (stock placeholder)" className="absolute inset-0 w-full h-full object-cover" />
      </Door>
      <Door to="/rent" word="RENT" line="Choose a bag for your dates" testid="door-rent"><RentImages /></Door>
      <Door to="/buy" word="BUY" line="Pre-loved, ready to keep" testid="door-buy">
        <img src={DOORS.buy} alt="Woman with a pre-owned handbag in the city (stock placeholder)" className="absolute inset-0 w-full h-full object-cover object-[70%_center]" />
      </Door>
    </div>
    <p className="mt-3 text-[11px] text-[#7A716A]">Editorial images are licensed stock placeholders, to be replaced with original JADORI photography.</p>
  </section>
);

const Listings = () => {
  const [items, setItems] = useState(null);
  const [quick, setQuick] = useState(null);
  useEffect(() => { http.get("/listings").then((r) => setItems(r.data)); }, []);
  return (
    <section className="jd-container py-20 nav:py-28" data-testid="home-listings">
      <div className="flex items-end justify-between mb-10 gap-6">
        <div>
          <p className="jd-eyebrow mb-3">New arrivals · sample listings</p>
          <h2 className="text-[28px] nav:text-[40px] leading-tight">The latest from Massachusetts closets</h2>
        </div>
        <Link to="/rent/all" className="jd-btn-outline hidden sm:inline-flex" data-testid="home-view-all-button">Discover all</Link>
      </div>
      <div className="grid grid-cols-2 wide:grid-cols-4 gap-x-2 nav:gap-x-3 gap-y-10">
        {(items || Array.from({ length: 4 })).slice(0, 4).map((l, k) => l ? <ListingCard key={l.id} l={l} onQuickView={setQuick} /> : <PlaceholderTile key={k} />)}
      </div>
      <QuickView l={quick} onClose={() => setQuick(null)} />
      <Link to="/rent/all" className="jd-btn-outline w-full mt-12 sm:hidden">View all</Link>
    </section>
  );
};

const Brands = () => {
  const ref = useRef(null);
  const scroll = (d) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: reduced() ? "auto" : "smooth" });
  return (
    <section className="border-t border-[#E2DFDA] py-20 nav:py-28" data-testid="home-brands">
      <div className="jd-container flex items-end justify-between mb-10">
        <h2 className="text-[28px] nav:text-[40px] tracking-[0.12em]">THE BRANDS</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} aria-label="Previous brands" data-testid="brands-prev-button" className="w-[52px] h-[52px] border border-[#1B1714] flex items-center justify-center hover:bg-[#1B1714] hover:text-[#F3F1ED] transition-colors"><ChevronLeft size={18} strokeWidth={1} /></button>
          <button onClick={() => scroll(1)} aria-label="Next brands" data-testid="brands-next-button" className="w-[52px] h-[52px] border border-[#1B1714] flex items-center justify-center hover:bg-[#1B1714] hover:text-[#F3F1ED] transition-colors"><ChevronRight size={18} strokeWidth={1} /></button>
        </div>
      </div>
      <div ref={ref} className="jd-container flex gap-4 overflow-x-auto scroll-pl-5 nav:scroll-pl-10 wide:scroll-pl-14 snap-x snap-mandatory jd-scroll">
        {BRANDS.map((b) => (
          <Link key={b.name} to={`/rent/all?brand=${encodeURIComponent(b.name)}`} data-testid={`brand-tile-${slug(b.name)}`} className="relative shrink-0 snap-start w-[62vw] sm:w-[300px] aspect-[2/3] overflow-hidden jd-photo jd-zoom">
            <img src={b.img} alt={`${b.name} (stock placeholder image)`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#1F1A17]/60 to-transparent text-[#F3F1ED]">
              <p className="font-serif text-[24px]">{b.name}</p>
              {b.provisional && <p className="text-[10px] uppercase tracking-[0.18em] opacity-80">Provisional · to be confirmed</p>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const TrustLine = () => (
  <section className="bg-[#1F1A17] text-[#F3F1ED]" data-testid="home-trust">
    <div className="jd-container py-14 nav:py-16 grid nav:grid-cols-[auto_1fr_auto] gap-8 nav:gap-12 items-center">
      <AuthSeal size={88} light />
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#F3F1ED]/60">Built on authenticity</p>
        <p className="font-serif text-[24px] nav:text-[32px] leading-tight mt-2 max-w-2xl">Every bag is independently authenticated before it reaches you.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/authenticity" className="jd-btn-light" data-testid="trust-authenticity-link">Discover authenticity</Link>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div data-testid="home-page">
      <HeroBanner />
      <Doors />
      <Listings />
      <Brands />
      <TrustLine />
      <Newsletter />
    </div>
  );
}
