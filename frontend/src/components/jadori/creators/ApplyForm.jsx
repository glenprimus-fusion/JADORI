import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { http, errMsg } from "../../../lib/api";
import { PLATFORMS, AUDIENCES, INTERESTS, CREATOR_EMAIL } from "../../../lib/creators";
import { CITIES } from "../../../lib/content";

const EMPTY = { full_name: "", email: "", handle: "", platform: "Instagram", audience: AUDIENCES[0], city: "", interests: [], message: "" };

const Field = ({ label, children }) => <label className="block"><span className="jd-label">{label}</span>{children}</label>;

const Done = ({ r, onReset }) => (
  <div className="py-10" data-testid="creator-apply-success">
    <span className="w-12 h-12 rounded-full border border-[#1B1714] flex items-center justify-center"><Check size={20} strokeWidth={1.2} /></span>
    <h3 className="font-serif text-[30px] mt-6">Thank you, {r.handle}.</h3>
    <p className="mt-3 text-[#4A423C] max-w-md">Your application is with the JADORI team. We reply to every creator within five working days.</p>
    <p className="text-[11px] text-[#7A716A] mt-4">Concept prototype: the application is saved, but no email is sent to the team yet.</p>
    <button onClick={onReset} className="jd-link text-[13px] mt-8" data-testid="creator-apply-again">Send another application</button>
  </div>
);

export const ApplyForm = () => {
  const [f, setF] = useState(EMPTY);
  const [st, setSt] = useState({ busy: false, err: "", done: null });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (i) => setF({ ...f, interests: f.interests.includes(i) ? f.interests.filter((x) => x !== i) : [...f.interests, i] });
  const submit = async (e) => {
    e.preventDefault();
    setSt({ busy: true, err: "", done: null });
    try { const r = await http.post("/creator-applications", f); setSt({ busy: false, err: "", done: r.data }); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); }
    catch (er) { setSt({ busy: false, err: errMsg(er), done: null }); }
  };
  if (st.done) return <Done r={st.done} onReset={() => { setF(EMPTY); setSt({ busy: false, err: "", done: null }); }} />;

  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-x-8 gap-y-7" data-testid="creator-apply-form">
      <Field label="Full name"><input required minLength={2} value={f.full_name} onChange={set("full_name")} className="jd-input" data-testid="creator-name-input" /></Field>
      <Field label="Email"><input required type="email" value={f.email} onChange={set("email")} className="jd-input" data-testid="creator-email-input" /></Field>
      <Field label="Handle"><input required minLength={2} placeholder="@yourname" value={f.handle} onChange={set("handle")} className="jd-input" data-testid="creator-handle-input" /></Field>
      <Field label="Main platform"><select value={f.platform} onChange={set("platform")} className="jd-select" data-testid="creator-platform-select">{PLATFORMS.map((p) => <option key={p}>{p}</option>)}</select></Field>
      <Field label="Audience size"><select value={f.audience} onChange={set("audience")} className="jd-select" data-testid="creator-audience-select">{AUDIENCES.map((p) => <option key={p}>{p}</option>)}</select></Field>
      <Field label="Based in"><select value={f.city} onChange={set("city")} className="jd-select" data-testid="creator-city-select"><option value="">Choose a town</option>{CITIES.map((c) => <option key={c}>{c}</option>)}<option>Elsewhere</option></select></Field>
      <fieldset className="sm:col-span-2">
        <legend className="jd-label mb-3">Most interested in</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <button type="button" key={i} onClick={() => toggle(i)} aria-pressed={f.interests.includes(i)} data-testid={`creator-interest-${i.toLowerCase().replace(/ /g, "-")}`}
              className={`jd-chip h-[40px] px-5 border text-[11px] uppercase tracking-[0.16em] ${f.interests.includes(i) ? "bg-[#1B1714] text-[#F3F1ED] border-[#1B1714]" : "border-[#E2DFDA] hover:border-[#1B1714]"}`}>{i}</button>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2"><Field label="Tell us about your content (optional)"><textarea rows={3} value={f.message} onChange={set("message")} className="jd-input resize-none" data-testid="creator-message-input" /></Field></div>
      {st.err && <p className="sm:col-span-2 text-sm font-medium" data-testid="creator-apply-error">{st.err}</p>}
      <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
        <button disabled={st.busy} className="jd-btn-solid sm:w-auto" data-testid="creator-apply-submit">{st.busy ? "Sending…" : "Send application"}</button>
        <a href={`mailto:${CREATOR_EMAIL}?subject=JADORI%20Creators`} className="jd-link text-[13px] inline-flex items-center gap-2" data-testid="creator-email-link"><Mail size={14} strokeWidth={1.2} />Or email {CREATOR_EMAIL}</a>
      </div>
    </form>
  );
};
