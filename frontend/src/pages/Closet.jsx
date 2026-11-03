import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { http } from "../lib/api";
import { toggleFollow, useFollowing } from "../lib/follows";
import { ListingCard } from "../components/jadori/ListingCard";
import { QuickView } from "../components/jadori/QuickView";
import { PlaceholderTile } from "../components/jadori/LoadingImg";
import { TopLenderBadge } from "../components/jadori/TopLender";

export const FollowButton = ({ slug, className = "", testid = "follow-button" }) => {
  const on = useFollowing().includes(slug);
  return (
    <button onClick={() => toggleFollow(slug)} aria-pressed={on} data-testid={testid}
      className={`${on ? "jd-btn-solid" : "jd-btn-outline"} ${className}`}>{on ? "Following" : "Follow closet"}</button>
  );
};

const Stat = ({ k, v, testid }) => (
  <div><p className="font-serif text-[26px] nav:text-[30px] leading-none" data-testid={testid}>{v}</p><p className="text-[10px] uppercase tracking-[0.18em] text-[#7A716A] mt-2">{k}</p></div>
);

export default function Closet() {
  const { slug } = useParams();
  const [c, setC] = useState(null);
  const [err, setErr] = useState(false);
  const [quick, setQuick] = useState(null);
  const followed = useFollowing().includes(slug);
  useEffect(() => { http.get(`/lenders/${slug}`).then((r) => setC(r.data)).catch(() => setErr(true)); }, [slug]);
  if (err) return <div className="jd-container py-32 text-center"><p className="font-serif text-3xl">This closet could not be found.</p><Link to="/rent/all" className="jd-btn-outline mt-8">Browse bags</Link></div>;

  return (
    <div data-testid="closet-page">
      <section className="jd-container pt-12 nav:pt-20 pb-12 nav:pb-16 border-b border-[#E2DFDA]">
        <div className="grid nav:grid-cols-[auto_1fr_auto] gap-8 nav:gap-12 items-center jd-fade">
          <div className="w-[96px] h-[96px] nav:w-[132px] nav:h-[132px] rounded-full jd-photo flex items-center justify-center font-serif text-[44px] nav:text-[56px]" aria-hidden>{c?.name[0]}</div>
          <div>
            <p className="jd-eyebrow">The closet of</p>
            <h1 className="text-[38px] nav:text-[56px] leading-none mt-3" data-testid="closet-name">{c?.name || "\u00a0"}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[14px] text-[#4A423C]">
              {c?.top && <TopLenderBadge testid="closet-top-lender" />}
              <span>{c?.city}, MA</span><span>Lending since {c?.since}</span><span>Replies {c?.response}</span>
            </div>
            <p className="mt-5 max-w-xl text-[#4A423C]" data-testid="closet-bio">{c?.bio}</p>
          </div>
          <FollowButton slug={slug} className="w-full sm:w-auto" testid="closet-follow-button" />
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl">
          <Stat k="Bags" v={c?.listings.length ?? "–"} testid="closet-bag-count" />
          <Stat k="Rating" v={c?.rating ? <span className="inline-flex items-center gap-2">{c.rating.toFixed(1)}<Star size={16} strokeWidth={1} className="fill-[#1B1714]" /></span> : "New"} testid="closet-rating" />
          <Stat k="Rentals" v={c?.rentals ?? "–"} />
          <Stat k="Followers" v={c ? c.followers + (followed ? 1 : 0) : "–"} testid="closet-followers" />
        </div>
      </section>
      <section className="jd-container py-14 nav:py-20">
        <p className="jd-eyebrow mb-8">In this closet · sample listings</p>
        <div className="grid grid-cols-2 nav:grid-cols-3 wide:grid-cols-4 gap-x-2 nav:gap-x-3 gap-y-10" data-testid="closet-grid">
          {(c?.listings || Array.from({ length: 3 })).map((l, k) => l ? <ListingCard key={l.id} l={l} onQuickView={setQuick} /> : <PlaceholderTile key={k} />)}
        </div>
        <p className="text-[11px] text-[#7A716A] mt-12">Ratings, rentals and followers are sample figures for the prototype.</p>
      </section>
      <QuickView l={quick} onClose={() => setQuick(null)} />
    </div>
  );
}
