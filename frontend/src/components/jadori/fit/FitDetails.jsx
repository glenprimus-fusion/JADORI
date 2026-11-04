import { Smartphone, CreditCard, Wallet, KeyRound, Sparkles, Glasses, NotebookPen, GlassWater, Headphones, CircleDot, Package } from "lucide-react";

const cm = (v) => Math.round(v * 2.54);

const ITEMS = {
  phone: [Smartphone, "Large phone"], cardholder: [CreditCard, "Cardholder"], wallet: [Wallet, "Long wallet"], keys: [KeyRound, "Keys"],
  lipstick: [Sparkles, "Lipstick"], sunglasses: [Glasses, "Sunglasses"], notebook: [NotebookPen, "A5 notebook"], bottle: [GlassWater, "Small bottle"],
  earbuds: [Headphones, "Earbuds"], compact: [CircleDot, "Compact mirror"], pouch: [Package, "Small pouch"],
};

const Dim = ({ x1, y1, x2, y2, label, lx, ly, anchor = "middle", testid }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7A716A" strokeWidth="0.8" />
    {[[x1, y1], [x2, y2]].map(([a, b], k) => <circle key={k} cx={a} cy={b} r="1.8" fill="#7A716A" />)}
    <text x={lx} y={ly} fontSize="11" textAnchor={anchor} fill="#1B1714" data-testid={testid}>{label}</text>
  </g>
);

export const DimensionsDrawing = ({ f }) => {
  const s = Math.min(170 / f.w, 130 / f.h);
  const w = f.w * s, h = f.h * s, dx = f.d * s * 0.55, dy = f.d * s * 0.38;
  const x = 60, top = 40 + dy;
  return (
    <div data-testid="fit-dimensions">
      <svg viewBox="0 0 320 250" className="w-full max-w-[420px]" role="img" aria-label={`${f.w} by ${f.h} by ${f.d} inches`}>
        <path d={`M${x} ${top} L${x + dx} ${top - dy} L${x + w + dx} ${top - dy} L${x + w + dx} ${top + h - dy} L${x + w} ${top + h} Z`} fill="#E2DFDA" stroke="#1B1714" strokeWidth="0.9" />
        <line x1={x + w} y1={top} x2={x + w + dx} y2={top - dy} stroke="#1B1714" strokeWidth="0.9" />
        <rect x={x} y={top} width={w} height={h} fill="#F3F1ED" stroke="#1B1714" strokeWidth="1" />
        <path d={`M${x + w * 0.3} ${top} C ${x + w * 0.3} ${top - 34}, ${x + w * 0.7} ${top - 34}, ${x + w * 0.7} ${top}`} fill="none" stroke="#1B1714" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <Dim x1={x} y1={top + h + 18} x2={x + w} y2={top + h + 18} lx={x + w / 2} ly={top + h + 34} label={`W ${f.w}″ · ${cm(f.w)} cm`} testid="fit-dim-width" />
        <Dim x1={x - 16} y1={top} x2={x - 16} y2={top + h} lx={x - 22} ly={top + h / 2 + 4} anchor="end" label={`H ${f.h}″`} testid="fit-dim-height" />
        <Dim x1={x + w + 12} y1={top + h + 4} x2={x + w + dx + 12} y2={top + h - dy + 4} lx={x + w + dx + 16} ly={top + h - dy / 2 + 10} anchor="start" label={`D ${f.d}″`} testid="fit-dim-depth" />
      </svg>
      <div className="grid grid-cols-4 gap-3 mt-6 border-t border-[#E2DFDA] pt-5">
        {[["Width", f.w], ["Height", f.h], ["Depth", f.d]].map(([k, v]) => <div key={k}><p className="font-serif text-[22px] leading-none">{v}″</p><p className="text-[10px] uppercase tracking-[0.16em] text-[#7A716A] mt-1.5">{k} · {cm(v)} cm</p></div>)}
        <div><p className="font-serif text-[22px] leading-none" data-testid="fit-weight">{f.weight}</p><p className="text-[10px] uppercase tracking-[0.16em] text-[#7A716A] mt-1.5">lbs approx.</p></div>
      </div>
    </div>
  );
};

export const WhatFits = ({ fits }) => (
  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3" data-testid="fit-what-fits">
    {fits.map((k) => {
      const [Ico, label] = ITEMS[k] || [Package, k];
      return (
        <li key={k} className="flex flex-col items-start gap-3 border border-[#E2DFDA] rounded-[18px] p-4 bg-[#FFFFFF]" data-testid={`fit-item-${k}`}>
          <Ico size={22} strokeWidth={1} />
          <span className="text-[13px]">{label}</span>
        </li>
      );
    })}
  </ul>
);
