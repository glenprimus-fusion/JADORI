import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { http, errMsg, getUser, setUser, usd } from "../../lib/api";

export const RequestDialog = ({ kind, onClose, l, range, q, days }) => {
  const user = getUser();
  const [form, setForm] = useState({ full_name: "", email: "", message: "" });
  const [state, setState] = useState({ s: "idle", err: "" });
  useEffect(() => {
    if (kind) { setForm({ full_name: user?.full_name || "", email: user?.email || "", message: "" }); setState({ s: "idle", err: "" }); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  const submit = async (e) => {
    e.preventDefault();
    setState({ s: "loading", err: "" });
    try {
      const body = { listing_id: l.id, ...form };
      if (kind === "rent") await http.post("/rental-requests", { ...body, start_date: format(range.from, "yyyy-MM-dd"), end_date: format(range.to, "yyyy-MM-dd") });
      else await http.post("/purchase-requests", body);
      setUser({ role: "rent", city: l.lender.city, ...(user || {}), full_name: form.full_name, email: form.email });
      setState({ s: "done", err: "" });
    } catch (er) { setState({ s: "idle", err: errMsg(er) }); }
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <Dialog open={!!kind} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-none bg-[#F8F7F5] border-[#E2DFDA] max-w-md p-8" data-testid="request-dialog">
        {state.s === "done" ? (
          <div data-testid="request-success">
            <DialogTitle className="font-serif font-normal text-[28px]">Request sent</DialogTitle>
            <DialogDescription className="mt-3 text-[#4A423C]">
              {l.lender.name} will review your {kind === "rent" ? "rental" : "purchase"} request. {l.auth_status === "verified" ? "" : "This bag will be authenticated before handoff."} This is a concept prototype — no payment has been taken.
            </DialogDescription>
            <Link to="/account/renter" className="jd-btn-solid w-full mt-8" data-testid="request-view-dashboard">View in my account</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <DialogTitle className="font-serif font-normal text-[26px]">{kind === "rent" ? "Request to rent" : "Request to buy"}</DialogTitle>
            <DialogDescription className="text-sm text-[#4A423C]">
              {l.brand} {l.name} · {kind === "rent" && q ? `${days} days · ${usd(q.total)} total due` : usd(l.buy_price)}
            </DialogDescription>
            <label className="block"><span className="jd-label">Full name</span><input required value={form.full_name} onChange={set("full_name")} className="jd-input" data-testid="request-name-input" /></label>
            <label className="block"><span className="jd-label">Email</span><input required type="email" value={form.email} onChange={set("email")} className="jd-input" data-testid="request-email-input" /></label>
            <label className="block"><span className="jd-label">Note to lender (optional)</span><input value={form.message} onChange={set("message")} className="jd-input" data-testid="request-message-input" /></label>
            {state.err && <p className="text-sm font-medium" data-testid="request-error">{state.err}</p>}
            <button disabled={state.s === "loading"} className="jd-btn-solid w-full" data-testid="request-submit-button">{state.s === "loading" ? "Sending…" : "Send request"}</button>
            <p className="text-[11px] text-[#7A716A]">Simulated flow. No card is charged.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
