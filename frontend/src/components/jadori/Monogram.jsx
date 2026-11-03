import { useId } from "react";

// Interlocked J·D mark drawn in a 100×100 box. `knock` is the background colour used for the over/under cut.
export const MarkPaths = ({ color = "#1B1714", knock = "#F8F7F5" }) => (
  <g fill="none" strokeLinecap="butt">
    <path d="M30 24 H48 C68 24 78 36 78 50 C78 64 68 76 48 76 H30" stroke={color} strokeWidth="2.4" />
    <path d="M30 24 V76" stroke={color} strokeWidth="5.2" />
    <path d="M23 24 H37 M23 76 H37" stroke={color} strokeWidth="1.6" />
    <path d="M56 70 V77" stroke={knock} strokeWidth="9" />
    <path d="M56 14 V74 C56 86 46 90 38 85" stroke={color} strokeWidth="5.2" />
    <path d="M48 14 H64" stroke={color} strokeWidth="1.6" />
    <circle cx="37" cy="84" r="3.4" fill={color} />
  </g>
);

export const Monogram = ({ size = 64, color = "#1B1714", knock = "#F8F7F5", title = "JADORI monogram", testid = "jadori-monogram" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={title} data-testid={testid}>
    <MarkPaths color={color} knock={knock} />
  </svg>
);

const Lozenge = ({ x, y, color }) => (
  <g transform={`translate(${x} ${y})`} fill="none" stroke={color}>
    <path d="M0 -9 L9 0 L0 9 L-9 0 Z" strokeWidth="1" />
    <path d="M0 -4 L4 0 L0 4 L-4 0 Z" strokeWidth="0.8" />
    <circle r="0.9" fill={color} stroke="none" />
  </g>
);

// Repeating JADORI canvas: half-drop grid of the J·D mark (upright / inverted) with double lozenges.
export const MonogramPattern = ({ color = "#1B1714", bg = "#EFEEEC", opacity = 1, tile = 120, className = "", testid = "monogram-pattern" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={`w-full h-full block ${className}`} aria-hidden data-testid={testid}>
      <defs>
        <pattern id={`jd-${id}`} width={tile} height={tile} patternUnits="userSpaceOnUse" viewBox="0 0 120 120">
          <rect width="120" height="120" fill={bg} />
          <g opacity={opacity}>
            <g transform="translate(12 12) scale(0.36)"><MarkPaths color={color} knock={bg} /></g>
            <g transform="translate(72 72) scale(0.36)"><MarkPaths color={color} knock={bg} /></g>
            <Lozenge x={90} y={30} color={color} />
            <Lozenge x={30} y={90} color={color} />
            <circle cx="0" cy="60" r="1.2" fill={color} /><circle cx="120" cy="60" r="1.2" fill={color} />
            <circle cx="60" cy="0" r="1.2" fill={color} /><circle cx="60" cy="120" r="1.2" fill={color} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#jd-${id})`} />
    </svg>
  );
};
