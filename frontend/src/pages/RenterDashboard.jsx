import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http, getUser, clearUser, usd } from "../lib/api";
import { ConceptNote } from "../components/jadori/Layout";

export const DashShell = ({ title, tabs, active, children }) => {
  const u = getUser();
  const nav = useNavigate();
  if (!u) return (
    <div className="jd-container py-28 max-w-xl" data-testid="dashboard-signed-out">
      <h1 className="text-[34px]">Create an account to see your dashboard.</h1>
      <Link to="/register" className="jd-btn-solid mt-8" data-testid="dashboard-register-link">Create account</Link>
    </div>
  );
  return (
    <div className="jd-container py-12 nav:py-16" data-testid="dashboard">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div><p className="jd-eyebrow mb-3">{u.full_name} · {u.city}, MA</p><h1 className="text-[32px] nav:text-[44px]">{title}</h1></div>
        <div className="flex gap-6 text-xs uppercase tracking-[0.18em]">
          {tabs.map(([l, to]) => <Link key={to} to={to} data-testid={`dash-tab-${l.toLowerCase()}`} className={`pb-1 border-b ${active === to ? "border-[#1B1714]" : "border-transparent text-[#7A716A] hover:text-[#1B1714]"}`}>{l}</Link>)}
          <button onClick={() => { clearUser(); nav("/"); }} className="uppercase tracking-[0.18em] text-[#7A716A] hover:text-[#1B1714]" data-testid="dash-sign-out">Sign out</button>
        </div>
      </div>
      {children}
      <div className="mt-14"><ConceptNote /></div>
    </div>
  );
};

export const TABS = [["Renting", "/account/renter"], ["Lending", "/account/lender"], ["Saved", "/account/saved"]];

const ReqRow = ({ r, kind }) => (
  <div className="grid grid-cols-[72px_1fr_auto] gap-5 items-center py-5 border-b border-[#E2DFDA]" data-testid={`${kind}-request-${r.id}`}>
    <div className="aspect-[2/3] jd-photo overflow-hidden"><img src={r.listing.images[0].url} alt="" className="w-full h-full object-cover jd-cleaned" /></div>
    <div>
      <p className="jd-eyebrow !text-[#1B1714]">{r.listing.brand}</p>
      <p className="font-serif text-lg">{r.listing.name}</p>
      <p className="text-sm text-[#7A716A]">{kind === "rental" ? `${r.start_date} → ${r.end_date} · ${r.quote.days} days` : "Purchase request"}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">{usd(kind === "rental" ? r.quote.total : r.price)}</p>
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#7A716A]">Awaiting lender</p>
    </div>
  </div>
);

export default function RenterDashboard() {
  const u = getUser();
  const [rentals, setRentals] = useState(null);
  const [buys, setBuys] = useState([]);
  useEffect(() => {
    if (!u) return;
    http.get("/rental-requests", { params: { email: u.email } }).then((r) => setRentals(r.data));
    http.get("/purchase-requests", { params: { email: u.email } }).then((r) => setBuys(r.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DashShell title="My rentals" tabs={TABS} active="/account/renter">
      <div className="grid nav:grid-cols-[1fr_320px] gap-12">
        <div>
          <p className="jd-label mb-2">Rental requests</p>
          {rentals && !rentals.length && <p className="py-8 text-[#4A423C]" data-testid="renter-empty">No requests yet. <Link to="/rent" className="jd-link">Browse bags to rent</Link></p>}
          {rentals?.map((r) => <ReqRow key={r.id} r={r} kind="rental" />)}
          {!!buys.length && <><p className="jd-label mt-12 mb-2">Purchase requests</p>{buys.map((r) => <ReqRow key={r.id} r={r} kind="purchase" />)}</>}
        </div>
        <aside className="bg-[#FFFFFF] border border-[#E2DFDA] p-6 space-y-4 h-fit" data-testid="renter-summary">
          <p className="jd-label">Summary</p>
          <p className="flex justify-between text-sm"><span>Open rental requests</span><span data-testid="renter-open-count">{rentals?.length ?? 0}</span></p>
          <p className="flex justify-between text-sm"><span>Purchase requests</span><span>{buys.length}</span></p>
          <p className="text-xs text-[#7A716A]">Deposits are released after each return inspection.</p>
          <Link to="/rent" className="jd-btn-outline w-full">Find a bag</Link>
        </aside>
      </div>
    </DashShell>
  );
}
