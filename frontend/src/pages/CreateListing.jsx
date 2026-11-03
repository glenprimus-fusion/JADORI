import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ImagePlus } from "lucide-react";
import { http, errMsg, getUser } from "../lib/api";
import { BRANDS, COLORS, CITIES, CONDITIONS } from "../lib/content";
import { PageHead, ConceptNote } from "../components/jadori/Layout";

const VIEWS = ["Front (main thumbnail)", "Back", "Left side", "Right side", "Bottom", "Interior", "Hardware", "Wear & damage"];
const STEPS = ["The bag", "Photographs", "Pricing"];

const Field = ({ label, children }) => <label className="block"><span className="jd-label">{label}</span>{children}</label>;

export default function CreateListing() {
  const u = getUser();
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ lender_name: u?.full_name || "", lender_email: u?.email || "", city: "Boston", brand: "Chanel", name: "", color: "Black", condition: "Excellent", rent_per_day: "", buy_enabled: false, buy_price: "", retail_price: "", description: "", photo_checklist: [] });
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const togglePhoto = (v) => setF({ ...f, photo_checklist: f.photo_checklist.includes(v) ? f.photo_checklist.filter((x) => x !== v) : [...f.photo_checklist, v] });

  const next = () => {
    if (step === 0 && (!f.lender_name || !f.lender_email || f.name.length < 2)) return setErr("Please complete your name, email and the bag name.");
    setErr(""); setStep(step + 1);
  };
  const submit = async () => {
    if (!f.rent_per_day) return setErr("Please enter a daily rental price.");
    setBusy(true); setErr("");
    try {
      const { data } = await http.post("/listings", { ...f, rent_per_day: +f.rent_per_day, buy_price: f.buy_enabled ? +f.buy_price || null : null, retail_price: +f.retail_price || null });
      setDone(data);
    } catch (e) { setErr(errMsg(e)); } finally { setBusy(false); }
  };

  if (done) return (
    <div className="jd-container py-24 max-w-2xl" data-testid="listing-success">
      <p className="jd-eyebrow mb-4">Listing submitted</p>
      <h1 className="text-[34px] nav:text-[46px] leading-tight">Thank you. Your {done.brand} is with our team.</h1>
      <p className="mt-6 text-[#4A423C]">Status: <strong className="font-medium" data-testid="listing-success-status">Submitted · Authenticated before handoff</strong>. We'll review your photographs and arrange an independent inspection before the first rental.</p>
      <div className="flex gap-3 mt-10"><Link to="/account/lender" className="jd-btn-solid" data-testid="listing-success-dashboard">Go to dashboard</Link><Link to="/" className="jd-btn-outline">Home</Link></div>
    </div>
  );

  return (
    <div data-testid="create-listing-page">
      <PageHead eyebrow="Lend · New listing" title="List your handbag" />
      <div className="jd-container pb-24 grid nav:grid-cols-[220px_1fr] gap-10 wide:gap-20">
        <ol className="flex nav:flex-col gap-6 text-xs uppercase tracking-[0.18em]">
          {STEPS.map((s, i) => <li key={s} data-testid={`listing-step-indicator-${i}`} className={`flex items-center gap-3 ${i === step ? "text-[#1B1714] font-medium" : "text-[#7A716A]"}`}><span className={`w-6 h-6 border flex items-center justify-center ${i < step ? "bg-[#1B1714] text-[#F3F1ED] border-[#1B1714]" : "border-current"}`}>{i < step ? <Check size={12} /> : i + 1}</span>{s}</li>)}
        </ol>
        <div className="bg-[#FFFFFF] border border-[#E2DFDA] p-6 nav:p-10 space-y-7 max-w-3xl">
          {step === 0 && <div className="grid sm:grid-cols-2 gap-7">
            <Field label="Your name"><input className="jd-input" value={f.lender_name} onChange={set("lender_name")} data-testid="listing-lender-name" /></Field>
            <Field label="Email"><input type="email" className="jd-input" value={f.lender_email} onChange={set("lender_email")} data-testid="listing-lender-email" /></Field>
            <Field label="City (Massachusetts)"><select className="jd-select" value={f.city} onChange={set("city")} data-testid="listing-city">{CITIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Brand"><select className="jd-select" value={f.brand} onChange={set("brand")} data-testid="listing-brand">{BRANDS.map((b) => <option key={b.name}>{b.name}</option>)}<option>Other</option></select></Field>
            <Field label="Bag name / model"><input className="jd-input" value={f.name} onChange={set("name")} placeholder="e.g. Classic Flap, Medium" data-testid="listing-name" /></Field>
            <Field label="Color"><select className="jd-select" value={f.color} onChange={set("color")} data-testid="listing-color">{COLORS.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Condition"><select className="jd-select" value={f.condition} onChange={set("condition")} data-testid="listing-condition">{CONDITIONS.map((c) => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Original retail price (USD, optional)"><input type="number" className="jd-input" value={f.retail_price} onChange={set("retail_price")} data-testid="listing-retail" /></Field>
            <div className="sm:col-span-2"><Field label="Description"><textarea rows={3} className="jd-input resize-none" value={f.description} onChange={set("description")} placeholder="History, inclusions, any signs of wear" data-testid="listing-description" /></Field></div>
            <p className="sm:col-span-2 text-xs text-[#7A716A]">Retail price is shown crossed out only after JADORI verifies it.</p>
          </div>}
          {step === 1 && <div>
            <p className="text-[#4A423C] mb-6">Add each view. Only the main thumbnail is background-cleaned; all others stay unretouched.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VIEWS.map((v) => { const on = f.photo_checklist.includes(v); return (
                <button type="button" key={v} onClick={() => togglePhoto(v)} data-testid={`photo-slot-${v.split(" ")[0].toLowerCase()}`} className={`aspect-[2/3] border flex flex-col items-center justify-center gap-2 text-[11px] uppercase tracking-[0.12em] p-2 text-center transition-colors ${on ? "border-[#1B1714] bg-[#EFEEEC]" : "border-dashed border-[#E2DFDA] text-[#7A716A] hover:border-[#1B1714]"}`}>
                  {on ? <Check size={18} strokeWidth={1.25} /> : <ImagePlus size={18} strokeWidth={1} />}{v}
                </button>); })}
            </div>
            <div className="mt-6"><ConceptNote>Photo upload is simulated — tap a slot to mark it added. File storage is to be connected by the development team.</ConceptNote></div>
          </div>}
          {step === 2 && <div className="space-y-7">
            <Field label="Rental price per day (USD)"><input type="number" min="1" className="jd-input" value={f.rent_per_day} onChange={set("rent_per_day")} data-testid="listing-rent-price" /></Field>
            <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={f.buy_enabled} onChange={set("buy_enabled")} className="w-4 h-4 accent-[#1B1714]" data-testid="listing-buy-toggle" /><span>Also offer this bag for purchase</span></label>
            {f.buy_enabled && <Field label="Purchase price (USD)"><input type="number" className="jd-input" value={f.buy_price} onChange={set("buy_price")} data-testid="listing-buy-price" /></Field>}
            <ConceptNote>New listings display “Authenticated before handoff” until the bag passes an independent inspection.</ConceptNote>
          </div>}
          {err && <p className="text-sm font-medium" data-testid="listing-error">{err}</p>}
          <div className="flex justify-between pt-4 border-t border-[#E2DFDA]">
            <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="jd-btn-outline" data-testid="listing-back-button">Back</button>
            {step < 2 ? <button type="button" onClick={next} className="jd-btn-solid" data-testid="listing-next-button">Continue</button>
              : <button type="button" onClick={submit} disabled={busy} className="jd-btn-solid" data-testid="listing-submit-button">{busy ? "Submitting…" : "Submit listing"}</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
