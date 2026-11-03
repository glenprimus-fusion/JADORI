import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http, getUser, usd } from "../lib/api";
import { DashShell, TABS } from "./RenterDashboard";

const STAT = [["Active listings", "—"], ["Upcoming rentals", "—"], ["Earnings to date", "—"]];

export default function LenderDashboard() {
  const u = getUser();
  const [subs, setSubs] = useState(null);
  useEffect(() => { if (u) http.get("/lender/submissions", { params: { email: u.email } }).then((r) => setSubs(r.data)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DashShell title="My closet" tabs={TABS} active="/account/lender">
      <div className="grid sm:grid-cols-3 border border-[#E2DFDA] bg-[#FFFFFF] mb-12" data-testid="lender-stats">
        {STAT.map(([k, v], i) => (
          <div key={k} className={`p-6 ${i ? "sm:border-l border-t sm:border-t-0 border-[#E2DFDA]" : ""}`}>
            <p className="jd-label">{k}</p><p className="font-serif text-[30px] mt-2">{k === "Active listings" ? subs?.length ?? 0 : v}</p>
            <p className="text-[11px] text-[#7A716A]">{k === "Active listings" ? "Submitted by you" : "Shown after first completed rental"}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-end mb-4">
        <p className="jd-label">Your listings</p>
        <Link to="/lend/new" className="jd-btn-solid" data-testid="lender-new-listing-button">New listing</Link>
      </div>
      {subs && !subs.length && <p className="py-10 text-[#4A423C] border-t border-[#E2DFDA]" data-testid="lender-empty">You haven't listed a bag yet.</p>}
      {subs?.map((s) => (
        <div key={s.id} className="grid grid-cols-[1fr_auto] gap-4 py-5 border-t border-[#E2DFDA]" data-testid={`lender-listing-${s.id}`}>
          <div>
            <p className="jd-eyebrow !text-[#1B1714]">{s.brand}</p>
            <p className="font-serif text-lg">{s.name}</p>
            <p className="text-sm text-[#7A716A]">{s.color} · {s.condition} · {s.photo_checklist.length}/8 photo views · {s.city}, MA</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{usd(s.rent_per_day)} / day</p>
            {s.buy_enabled && <p className="text-sm text-[#4A423C]">Buy {usd(s.buy_price)}</p>}
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7A716A]">In review · authenticated before handoff</p>
          </div>
        </div>
      ))}
    </DashShell>
  );
}
