import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Check, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MarkPaths } from "./Monogram";

const Label = ({ status }) => status === "verified"
  ? <><ShieldCheck size={14} strokeWidth={1.25} /> Authenticated</>
  : <><Clock size={13} strokeWidth={1.25} /> Authenticated before handoff</>;

const CHECKS = ["Materials & stitching", "Hardware, serial & date codes", "Shape & construction"];

const Explainer = ({ status, id, testid }) => {
  const ok = status === "verified";
  return (
    <div data-testid={`${testid}-popover`}>
      <div className="flex items-center gap-3">
        {ok ? <AuthSeal size={44} /> : <span className="w-[44px] h-[44px] shrink-0 rounded-full border border-dashed border-[#7A716A] flex items-center justify-center"><Clock size={16} strokeWidth={1} /></span>}
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] font-medium">{ok ? "Authenticated" : "Authenticated before handoff"}</p>
          <p className="text-[11px] text-[#7A716A]">{ok ? "Inspection passed · sample status" : "New listing · not yet inspected"}</p>
        </div>
      </div>
      <p className="text-[13px] text-[#4A423C] mt-4 leading-relaxed">
        {ok ? "This bag passed an independent, in-person inspection before a previous rental." : "This bag will be inspected in person by an independent specialist before it reaches you. If it doesn't pass, your booking is cancelled and fully refunded."}
      </p>
      <p className="jd-label !text-[10px] mt-4 mb-2">{ok ? "What was checked" : "What will be checked"}</p>
      <ul className="space-y-1.5">
        {CHECKS.map((c) => <li key={c} className="flex items-center gap-2 text-[13px]">{ok ? <Check size={13} strokeWidth={1.5} /> : <span className="w-[13px] h-[13px] rounded-full border border-[#E2DFDA]" />}{c}</li>)}
      </ul>
      {ok && id && <p className="text-[10px] uppercase tracking-[0.18em] text-[#7A716A] mt-4" data-testid={`${testid}-record`}>Record no. JD-SAMPLE-{id.replace("sample-", "").padStart(4, "0")}</p>}
      <Link to="/authenticity" className="block mt-4 pt-3 border-t border-[#E2DFDA] text-[11px] uppercase tracking-[0.18em] font-medium hover:opacity-70" data-testid={`${testid}-link`}>How authentication works →</Link>
    </div>
  );
};

export const AuthBadge = ({ status, testid = "auth-badge", id, interactive = true }) => {
  const [open, setOpen] = useState(false);
  const cls = `inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] ${status === "verified" ? "text-[#1B1714]" : "text-[#7A716A]"}`;
  if (!interactive) return <span data-testid={testid} className={cls}><Label status={status} /></span>;
  const toggle = (e) => { e.preventDefault(); e.stopPropagation(); setOpen((o) => !o); };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span role="button" tabIndex={0} aria-expanded={open} aria-label={`${status === "verified" ? "Authenticated" : "Authenticated before handoff"}: what this means`} data-testid={testid}
          onClick={toggle} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(e)}
          className={`${cls} cursor-pointer underline-offset-4 decoration-[#E2DFDA] hover:underline`}>
          <Label status={status} /><Info size={11} strokeWidth={1.25} className="opacity-60" />
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} onClick={(e) => e.stopPropagation()} className="w-[290px] rounded-none border-[#E2DFDA] bg-[#FFFFFF] p-5 shadow-[0_20px_40px_-20px_rgba(27,23,20,0.35)]">
        <Explainer status={status} id={id} testid={testid} />
      </PopoverContent>
    </Popover>
  );
};

export const AuthSeal = ({ size = 92, light = false }) => {
  const c = light ? "#F3F1ED" : "#1B1714";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label="Proposed JADORI authenticity seal" data-testid="authenticity-seal">
      <circle cx="50" cy="50" r="48" fill="none" stroke={c} strokeWidth="0.8" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={c} strokeWidth="0.5" />
      <defs><path id="ring" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
      <text fill={c} fontSize="6.4" letterSpacing="2.4" fontFamily="Jost"><textPath href="#ring">AUTHENTICATED · INDEPENDENTLY VERIFIED ·</textPath></text>
      <g transform="translate(37 37) scale(0.26)"><MarkPaths color={c} knock={light ? "#1F1A17" : "#F8F7F5"} /></g>
    </svg>
  );
};

export const SampleTag = ({ className = "" }) => (
  <span className={`text-[10px] uppercase tracking-[0.18em] bg-[#FFFFFF]/90 text-[#4A423C] px-2 py-1 ${className}`}>Sample listing</span>
);
