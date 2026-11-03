import { Link } from "react-router-dom";
import { Wordmark } from "./Wordmark";
import { Monogram, MonogramPattern } from "./Monogram";

const COLS = [
  ["Marketplace", [["Rent", "/rent"], ["How renting works", "/how-renting-works"], ["Lend", "/lend"], ["Buy", "/buy"], ["Authenticity", "/authenticity"]]],
  ["JADORI", [["About", "/about"], ["Press", "/press"], ["FAQ", "/faq"], ["Contact", "/support"]]],
  ["Legal", [["Privacy Policy", "/privacy"], ["Terms", "/terms"], ["Legal notices", "/legal"], ["Style guide", "/style-guide"]]],
];

export const Footer = () => (
  <footer className="bg-[#1F1A17] text-[#F3F1ED]" data-testid="site-footer">
    <div className="h-[96px] border-b border-[#F3F1ED]/10" data-testid="footer-monogram-band"><MonogramPattern color="#F3F1ED" bg="#1F1A17" opacity={0.16} tile={96} testid="footer-monogram-pattern" /></div>
    <div className="jd-container py-20 grid gap-14 nav:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div className="space-y-6">
        <div className="flex items-center gap-4"><Monogram size={44} color="#F3F1ED" knock="#1F1A17" testid="footer-monogram" /><Wordmark light testid="footer-wordmark" /></div>
        <p className="text-sm text-[#F3F1ED]/70 max-w-xs">A peer-to-peer marketplace for authenticated designer handbags. Beginning in Massachusetts.</p>
        <div className="flex gap-6 text-xs uppercase tracking-[0.18em]">
          <span data-testid="footer-instagram" title="Placeholder — approved URL pending" className="opacity-80">Instagram <em className="not-italic text-[10px] opacity-60">(link pending)</em></span>
          <span data-testid="footer-tiktok" title="Placeholder — approved URL pending" className="opacity-80">TikTok <em className="not-italic text-[10px] opacity-60">(link pending)</em></span>
        </div>
      </div>
      {COLS.map(([h, links]) => (
        <div key={h}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#F3F1ED]/50 mb-5">{h}</p>
          <ul className="space-y-3 text-sm">
            {links.map(([l, to]) => (
              <li key={l}><Link to={to} data-testid={`footer-link-${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:opacity-70 transition-opacity">{l}</Link></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-[#F3F1ED]/10">
      <div className="jd-container py-6 flex flex-col nav:flex-row justify-between gap-2 text-xs text-[#F3F1ED]/50">
        <span>© JADORI. Concept prototype — all listings, lenders, prices and statuses shown are sample data.</span>
        <span>Creative Direction & Visual Design by Tyrell Primus</span>
      </div>
    </div>
  </footer>
);
