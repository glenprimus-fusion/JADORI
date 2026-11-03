import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AUTH_NOTICE } from "../../lib/content";

export const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#1F1A17] text-[#F3F1ED] text-[11px] tracking-[0.14em] uppercase text-center py-2 px-4" data-testid="authenticity-notice">{AUTH_NOTICE}</div>
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
};

export const PageHead = ({ eyebrow, title, children }) => (
  <div className="jd-container pt-14 nav:pt-20 pb-10 jd-fade">
    {eyebrow && <p className="jd-eyebrow mb-4">{eyebrow}</p>}
    <h1 className="text-[32px] nav:text-[48px] leading-[1.1] max-w-3xl">{title}</h1>
    {children && <div className="mt-5 text-[#4A423C] max-w-2xl">{children}</div>}
  </div>
);

export const ConceptNote = ({ children }) => (
  <p className="text-xs text-[#7A716A] border-l border-[#1B1714] pl-3" data-testid="concept-note">{children || "Concept prototype. No payment is taken and no authentication is performed in this demonstration."}</p>
);
