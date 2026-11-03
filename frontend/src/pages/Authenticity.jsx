import { Link } from "react-router-dom";
import { AUTH_STEPS, AUTH_NOTICE } from "../lib/content";
import { AuthBadge, AuthSeal } from "../components/jadori/AuthBadge";
import { PageHead } from "../components/jadori/Layout";

export default function Authenticity() {
  return (
    <div data-testid="authenticity-page">
      <PageHead eyebrow="Authenticity" title="Built on authenticity.">{AUTH_NOTICE}</PageHead>
      <section className="jd-container pb-20 grid nav:grid-cols-3 gap-10">
        {AUTH_STEPS.map((s, i) => (
          <div key={s.t} className="border-t border-[#1B1714] pt-6">
            <p className="font-serif text-[40px] text-[#7A716A]">0{i + 1}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] font-medium">{s.t}</p>
            <p className="mt-3 text-[#4A423C]">{s.d}</p>
          </div>
        ))}
      </section>
      <section className="bg-[#1F1A17] text-[#F3F1ED]">
        <div className="jd-container py-20 grid nav:grid-cols-[auto_1fr] gap-12 items-center">
          <AuthSeal size={160} light />
          <div className="max-w-2xl">
            <h2 className="text-[28px] nav:text-[38px] leading-tight">What each status means</h2>
            <dl className="mt-8 space-y-6">
              <div><dt className="text-xs uppercase tracking-[0.18em]">Authenticated</dt><dd className="text-[#F3F1ED]/75 mt-1">The bag has already passed an independent, in-person inspection. Only these bags may show the seal.</dd></div>
              <div><dt className="text-xs uppercase tracking-[0.18em]">Authenticated before handoff</dt><dd className="text-[#F3F1ED]/75 mt-1">A new listing. Inspection happens before the bag reaches its first renter or buyer. If it does not pass, the booking is cancelled and refunded.</dd></div>
            </dl>
            <p className="text-xs text-[#F3F1ED]/50 mt-8">The circular seal is a proposed visual pending approval. Authentication partners and procedures are to be confirmed.</p>
          </div>
        </div>
      </section>
      <section className="jd-container py-20 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
        <div className="flex gap-8"><AuthBadge status="verified" /><AuthBadge status="pending" /></div>
        <Link to="/rent/all" className="jd-btn-solid" data-testid="authenticity-browse-button">Browse bags</Link>
      </section>
    </div>
  );
}
