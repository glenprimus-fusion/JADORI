import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { LoadingImg } from "../components/jadori/LoadingImg";
import { SectionHead, Timeline, WorldFAQ } from "../components/jadori/World";
import { PhoneMocks } from "../components/jadori/creators/PhoneMocks";
import { ApplyForm } from "../components/jadori/creators/ApplyForm";
import { CIMG, PERKS, CREATOR_STEPS, LOOK_FOR, CREATOR_FAQ, CREATOR_EMAIL } from "../lib/creators";

const Hero = () => (
  <section className="relative" data-testid="creators-hero">
    <div className="relative h-[78vh] min-h-[520px] max-h-[860px] overflow-hidden jd-photo">
      <LoadingImg src={CIMG.hero} alt="Behind the scenes of a creator shoot with a JADORI bag (AI-generated sample)" className="absolute inset-0 w-full h-full object-cover object-[60%_center]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A17]/75 via-[#1F1A17]/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 jd-container pb-12 nav:pb-16 text-[#F3F1ED] jd-fade">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#F3F1ED]/75">JADORI Creators</p>
        <h1 className="text-[40px] nav:text-[68px] leading-[1.02] mt-4 max-w-3xl">Wear the collection.<br />Tell the story.</h1>
        <p className="mt-5 max-w-xl text-[#F3F1ED]/80">A partnership for creators who love beautiful bags. Borrow pieces for your shoots, share your code, and earn from every rental you inspire.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <a href="#apply" className="jd-btn-light" data-testid="creators-hero-apply">Apply to join</a>
          <a href={`mailto:${CREATOR_EMAIL}`} className="jd-btn border border-[#F3F1ED]/60 text-[#F3F1ED] hover:bg-[#F3F1ED] hover:text-[#1F1A17] gap-2" data-testid="creators-hero-email"><Mail size={14} strokeWidth={1.2} />Contact the team</a>
        </div>
      </div>
    </div>
  </section>
);

const Perks = () => (
  <section className="jd-container py-20 nav:py-28" data-testid="creators-perks">
    <SectionHead eyebrow="What you receive" title="Four ways to work with JADORI">Sample programme terms, shown for presentation. Final terms are set by JADORI.</SectionHead>
    <div className="grid grid-cols-2 wide:grid-cols-4 gap-x-3 gap-y-12">
      {PERKS.map(([n, t, d, img, key], i) => (
        <article key={key} className={`jd-fade ${i % 2 ? "wide:mt-16" : ""}`} style={{ animationDelay: `${i * 90}ms` }} data-testid={`creators-perk-${key}`}>
          <div className="aspect-[2/3] overflow-hidden jd-photo jd-zoom"><LoadingImg src={img} alt={`${t} (AI-generated sample)`} className="w-full h-full object-cover" /></div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#7A716A] mt-5">{n}</p>
          <h3 className="font-serif text-[20px] nav:text-[24px] mt-1.5">{t}</h3>
          <p className="text-[14px] nav:text-[15px] text-[#4A423C] mt-2 leading-relaxed">{d}</p>
        </article>
      ))}
    </div>
  </section>
);

const Mockups = () => (
  <section className="bg-[#FFFFFF] border-y border-[#E2DFDA] py-20 nav:py-28 overflow-hidden" data-testid="creators-mockups">
    <div className="jd-container">
      <SectionHead eyebrow="How it looks" title="From your feed to a rental">Your followers see the bag, tap your link, and rent it with your code. You see every click and every rental in your dashboard.</SectionHead>
      <PhoneMocks />
      <p className="text-[11px] text-[#7A716A] mt-10 text-center">Illustrative mock-ups. Names, figures and code are samples.</p>
    </div>
  </section>
);

const LookFor = () => (
  <section className="jd-container py-20 nav:py-28 grid nav:grid-cols-[1fr_1.2fr] gap-12 nav:gap-20 items-center" data-testid="creators-look-for">
    <div className="aspect-[4/5] overflow-hidden jd-photo"><LoadingImg src={CIMG.story} alt="Creator walking out of a Boston hotel with a woven tote (AI-generated sample)" className="w-full h-full object-cover" /></div>
    <div>
      <SectionHead eyebrow="Who we look for" title="Style first, numbers second" />
      <ul className="border-t border-[#E2DFDA]">
        {LOOK_FOR.map(([t, d], i) => (
          <li key={t} className="grid grid-cols-[40px_1fr] gap-4 py-6 border-b border-[#E2DFDA]">
            <span className="font-serif text-[#7A716A]">{String(i + 1).padStart(2, "0")}</span>
            <div><p className="text-[13px] uppercase tracking-[0.16em] font-medium">{t}</p><p className="text-[15px] text-[#4A423C] mt-1.5">{d}</p></div>
          </li>
        ))}
      </ul>
      <p className="text-[14px] text-[#4A423C] mt-8">Own designer bags? You can also <Link to="/lend" className="jd-link">lend them with JADORI</Link> and earn as an owner.</p>
    </div>
  </section>
);

export default function Creators() {
  return (
    <div data-testid="creators-page">
      <Hero />
      <Perks />
      <Mockups />
      <section className="jd-container py-20 nav:py-28" data-testid="creators-steps">
        <SectionHead eyebrow="How it works" title="Five steps to your first shoot" />
        <Timeline steps={CREATOR_STEPS} testid="creators-timeline" />
      </section>
      <LookFor />
      <section id="apply" className="bg-[#FFFFFF] border-y border-[#E2DFDA] scroll-mt-[100px]" data-testid="creators-apply">
        <div className="jd-container py-20 nav:py-28 grid nav:grid-cols-[1fr_1.6fr] gap-12 nav:gap-20">
          <div>
            <p className="jd-eyebrow">Apply</p>
            <h2 className="text-[30px] nav:text-[44px] leading-[1.1] mt-4">Join JADORI Creators</h2>
            <p className="mt-5 text-[#4A423C] max-w-sm">Tell us a little about you. Every application is read by our team.</p>
          </div>
          <ApplyForm />
        </div>
      </section>
      <WorldFAQ items={CREATOR_FAQ} testid="creators-faq" />
    </div>
  );
}
