import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { http, errMsg, getUser, setUser, usd } from "../../lib/api";

const round10 = (n) => Math.round(n / 10) * 10;

const Result = ({ o, l, onAccept, busy }) => {
  const copy = {
    accepted: [`Offer accepted`, `${l.lender.name} accepted ${usd(o.amount)}. The bag is reserved for you while it is authenticated.`],
    countered: [`${l.lender.name} countered`, `The owner would let it go for ${usd(o.counter)}.`],
    declined: [`Not this time`, `${l.lender.name} would like to keep the asking price closer to ${usd(l.buy_price)}. You can try a new offer.`],
  }[o.status];
  return (
    <div data-testid="offer-result" data-status={o.status}>
      <p className="jd-eyebrow">Sample owner reply</p>
      <DialogTitle className="font-serif font-normal text-[28px] mt-2" data-testid="offer-result-title">{copy[0]}</DialogTitle>
      <DialogDescription className="mt-3 text-[#4A423C]">{copy[1]}</DialogDescription>
      {o.status === "countered" && <button onClick={onAccept} disabled={busy} className="jd-btn-solid w-full mt-8" data-testid="offer-accept-counter-button">Accept {usd(o.counter)}</button>}
      {o.status === "accepted" && <Link to="/account/renter" className="jd-btn-solid w-full mt-8" data-testid="offer-view-account">View in my account</Link>}
      <p className="text-[11px] text-[#7A716A] mt-4">Concept prototype. Replies are simulated and no payment is taken.</p>
    </div>
  );
};

export const OfferDialog = ({ open, onClose, l }) => {
  const user = getUser();
  const [f, setF] = useState({ full_name: "", email: "", amount: "" });
  const [st, setSt] = useState({ busy: false, err: "", offer: null });
  useEffect(() => {
    if (open) { setF({ full_name: user?.full_name || "", email: user?.email || "", amount: round10(l.buy_price * 0.9) }); setSt({ busy: false, err: "", offer: null }); }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSt({ busy: true, err: "", offer: null });
    try {
      const r = await http.post("/offers", { listing_id: l.id, full_name: f.full_name, email: f.email, amount: Number(f.amount) });
      setUser({ role: "rent", city: l.lender.city, ...(user || {}), full_name: f.full_name, email: f.email });
      setSt({ busy: false, err: "", offer: r.data });
    } catch (er) { setSt({ busy: false, err: errMsg(er), offer: null }); }
  };
  const acceptCounter = async () => {
    setSt((s) => ({ ...s, busy: true }));
    const r = await http.post(`/offers/${st.offer.id}/accept-counter`);
    setSt({ busy: false, err: "", offer: r.data });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-none bg-[#F8F7F5] border-[#E2DFDA] max-w-md p-8" data-testid="offer-dialog">
        {st.offer ? <Result o={st.offer} l={l} onAccept={acceptCounter} busy={st.busy} /> : (
          <form onSubmit={submit} className="space-y-5">
            <DialogTitle className="font-serif font-normal text-[26px]">Make an offer</DialogTitle>
            <DialogDescription className="text-sm text-[#4A423C]">{l.brand} {l.name} · asking {usd(l.buy_price)}</DialogDescription>
            <label className="block">
              <span className="jd-label">Your offer (USD)</span>
              <input required type="number" min="1" value={f.amount} onChange={set("amount")} className="jd-input font-serif !text-[28px]" data-testid="offer-amount-input" />
            </label>
            <div className="flex gap-2" data-testid="offer-suggestions">
              {[0.95, 0.9, 0.85].map((p) => (
                <button type="button" key={p} onClick={() => setF({ ...f, amount: round10(l.buy_price * p) })} data-testid={`offer-suggest-${Math.round((1 - p) * 100)}`}
                  className={`flex-1 h-[40px] border text-[11px] tracking-[0.1em] transition-colors ${Number(f.amount) === round10(l.buy_price * p) ? "border-[#1B1714] bg-[#1B1714] text-[#F3F1ED]" : "border-[#E2DFDA] hover:border-[#1B1714]"}`}>
                  {usd(round10(l.buy_price * p))}<span className="opacity-60"> · −{Math.round((1 - p) * 100)}%</span>
                </button>
              ))}
            </div>
            <label className="block"><span className="jd-label">Full name</span><input required value={f.full_name} onChange={set("full_name")} className="jd-input" data-testid="offer-name-input" /></label>
            <label className="block"><span className="jd-label">Email</span><input required type="email" value={f.email} onChange={set("email")} className="jd-input" data-testid="offer-email-input" /></label>
            {st.err && <p className="text-sm font-medium" data-testid="offer-error">{st.err}</p>}
            <button disabled={st.busy} className="jd-btn-solid w-full" data-testid="offer-submit-button">{st.busy ? "Sending…" : "Send offer"}</button>
            <p className="text-[11px] text-[#7A716A]">Owners can accept, decline or counter. Offers below 60% of the asking price aren't sent.</p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
