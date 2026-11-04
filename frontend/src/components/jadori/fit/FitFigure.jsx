const S = 8.6;
const FLOOR = 610;
const y = (inches) => FLOOR - inches * S;
const SHOULDER = 57.5;
const ELBOW = 43;
const HAND = 29;

const BAG_COLORS = { Black: "#1B1714", Ivory: "#ECE6DA", Tan: "#B07A4A", Cognac: "#9A5A33", Grey: "#9C968F", Red: "#8E2A2A", Beige: "#D8C7AE", Dove: "#C9C4BC", Green: "#4C5B45", Navy: "#26304A" };

export const placement = (way, drop, f) => {
  const w = f.w * S, h = f.h * S;
  if (way === "Crossbody") { const top = y(SHOULDER) + drop * S * 0.82; return { x: 168 - w / 2, top, w, h, anchor: [74, y(SHOULDER) + 2], strap: "cross" }; }
  if (way === "Top handle") { const top = y(HAND) + drop * S; return { x: 198 - w / 2, top, w, h, anchor: [198, y(HAND)], strap: "handle" }; }
  if (way === "Crook of arm") { const top = y(ELBOW) + drop * S; return { x: 200 - w / 2, top, w, h, anchor: [196, y(ELBOW)], strap: "handle" }; }
  const top = y(SHOULDER) + drop * S; return { x: 190 - w / 2, top, w, h, anchor: [166, y(SHOULDER) + 1], strap: "shoulder" };
};

export const sitsAt = (p) => {
  const mid = (FLOOR - (p.top + p.h / 2)) / S;
  return mid > 42 ? "at the waist" : mid > 30 ? "at the hip" : "at the upper thigh";
};

const Body = () => (
  <g>
    <ellipse cx="120" cy="52" rx="21" ry="33" fill="#EFEEEC" stroke="#C9C2BA" strokeWidth="1" />
    {[["M58 126 C50 160 48 200 46 240 C44 280 44 310 44 362"], ["M182 126 C190 160 192 200 194 240 C196 280 196 310 196 362"]].map(([d]) => (
      <g key={d}><path d={d} fill="none" stroke="#C9C2BA" strokeWidth="17" strokeLinecap="round" /><path d={d} fill="none" stroke="#EFEEEC" strokeWidth="15" strokeLinecap="round" /></g>
    ))}
    <path d="M108 84 L108 110 C90 113 66 114 58 126 L62 200 C66 230 80 245 82 250 C70 275 62 295 62 312 L74 604 L104 604 L116 345 L124 345 L136 604 L166 604 L178 312 C178 295 170 275 158 250 C160 245 174 230 178 200 L182 126 C174 114 150 113 132 110 L132 84 Z" fill="#EFEEEC" stroke="#C9C2BA" strokeWidth="1" />
  </g>
);

const Bag = ({ p, color }) => {
  const fill = BAG_COLORS[color] || "#7A716A";
  const [ax, ay] = p.anchor;
  const l = p.x + p.w * 0.22, r = p.x + p.w * 0.78;
  return (
    <g data-testid="fit-figure-bag" style={{ transition: "all 500ms" }}>
      {p.strap === "shoulder" && <><line x1={ax - 4} y1={ay} x2={l} y2={p.top} stroke="#1B1714" strokeWidth="1.3" /><line x1={ax + 4} y1={ay} x2={r} y2={p.top} stroke="#1B1714" strokeWidth="1.3" /></>}
      {p.strap === "cross" && <><line x1={ax} y1={ay} x2={l} y2={p.top} stroke="#1B1714" strokeWidth="1.3" /><line x1={ax + 6} y1={ay - 2} x2={r} y2={p.top} stroke="#1B1714" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.5" /></>}
      {p.strap === "handle" && <path d={`M${l} ${p.top} C ${l} ${ay - 6}, ${r} ${ay - 6}, ${r} ${p.top}`} fill="none" stroke="#1B1714" strokeWidth="1.6" />}
      <rect x={p.x} y={p.top} width={p.w} height={p.h} rx="4" fill={fill} stroke="#1B1714" strokeWidth="0.8" />
      <line x1={p.x + p.w + 10} y1={ay} x2={p.x + p.w + 10} y2={p.top} stroke="#7A716A" strokeWidth="0.8" strokeDasharray="2 3" />
    </g>
  );
};

export const FitFigure = ({ p, color, drop, height }) => (
  <svg viewBox="-34 0 300 620" className="w-full max-h-[520px]" role="img" aria-label={`Figure showing the bag worn with a ${drop} inch drop`} data-testid="fit-figure">
    <line x1="-14" y1={y(69)} x2="-14" y2={FLOOR} stroke="#C9C2BA" strokeWidth="0.8" />
    {[0, 12, 24, 36, 48, 60].map((v) => <g key={v}><line x1="-18" x2="-10" y1={y(v)} y2={y(v)} stroke="#C9C2BA" strokeWidth="0.8" /><text x="-22" y={y(v) + 3} fontSize="9" textAnchor="end" fill="#7A716A">{v / 12}′</text></g>)}
    <text x="-14" y={y(69) - 6} fontSize="10" textAnchor="middle" fill="#1B1714">{height}</text>
    <line x1="40" x2="200" y1={FLOOR} y2={FLOOR} stroke="#C9C2BA" strokeWidth="0.8" />
    <Body />
    <Bag p={p} color={color} />
    <text x={p.x + p.w + 15} y={(p.anchor[1] + p.top) / 2 + 4} fontSize="12" fill="#1B1714" data-testid="fit-figure-drop">{drop}″</text>
  </svg>
);
