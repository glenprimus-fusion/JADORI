import { ShieldCheck, Clock } from "lucide-react";

export const AuthBadge = ({ status, testid }) =>
  status === "verified" ? (
    <span data-testid={testid} className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#1B1714]">
      <ShieldCheck size={14} strokeWidth={1.25} /> Authenticated
    </span>
  ) : (
    <span data-testid={testid} className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#7A716A]">
      <Clock size={13} strokeWidth={1.25} /> Authenticated before handoff
    </span>
  );

export const AuthSeal = ({ size = 92, light = false }) => {
  const c = light ? "#F3F1ED" : "#1B1714";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Proposed JADORI authenticity seal" data-testid="authenticity-seal">
      <circle cx="50" cy="50" r="48" fill="none" stroke={c} strokeWidth="0.8" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={c} strokeWidth="0.5" />
      <defs><path id="ring" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
      <text fill={c} fontSize="6.4" letterSpacing="2.4" fontFamily="Jost"><textPath href="#ring">AUTHENTICATED · INDEPENDENTLY VERIFIED ·</textPath></text>
      <text x="50" y="54" textAnchor="middle" fill={c} fontFamily="Prata" fontSize="11" letterSpacing="2">J</text>
    </svg>
  );
};

export const SampleTag = ({ className = "" }) => (
  <span className={`text-[10px] uppercase tracking-[0.18em] bg-[#FFFFFF]/90 text-[#4A423C] px-2 py-1 ${className}`}>Sample listing</span>
);
