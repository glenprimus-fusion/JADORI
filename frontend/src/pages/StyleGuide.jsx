import { Link } from "react-router-dom";
import { PageHead } from "../components/jadori/Layout";
import { AuthBadge, AuthSeal, SampleTag } from "../components/jadori/AuthBadge";
import { Monogram, MonogramPattern } from "../components/jadori/Monogram";

const TOKENS = [
  ["Main background", "#F8F7F5"], ["White panels", "#FFFFFF"], ["Photo background", "#EFEEEC"], ["Dividers", "#E2DFDA"],
  ["Primary text & buttons", "#1B1714"], ["Secondary text", "#4A423C"], ["Muted text", "#7A716A"], ["Dark sections", "#1F1A17"], ["Light text on dark", "#F3F1ED"],
];
const NAVMAP = [
  ["/", "Home — doors, listings, brands, trust, how it works, newsletter"], ["/lend", "Lend landing"], ["/lend/new", "Listing creation (3 steps)"],
  ["/rent", "Catalogue · rent mode (?brand=, ?q=)"], ["/buy", "Catalogue · buy mode (purchase-enabled only)"], ["/bag/sample-01", "Product page + booking"],
  ["/authenticity", "Authentication explainer"], ["/register", "Account registration (concept)"], ["/account/renter", "Renter dashboard"],
  ["/account/lender", "Lender dashboard"], ["/support", "Support, FAQ & contact"], ["/about · /press · /faq · /privacy · /terms · /legal", "Placeholder info pages"],
];
const Sec = ({ t, children }) => <section className="border-t border-[#E2DFDA] py-12 grid nav:grid-cols-[220px_1fr] gap-8"><p className="jd-label">{t}</p><div>{children}</div></section>;

