import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http, getUser } from "../lib/api";
import { useSaved } from "../lib/wishlist";
import { ListingCard } from "../components/jadori/ListingCard";
import { QuickView } from "../components/jadori/QuickView";
import { PlaceholderTile } from "../components/jadori/LoadingImg";
import { DashShell, TABS } from "./RenterDashboard";

const Grid = () => {
  const ids = useSaved();
  const [all, setAll] = useState(null);
  const [quick, setQuick] = useState(null);
  useEffect(() => { http.get("/listings").then((r) => setAll(r.data)); }, []);
  const items = all?.filter((l) => ids.includes(l.id));
  if (items && !items.length) return (
    <div className="py-16 border-t border-[#E2DFDA]" data-testid="saved-empty">
      <p className="font-serif text-[26px]">Nothing saved yet.</p>
      <p className="text-[#4A423C] mt-2">Tap the heart on any bag to keep it here.</p>
      <Link to="/rent/all" className="jd-btn-solid mt-8" data-testid="saved-browse-button">Browse handbags</Link>
    </div>
  );
  return (
    <>
      <p className="text-sm text-[#7A716A] mb-6" data-testid="saved-count">{items ? `${items.length} saved ${items.length === 1 ? "bag" : "bags"}` : ""}</p>
      <div className="grid grid-cols-2 nav:grid-cols-3 wide:grid-cols-4 gap-x-2 nav:gap-x-3 gap-y-10" data-testid="saved-grid">
        {(items || Array.from({ length: 4 })).map((l, k) => l ? <ListingCard key={l.id} l={l} onQuickView={setQuick} /> : <PlaceholderTile key={k} />)}
      </div>
      <QuickView l={quick} onClose={() => setQuick(null)} />
    </>
  );
};

export default function Saved() {
  if (getUser()) return <DashShell title="Saved bags" tabs={TABS} active="/account/saved"><Grid /></DashShell>;
  return (
    <div className="jd-container py-12 nav:py-16" data-testid="saved-page-guest">
      <p className="jd-eyebrow mb-3">Saved on this device</p>
      <h1 className="text-[32px] nav:text-[44px] mb-4">Saved bags</h1>
      <p className="text-sm text-[#4A423C] mb-10"><Link to="/register" className="jd-link" data-testid="saved-register-link">Create an account</Link> to keep your saved bags with your profile.</p>
      <Grid />
    </div>
  );
}
