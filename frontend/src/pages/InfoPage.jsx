import { useParams, Link } from "react-router-dom";
import { PageHead } from "../components/jadori/Layout";

const PAGES = {
  about: ["About", "A marketplace for the bags we love — shared, not shelved.", "JADORI connects independent handbag owners with people who want to rent, and sometimes buy, authenticated designer bags. We are beginning in Massachusetts."],
  press: ["Press", "Press", "Press enquiries and assets will be listed here."],
  faq: ["FAQ", "Questions, answered.", "See our support page for the current FAQ."],
  privacy: ["Privacy Policy", "Privacy Policy", "Final policy text to be supplied by JADORI's legal counsel."],
  terms: ["Terms", "Terms of Service", "Final terms to be supplied by JADORI's legal counsel."],
  legal: ["Legal notices", "Legal notices", "Brand names are used to describe items listed by independent owners. JADORI is not affiliated with, endorsed by, or sponsored by any of the brands shown. Final notices to be supplied by legal counsel."],
};

export default function InfoPage({ slug }) {
  const p = useParams();
  const [eyebrow, title, body] = PAGES[slug || p.slug] || PAGES.about;
  return (
    <div data-testid={`info-page-${slug}`}>
      <PageHead eyebrow={eyebrow} title={title}>{body}</PageHead>
      <div className="jd-container pb-24">
        <p className="text-xs text-[#7A716A] mb-8">Placeholder copy — content pending client approval.</p>
        <Link to="/support" className="jd-btn-outline">Contact us</Link>
      </div>
    </div>
  );
}