export default function StyleGuide() {
  return (
    <div data-testid="style-guide-page">
      <PageHead eyebrow="Developer handoff" title="JADORI style guide">Provisional design system for the visual prototype. Full written handoff: <code className="text-sm">/app/HANDOFF.md</code>.</PageHead>
      <div className="jd-container pb-24">
        <Sec t="Colour tokens">
          <div className="grid grid-cols-2 sm:grid-cols-3 wide:grid-cols-5 gap-4">
            {TOKENS.map(([n, h]) => <div key={h} data-testid={`token-${h.slice(1)}`}><div className="aspect-[3/2] border border-[#E2DFDA]" style={{ background: h }} /><p className="text-sm mt-2">{n}</p><p className="text-xs text-[#7A716A]">{h}</p></div>)}
          </div>
        </Sec>
        <Sec t="Typography">
          <p className="font-serif uppercase tracking-[0.42em] text-[26px]">Jadori</p><p className="text-xs text-[#7A716A] mb-6">Provisional wordmark · Prata · tracking 0.42em</p>
          <p className="font-serif text-[56px] leading-none">Major 30–56px</p>
          <p className="font-serif text-[40px] mt-4">Section heading 28–42px</p>
          <p className="font-serif text-[32px] mt-4">Product title 28–40px</p>
          <p className="mt-4 max-w-xl">Body — Jost Regular 16px / 1.6. Clean, legible interface text for navigation, forms and descriptions.</p>
          <p className="jd-eyebrow mt-4">Eyebrow — Jost Medium 11px · 0.22em</p>
        </Sec>
        <Sec t="Monogram · provisional">
          <div className="grid sm:grid-cols-3 gap-4" data-testid="monogram-showcase">
            <div className="aspect-square bg-[#F8F7F5] border border-[#E2DFDA] flex items-center justify-center"><Monogram size={180} /></div>
            <div className="aspect-square bg-[#1F1A17] flex items-center justify-center"><Monogram size={180} color="#F3F1ED" knock="#1F1A17" testid="monogram-dark" /></div>
            <div className="aspect-square bg-[#EFEEEC] flex flex-col items-center justify-center gap-5"><Monogram size={96} knock="#EFEEEC" testid="monogram-lockup" /><span className="font-serif uppercase tracking-[0.42em] pl-[0.42em] text-[22px]">Jadori</span></div>
          </div>
          <p className="text-sm text-[#4A423C] mt-5 max-w-2xl">An original interlocked J and D. The J's stem passes through the D's bowl and crosses under its base, ending in a ball terminal. It has thick stems, hairline bowls and bracket serifs to echo Prata. It's used in single espresso or light-on-dark only, with no gold. Minimum size 16px (favicon).</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            <div><div className="h-[220px] border border-[#E2DFDA]"><MonogramPattern opacity={0.85} testid="monogram-pattern-light" /></div><p className="text-xs text-[#7A716A] mt-2">JADORI canvas: espresso on #EFEEEC, 120px tile</p></div>
            <div><div className="h-[220px]"><MonogramPattern color="#F3F1ED" bg="#1F1A17" opacity={0.22} testid="monogram-pattern-dark" /></div><p className="text-xs text-[#7A716A] mt-2">Tone-on-tone: light at 22% on #1F1A17 (footer band)</p></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-10" data-testid="monogram-applications">
            <div className="aspect-[4/5] bg-[#EFEEEC] flex items-center justify-center p-10">
              <div className="relative w-full h-full shadow-[0_18px_40px_-20px_rgba(27,23,20,0.45)] overflow-hidden"><MonogramPattern opacity={0.9} tile={90} testid="mockup-dust-bag" />
                <div className="absolute top-4 inset-x-0 h-2 border-y border-[#1B1714]/30" /></div>
            </div>
            <div className="aspect-[4/5] bg-[#EFEEEC] flex items-center justify-center">
              <div className="w-[150px] h-[230px] bg-[#1F1A17] flex flex-col items-center justify-center gap-4 shadow-[0_18px_40px_-20px_rgba(27,23,20,0.6)]">
                <span className="w-3 h-3 rounded-full border border-[#F3F1ED]/50 -mt-6 mb-6" /><Monogram size={64} color="#F3F1ED" knock="#1F1A17" testid="mockup-tag" /><span className="text-[9px] uppercase tracking-[0.3em] text-[#F3F1ED]/70">Authenticated</span>
              </div>
            </div>
            <div className="aspect-[4/5] bg-[#EFEEEC] flex items-center justify-center"><AuthSeal size={180} /></div>
          </div>
          <p className="text-xs text-[#7A716A] mt-2">Concept applications: dust bag, authentication hang tag, and the circular seal with the monogram at its centre.</p>
        </Sec>
        <Sec t="Buttons · 52px · square">
          <div className="flex flex-wrap gap-4 items-center"><button className="jd-btn-solid">Solid espresso</button><button className="jd-btn-outline">Espresso outline</button><span className="bg-[#1F1A17] p-4"><button className="jd-btn-light">Light on dark</button></span><button className="jd-btn-solid" disabled>Disabled</button></div>
        </Sec>
        <Sec t="Forms">
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl">
            <label className="block"><span className="jd-label">Underline input</span><input className="jd-input" placeholder="Placeholder" /></label>
            <label className="block"><span className="jd-label">Selector · thin chevron</span><select className="jd-select"><option>Boston</option><option>Cambridge</option></select></label>
          </div>
        </Sec>
        <Sec t="Status & badges">
          <div className="flex flex-wrap gap-8 items-center"><AuthBadge status="verified" /><AuthBadge status="pending" /><SampleTag className="!bg-[#EFEEEC]" /><AuthSeal size={80} /></div>
          <p className="text-sm text-[#4A423C] mt-4">“Authenticated” + seal only after a passed inspection. New listings: “Authenticated before handoff”.</p>
        </Sec>
        <Sec t="Motion">
          <ul className="text-[15px] text-[#4A423C] space-y-1"><li>Rent door crossfade 1.4s, hold ~5.2s (no carousel)</li><li>Entrance fade 700ms, 8px rise</li><li>Photo hover zoom 1.03 over 900ms</li><li>No bounce, spin or parallax · prefers-reduced-motion disables all</li></ul>
        </Sec>
        <Sec t="Responsive">
          <ul className="text-[15px] text-[#4A423C] space-y-1"><li>≥1100px: catalogue 4 columns</li><li>860–1099px: 3 columns</li><li>&lt;860px: 2 columns, Menu button, swipeable doors and gallery, sticky mobile booking bar</li><li>Product images 2:3 portrait</li></ul>
        </Sec>
        <Sec t="Navigation map">
          <ul className="divide-y divide-[#E2DFDA]">{NAVMAP.map(([r, d]) => <li key={r} className="py-2 grid sm:grid-cols-[260px_1fr] gap-2 text-sm"><Link to={r.split(" ")[0]} className="jd-link">{r}</Link><span className="text-[#4A423C]">{d}</span></li>)}</ul>
        </Sec>
      </div>
    </div>
  );
}
