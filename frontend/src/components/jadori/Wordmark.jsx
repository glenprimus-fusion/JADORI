import { Link } from "react-router-dom";

export const Wordmark = ({ light = false, className = "", testid = "wordmark-link" }) => (
  <Link
    to="/"
    data-testid={testid}
    aria-label="JADORI home"
    className={`font-serif uppercase tracking-[0.42em] text-[22px] nav:text-[26px] leading-none pl-[0.42em] ${light ? "text-[#F3F1ED]" : "text-[#1B1714]"} ${className}`}
  >
    Jadori
  </Link>
);
