import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http, errMsg, setUser } from "../lib/api";
import { CITIES, DOORS } from "../lib/content";
import { ConceptNote } from "../components/jadori/Layout";

export default function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({ full_name: "", email: "", role: "rent", city: "Boston", agree: false });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!f.agree) return setErr("Please accept the Terms and Privacy Policy.");
    setBusy(true); setErr("");
    try {
      const { agree, ...body } = f;
      const { data } = await http.post("/registrations", body);
      setUser(data);
      nav(data.role === "lend" ? "/account/lender" : "/account/renter");
    } catch (er) { setErr(errMsg(er)); } finally { setBusy(false); }
  };

  return (
    <div className="jd-container grid nav:grid-cols-2 gap-12 py-12 nav:py-16" data-testid="register-page">
      <div className="hidden nav:block aspect-[4/5] jd-photo overflow-hidden"><img src={DOORS.rent[0]} alt="Editorial placeholder" className="w-full h-full object-cover" /></div>
      <form onSubmit={submit} className="max-w-md space-y-7 jd-fade nav:pt-10">
        <p className="jd-eyebrow">Create account</p>
        <h1 className="text-[34px] nav:text-[44px] leading-tight">Join JADORI</h1>
        <label className="block"><span className="jd-label">Full name</span><input required minLength={2} className="jd-input" value={f.full_name} onChange={set("full_name")} data-testid="register-name-input" /></label>
        <label className="block"><span className="jd-label">Email</span><input required type="email" className="jd-input" value={f.email} onChange={set("email")} data-testid="register-email-input" /></label>
        <fieldset>
          <legend className="jd-label mb-3">I want to</legend>
          <div className="grid grid-cols-3 border border-[#1B1714]">
            {[["rent", "Rent"], ["lend", "Lend"], ["both", "Both"]].map(([v, l]) => (
              <button type="button" key={v} onClick={() => setF({ ...f, role: v })} data-testid={`register-role-${v}`} className={`h-[44px] text-[11px] uppercase tracking-[0.18em] font-medium transition-colors ${f.role === v ? "bg-[#1B1714] text-[#F3F1ED]" : "hover:bg-[#EFEEEC]"}`}>{l}</button>
            ))}
          </div>
        </fieldset>
        <label className="block"><span className="jd-label">City (Massachusetts)</span><select className="jd-select" value={f.city} onChange={set("city")} data-testid="register-city-select">{CITIES.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label className="flex gap-3 text-sm text-[#4A423C] cursor-pointer"><input type="checkbox" checked={f.agree} onChange={set("agree")} className="mt-1 accent-[#1B1714]" data-testid="register-agree-checkbox" />I agree to the <Link to="/terms" className="jd-link">Terms</Link> and <Link to="/privacy" className="jd-link">Privacy Policy</Link>.</label>
        {err && <p className="text-sm font-medium" data-testid="register-error">{err}</p>}
        <button disabled={busy} className="jd-btn-solid w-full" data-testid="register-submit-button">{busy ? "Creating…" : "Create account"}</button>
        <ConceptNote>Concept registration — no password or secure sign-in yet. The development team will connect a real sign-in system.</ConceptNote>
      </form>
    </div>
  );
}
