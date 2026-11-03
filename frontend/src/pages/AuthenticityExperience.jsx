import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Camera, Undo2, UserCheck, Eye } from "lucide-react";
import { AUTH_NOTICE } from "../lib/content";
import { AuthSeal } from "../components/jadori/AuthBadge";
import { MonogramPattern } from "../components/jadori/Monogram";
import { SectionHead, Pillars, WorldFAQ, CTABand } from "../components/jadori/World";
import { Inspection } from "../components/jadori/auth/Inspection";
import { Journey } from "../components/jadori/auth/Journey";
import { Verify } from "../components/jadori/auth/Certificate";

const PROMISE = [
  [UserCheck, "Independent specialists", "Inspections are carried out in person by independent authentication specialists (partner to be confirmed)."],
  [Undo2, "Full refund if it fails", "If a bag doesn't pass, your booking or purchase is cancelled and fully refunded."],
  [Camera, "Never retouched", "Condition photographs are never edited to hide wear. Only the main thumbnail background is cleaned."],
  [Eye, "Checked every return", "Condition is compared against handoff photos after every rental."],
];

const FAQ = [
  ["Why can a bag be listed before it's authenticated?", "So owners can join quickly. A new listing is clearly marked “Authenticated before handoff” and cannot reach a renter or buyer until it passes inspection."],
  ["Who authenticates the bags?", "Independent, in-person specialists. JADORI's authentication partner is being confirmed and will be named here before launch."],
  ["What if I'm unsure about a bag I received?", "Contact us straight away through Support with your record number. We'll review the handoff photographs and inspection record with you."],
  ["Does the seal mean the bag is new?", "No. The seal confirms authenticity only. Condition is graded separately as Excellent, Very good or Good, with unretouched photographs."],
];

const Hero = () => (
  <section className="relative bg-[#1F1A17] text-[#F3F1ED] overflow-hidden" data-testid="auth-hero">
    <div className="absolute inset-0"><MonogramPattern color="#F3F1ED" bg="#1F1A17" opacity={0.06} tile={120} testid="auth-hero-pattern" /></div>
    <div className="relative jd-container py-20 nav:py-32 grid nav:grid-cols-[1.3fr_1fr] gap-14 items-center">
      <div className="jd-fade">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#F3F1ED]/60 mb-6">Authenticity at JADORI</p>
        <h1 className="text-[36px] nav:text-[60px] leading-[1.04] max-w-3xl">Authenticity isn't a promise. It's a process.</h1>
        <p className="mt-7 text-[#F3F1ED]/75 max-w-xl">{AUTH_NOTICE} Here is exactly how, when, and what you'll see at every step.</p>
        <div className="flex flex-wrap gap-3 mt-10">
          <a href="#journey" className="jd-btn-light" data-testid="auth-hero-journey">Follow a bag's journey</a>
          <Link to="/rent/all" className="jd-btn border border-[#F3F1ED] text-[#F3F1ED] hover:bg-[#F3F1ED] hover:text-[#1F1A17]" data-testid="authenticity-browse-button">Browse bags</Link>
        </div>
      </div>
      <div className="flex justify-center jd-fade jd-fade-2"><div className="w-[220px] nav:w-[300px] aspect-square"><AuthSeal size="100%" light /></div></div>
    </div>
  </section>
);

const Statuses = () => (
  <section className="jd-container py-20 nav:py-28" data-testid="auth-statuses">
    <SectionHead eyebrow="Two statuses, never confused" title="What each label on a listing means" />
    <div className="grid nav:grid-cols-2 gap-4">
      <div className="p-8 nav:p-10 border border-[#E2DFDA] bg-[#FFFFFF]" data-testid="status-pending">
        <Clock size={28} strokeWidth={1} />
        <p className="font-serif text-[28px] mt-6">Authenticated before handoff</p>
        <p className="mt-4 text-[#4A423C]">A new listing. It has <strong className="font-medium">not yet</strong> been inspected. Inspection happens before the bag reaches its first renter or buyer. No seal is shown.</p>
      </div>
      <div className="p-8 nav:p-10 bg-[#1F1A17] text-[#F3F1ED] flex gap-6 items-start" data-testid="status-verified">
        <div className="flex-1">
          <ShieldCheck size={28} strokeWidth={1} />
          <p className="font-serif text-[28px] mt-6">Authenticated</p>
          <p className="mt-4 text-[#F3F1ED]/75">The bag has passed an independent, in-person inspection and holds a record number. Only these bags display the JADORI seal.</p>
        </div>
        <AuthSeal size={96} light />
      </div>
    </div>
  </section>
);

export default function Authenticity() {
  return (
    <div data-testid="authenticity-page" className="overflow-x-hidden">
      <Hero />
      <Inspection />
      <Journey />
      <Statuses />
      <Verify />
      <section className="jd-container py-20 nav:py-28">
        <SectionHead eyebrow="Our commitments" title="Trust, built into every handoff" />
        <Pillars items={PROMISE} testid="auth-promise" />
      </section>
      <WorldFAQ items={FAQ} testid="auth-faq" />
      <CTABand testid="auth-cta" title="Carry it with complete confidence." copy="Browse authenticated designer handbags from owners across Massachusetts." cta="Browse bags" to="/rent/all" />
      <p className="jd-container py-6 text-xs text-[#7A716A]">Concept prototype. Authentication partners, procedures and record numbers shown are illustrative and not yet operational.</p>
    </div>
  );
}
