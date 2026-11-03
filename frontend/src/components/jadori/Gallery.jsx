import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Gallery = ({ images, title }) => {
  const [i, setI] = useState(0);
  const strip = useRef(null);
  const go = (d) => setI((x) => (x + d + images.length) % images.length);
  const onSwipe = (e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth));
  return (
    <div data-testid="product-gallery">
      {/* Desktop: side strip + main */}
      <div className="hidden nav:grid grid-cols-[84px_1fr] gap-4">
        <div ref={strip} className="flex flex-col gap-3 max-h-[760px] overflow-y-auto jd-scroll" data-testid="condition-strip">
          {images.map((im, k) => (
            <button key={k} onClick={() => setI(k)} data-testid={`condition-thumb-${k}`} className={`relative aspect-[2/3] jd-photo overflow-hidden border ${k === i ? "border-[#1B1714]" : "border-transparent opacity-70 hover:opacity-100"} transition-opacity`}>
              <img src={im.url} alt={`${im.view} view`} className={`w-full h-full object-cover ${im.cleaned ? "jd-cleaned" : ""}`} />
              <span className="absolute bottom-0 inset-x-0 text-[9px] uppercase tracking-[0.1em] bg-[#FFFFFF]/85 py-0.5">{im.view}</span>
            </button>
          ))}
        </div>
        <div className="relative aspect-[4/5] max-h-[760px] jd-photo overflow-hidden group">
          <img key={i} src={images[i].url} alt={`${title} — ${images[i].view} (sample image)`} className={`absolute inset-0 w-full h-full object-cover jd-fade ${images[i].cleaned ? "jd-cleaned" : ""}`} data-testid="gallery-main-image" />
          <button onClick={() => go(-1)} aria-label="Previous image" data-testid="gallery-prev-button" className="absolute left-4 top-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-[#FFFFFF]/90 flex items-center justify-center hover:bg-[#FFFFFF]"><ChevronLeft size={20} strokeWidth={1} /></button>
          <button onClick={() => go(1)} aria-label="Next image" data-testid="gallery-next-button" className="absolute right-4 top-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-[#FFFFFF]/90 flex items-center justify-center hover:bg-[#FFFFFF]"><ChevronRight size={20} strokeWidth={1} /></button>
          <p className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.16em] bg-[#FFFFFF]/90 px-3 py-1.5" data-testid="gallery-view-label">
            {images[i].view}{images[i].cleaned ? " · background cleaned" : " · unretouched"} · {i + 1}/{images.length}
          </p>
        </div>
      </div>
      {/* Mobile: swipe */}
      <div className="nav:hidden -mx-5">
        <div className="flex overflow-x-auto snap-x snap-mandatory jd-scroll" onScroll={onSwipe} data-testid="gallery-swipe">
          {images.map((im, k) => (
            <div key={k} className="relative shrink-0 w-full snap-center aspect-[4/5] jd-photo">
              <img src={im.url} alt={`${title} — ${im.view}`} className={`absolute inset-0 w-full h-full object-cover ${im.cleaned ? "jd-cleaned" : ""}`} />
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.16em] bg-[#FFFFFF]/90 px-2 py-1">{im.view}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 py-3">{images.map((_, k) => <span key={k} className={`h-px w-6 ${k === i ? "bg-[#1B1714]" : "bg-[#E2DFDA]"}`} />)}</div>
      </div>
    </div>
  );
};
