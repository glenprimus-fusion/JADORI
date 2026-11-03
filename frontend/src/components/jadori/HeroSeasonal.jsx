import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { currentHero, SEASONS } from "../../lib/seasons";

const useDesktopMotion = () => {
  const q = "(min-width: 860px) and (prefers-reduced-motion: no-preference)";
  const [ok, setOk] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setOk(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return ok;
};

const HeroVideo = ({ src, poster }) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { ref.current?.play().catch(() => {}); }, [src]);
  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline autoPlay preload="auto" aria-hidden onCanPlay={() => setReady(true)} onError={() => setReady(false)}
      data-testid="home-hero-video" className={`absolute inset-0 w-full h-full object-cover object-[70%_center] transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`} />
  );
};

export const HeroBanner = () => {
  const [params, setParams] = useSearchParams();
  const h = currentHero(params.get("season"));
  const motion = useDesktopMotion();
  const dark = h.key === "winter";
  const ink = dark ? "nav:text-[#F3F1ED]" : "nav:text-[#1B1714]";
  return (
    <section className="relative h-[calc(100svh-104px)] min-h-[560px] max-h-[920px] overflow-hidden bg-[#EFEEEC]" data-testid="home-hero" data-season={h.key}>
      <picture key={h.key}>
        <source media="(min-width: 860px)" srcSet={h.wide} />
        <img src={h.tall || h.wide} alt={`JADORI ${h.name} campaign (placeholder image)`} className={`absolute inset-0 w-full h-full object-cover ${h.pos} jd-hero-zoom`} data-testid="home-hero-image" />
      </picture>
      {motion && h.video && <HeroVideo key={h.video} src={h.video} poster={h.wide} />}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#1F1A17]/85 via-[#1F1A17]/35 to-transparent nav:bg-gradient-to-r ${dark ? "nav:from-[#1F1A17]/60 nav:via-[#1F1A17]/20" : "nav:from-[#F8F7F5]/55 nav:via-[#F8F7F5]/10"} nav:to-transparent`} />
      <div className="relative h-full jd-container flex flex-col justify-end nav:justify-center pb-14 nav:pb-0">
        <div key={h.key} className={`max-w-xl text-[#F3F1ED] ${ink}`}>
          <p className="text-[11px] uppercase tracking-[0.3em] font-medium jd-fade" data-testid="home-hero-eyebrow">The {h.name} Collection · Massachusetts</p>
          <h1 className="mt-5 text-[44px] sm:text-[56px] nav:text-[76px] leading-[1.02] jd-fade jd-fade-2" data-testid="home-hero-title">{h.title}</h1>
          <p className="mt-6 text-[16px] nav:text-[17px] max-w-md opacity-90 jd-fade jd-fade-3">{h.copy}</p>
          <div className="mt-10 flex flex-wrap gap-3 jd-fade jd-fade-3">
            <Link to="/rent/all" className={`jd-btn-light ${dark ? "" : "nav:!bg-[#1B1714] nav:!text-[#F3F1ED] nav:hover:!bg-[#4A423C]"}`} data-testid="home-hero-discover">Discover the collection</Link>
            <Link to="/lend" className={`jd-btn border border-[#F3F1ED] text-[#F3F1ED] hover:bg-[#F3F1ED] hover:text-[#1F1A17] ${dark ? "" : "nav:border-[#1B1714] nav:text-[#1B1714] nav:hover:bg-[#1B1714] nav:hover:text-[#F3F1ED]"}`} data-testid="home-hero-lend">Lend your bag</Link>
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.2em] opacity-80 jd-fade jd-fade-3" data-testid="home-hero-edits">
            {h.month} edits: {h.edits.map((e, i) => <span key={e.slug}>{i ? " · " : ""}<Link to={`/rent/all?edit=${e.slug}`} className="underline underline-offset-4 decoration-current/30 hover:decoration-current" data-testid={`home-hero-edit-${e.slug}`}>{e.title}</Link></span>)}
          </p>
        </div>
      </div>
      <a href="#doors" aria-label="Scroll to Lend, Rent and Buy" className={`hidden nav:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] opacity-70 hover:opacity-100 ${dark ? "text-[#F3F1ED]" : "text-[#1B1714]"}`} data-testid="home-hero-scroll">
        Lend · Rent · Buy<ChevronDown size={16} strokeWidth={1} />
      </a>
      <div className={`absolute top-4 right-5 left-5 nav:left-auto flex items-center justify-end gap-3 text-[9px] uppercase tracking-[0.14em] nav:tracking-[0.2em] text-[#F3F1ED]/80 ${dark ? "" : "nav:text-[#1B1714]/60"}`} data-testid="home-hero-season-preview">
        <span className="hidden nav:inline">Placeholder · preview season:</span>
        {Object.entries(SEASONS).map(([k, s]) => (
          <button key={k} onClick={() => setParams({ season: k }, { replace: true })} data-testid={`hero-season-${k}`} className={`hover:opacity-100 ${k === h.key ? "underline underline-offset-4 opacity-100" : "opacity-60"}`}>{s.name}</button>
        ))}
      </div>
    </section>
  );
};
