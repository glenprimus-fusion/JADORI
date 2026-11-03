import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const IMG = "https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/";
const WIDE = `${IMG}6bf247e39ae72769580da364e231450e69ba44a846273baddd277b8f2a27a4a1.jpeg`;
const TALL = `${IMG}f619097a395a8fcfd5b9a897b4d6a6242a33fdfb348b41a6ad9a0de92dbe2680.jpeg`;

export const HeroBanner = () => (
  <section className="relative h-[calc(100svh-104px)] min-h-[560px] max-h-[920px] overflow-hidden bg-[#EFEEEC]" data-testid="home-hero">
    <picture>
      <source media="(min-width: 860px)" srcSet={WIDE} />
      <img src={TALL} alt="JADORI campaign: model with a structured leather handbag beside a limestone colonnade (placeholder image)" className="absolute inset-0 w-full h-full object-cover object-[center_30%] nav:object-[70%_center] jd-hero-zoom" data-testid="home-hero-image" />
    </picture>
    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17]/85 via-[#1F1A17]/35 to-transparent nav:bg-gradient-to-r nav:from-[#F8F7F5]/55 nav:via-[#F8F7F5]/10 nav:to-transparent" />
    <div className="relative h-full jd-container flex flex-col justify-end nav:justify-center pb-14 nav:pb-0">
      <div className="max-w-xl text-[#F3F1ED] nav:text-[#1B1714]">
        <p className="text-[11px] uppercase tracking-[0.3em] font-medium jd-fade" data-testid="home-hero-eyebrow">The Autumn Collection · Massachusetts</p>
        <h1 className="mt-5 text-[44px] sm:text-[56px] nav:text-[76px] leading-[1.02] jd-fade jd-fade-2" data-testid="home-hero-title">Carry the icon.</h1>
        <p className="mt-6 text-[16px] nav:text-[17px] max-w-md opacity-90 jd-fade jd-fade-3">Authenticated designer handbags from owners near you. Rent for a moment, lend from your closet, or keep one forever.</p>
        <div className="mt-10 flex flex-wrap gap-3 jd-fade jd-fade-3">
          <Link to="/rent/all" className="jd-btn-light nav:!bg-[#1B1714] nav:!text-[#F3F1ED] nav:hover:!bg-[#4A423C]" data-testid="home-hero-discover">Discover the collection</Link>
          <Link to="/lend" className="jd-btn border border-[#F3F1ED] text-[#F3F1ED] nav:border-[#1B1714] nav:text-[#1B1714] hover:bg-[#F3F1ED] hover:text-[#1F1A17] nav:hover:bg-[#1B1714] nav:hover:text-[#F3F1ED]" data-testid="home-hero-lend">Lend your bag</Link>
        </div>
      </div>
    </div>
    <a href="#doors" aria-label="Scroll to Lend, Rent and Buy" className="hidden nav:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#1B1714]/70 hover:text-[#1B1714]" data-testid="home-hero-scroll">
      Lend · Rent · Buy<ChevronDown size={16} strokeWidth={1} />
    </a>
    <span className="absolute top-4 right-5 text-[9px] uppercase tracking-[0.2em] text-[#F3F1ED]/70 nav:text-[#1B1714]/50">Placeholder campaign image</span>
  </section>
);
