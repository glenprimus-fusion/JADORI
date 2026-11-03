import { useState } from "react";
import { http, errMsg } from "../../lib/api";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ kind: null, msg: "" });
  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState({ kind: "error", msg: "Please enter a valid email address." });
    setState({ kind: "loading", msg: "" });
    try {
      const { data } = await http.post("/newsletter", { email });
      setState({ kind: "success", msg: data.message });
      setEmail("");
    } catch (er) { setState({ kind: "error", msg: errMsg(er) }); }
  };
  return (
    <section className="border-t border-[#E2DFDA] bg-[#FFFFFF]" data-testid="newsletter-section">
      <div className="jd-container py-20 nav:py-24 grid nav:grid-cols-2 gap-10 items-end">
        <div>
          <p className="jd-eyebrow mb-4">The JADORI letter</p>
          <h2 className="text-[28px] nav:text-[38px] leading-tight">New arrivals and lender news, occasionally.</h2>
        </div>
        <form onSubmit={submit} noValidate className="flex flex-col sm:flex-row gap-6 sm:items-end">
          <label className="flex-1">
            <span className="jd-label">Email address</span>
            <input data-testid="newsletter-email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="jd-input" />
          </label>
          <button data-testid="newsletter-submit-button" disabled={state.kind === "loading"} className="jd-btn-solid">{state.kind === "loading" ? "Joining…" : "Subscribe"}</button>
        </form>
        {state.msg && (
          <p data-testid={`newsletter-${state.kind}`} role="status" className={`nav:col-start-2 text-sm -mt-4 ${state.kind === "error" ? "text-[#1B1714] font-medium" : "text-[#4A423C]"}`}>{state.msg}</p>
        )}
      </div>
    </section>
  );
};
