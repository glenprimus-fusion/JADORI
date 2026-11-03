import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { CTABand, SectionHead } from "./World";
import { LoadingImg } from "./LoadingImg";
import { AuthSeal } from "./AuthBadge";

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const StepPhoto = ({ src, alt, seal }) => (
  <div className="relative aspect-[4/5] jd-photo overflow-hidden">
    <LoadingImg src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    {seal && <div className="absolute bottom-5 right-5 bg-[#FFFFFF] p-3 rounded-full"><AuthSeal size={90} /></div>}
  </div>
);

export const StepVideo = ({ src, poster, label, testid }) => (
  <div className="relative aspect-[4/5] jd-photo overflow-hidden" data-testid={testid}>
    {reducedMotion()
      ? <LoadingImg src={poster} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      : <video src={src} poster={poster} muted loop playsInline autoPlay preload="metadata" aria-label={label} className="absolute inset-0 w-full h-full object-cover" />}
    <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] bg-[#FFFFFF]/85 px-2 py-1">In motion · placeholder</span>
  </div>
);

export const Mock = ({ children, dark = false }) => (
  <div className="aspect-[4/5] bg-[#EFEEEC] flex items-center justify-center p-6">
    <div className={`${dark ? "bg-[#1F1A17] text-[#F3F1ED]" : "bg-[#FFFFFF]"} p-6 w-full max-w-[360px] shadow-[0_24px_50px_-28px_rgba(27,23,20,0.5)] text-[14px]`}>{children}</div>
  </div>
);

export const MockRow = ({ k, v, light }) => (
  <div className={`flex justify-between py-2 border-b ${light ? "border-[#F3F1ED]/15" : "border-[#E2DFDA]"}`}><span className={light ? "text-[#F3F1ED]/70" : "text-[#4A423C]"}>{k}</span><span>{v}</span></div>
);

export const MockButton = ({ children, light }) => (
  <div className={`h-[44px] rounded-full text-[11px] uppercase tracking-[0.18em] flex items-center justify-center mt-5 ${light ? "bg-[#F3F1ED] text-[#1F1A17]" : "bg-[#1B1714] text-[#F3F1ED]"}`}>{children}</div>
);

export const GuidePage = ({ testid, eyebrow = "A visual guide", title, intro, steps, essentials, note, cta }) => (
  <div data-testid={testid}>
    <section className="jd-container pt-14 nav:pt-20 pb-16 grid nav:grid-cols-[1.2fr_1fr] gap-12 items-end">
      <div className="jd-fade">
        <p className="jd-eyebrow mb-5">{eyebrow}</p>
        <h1 className="text-[38px] nav:text-[64px] leading-[1.03]">{title}</h1>
        <p className="mt-6 text-[#4A423C] max-w-lg">{intro}</p>
      </div>
      <ol className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px]" data-testid={`${testid}-index`}>
        {steps.map((s, i) => <li key={s.t}><a href={`#step-${i + 1}`} className="flex gap-3 py-1.5 border-b border-[#E2DFDA] hover:border-[#1B1714] transition-colors" data-testid={`${testid}-index-${i + 1}`}><span className="text-[#7A716A]">0{i + 1}</span>{s.t}</a></li>)}
      </ol>
    </section>
    <div className="border-t border-[#E2DFDA]">
      {steps.map((s, i) => (
        <section key={s.t} id={`step-${i + 1}`} className={`scroll-mt-28 ${i % 2 ? "bg-[#FFFFFF]" : ""} border-b border-[#E2DFDA]`} data-testid={`${testid}-step-${i + 1}`}>
          <div className={`jd-container py-16 nav:py-24 grid nav:grid-cols-2 gap-10 nav:gap-20 items-center ${i % 2 ? "nav:[&>*:first-child]:order-2" : ""}`}>
            <div className="max-w-[560px] w-full">{s.v}</div>
            <div className="max-w-md">
              <p className="font-serif text-[56px] nav:text-[80px] leading-none text-[#E2DFDA]">0{i + 1}</p>
              <h2 className="text-[28px] nav:text-[40px] leading-tight mt-4">{s.t}</h2>
              <p className="mt-5 text-[#4A423C]">{s.d}</p>
              <ul className="mt-7 space-y-2.5">{s.pts.map((p) => <li key={p} className="flex gap-3 text-[15px]"><Check size={16} strokeWidth={1.25} className="mt-1 shrink-0" />{p}</li>)}</ul>
              {s.cta && <Link to={s.cta[1]} className="jd-btn-outline mt-9" data-testid={`${testid}-step-${i + 1}-cta`}>{s.cta[0]}</Link>}
            </div>
          </div>
        </section>
      ))}
    </div>
    <section className="jd-container py-20 nav:py-24">
      <SectionHead eyebrow="Good to know" title="The essentials, at a glance" />
      <div className="grid sm:grid-cols-2 wide:grid-cols-4 border-t border-l border-[#E2DFDA]" data-testid={`${testid}-essentials`}>
        {essentials.map(([a, b]) => <div key={b} className="p-8 border-r border-b border-[#E2DFDA] bg-[#FFFFFF]"><p className="font-serif text-[34px]">{a}</p><p className="text-[12px] uppercase tracking-[0.16em] text-[#7A716A] mt-2">{b}</p></div>)}
      </div>
      <p className="text-xs text-[#7A716A] mt-4">{note}</p>
    </section>
    <CTABand testid={`${testid}-cta`} {...cta} />
  </div>
);
