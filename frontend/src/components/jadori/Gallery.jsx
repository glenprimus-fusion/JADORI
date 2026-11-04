import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { LoadingImg } from "./LoadingImg";
import { ZoomViewer } from "./ZoomViewer";

const ModelTag = () => <span className="absolute top-3 left-3 z-10 text-[9px] uppercase tracking-[0.18em] bg-[#1B1714] text-[#F3F1ED] px-2.5 py-1 rounded-full">On the model</span>;

export const Gallery = ({ images, title }) => {
  const [i, setI] = useState(0);
  const [viewer, setViewer] = useState(null);
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
              <span className={`absolute bottom-0 inset-x-0 text-[9px] uppercase tracking-[0.1em] py-0.5 ${im.on_model ? "bg-[#1B1714]/85 text-[#F3F1ED]" : "bg-[#FFFFFF]/85"}`}>{im.on_model ? "Model" : im.view}</span>
            </button>
          ))}
        </div>
        <div className="relative aspect-[4/5] max-h-[760px] jd-photo overflow-hidden group">
          <button onClick={() => setViewer(i)} className="absolute inset-0 cursor-zoom-in" aria-label="Open full-screen view" data-testid="gallery-open-zoom">
            <LoadingImg key={i} src={images[i].url} alt={`${title} — ${images[i].view} (sample image)`} loaderTestid="gallery-loader" className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03] ${images[i].cleaned ? "jd-cleaned" : ""}`} data-testid="gallery-main-image" />
          </button>
          {images[i].on_model && <ModelTag />}
          <span className="jd-chip absolute top-4 right-4 w-[40px] h-[40px] bg-[#FFFFFF]/90 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100" aria-hidden><Maximize2 size={15} strokeWidth={1.2} /></span>
          <button onClick={() => go(-1)} aria-label="Previous image" data-testid="gallery-prev-button" className="jd-chip absolute left-4 top-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-[#FFFFFF]/90 flex items-center justify-center hover:bg-[#FFFFFF]"><ChevronLeft size={20} strokeWidth={1} /></button>
          <button onClick={() => go(1)} aria-label="Next image" data-testid="gallery-next-button" className="jd-chip absolute right-4 top-1/2 -translate-y-1/2 w-[48px] h-[48px] bg-[#FFFFFF]/90 flex items-center justify-center hover:bg-[#FFFFFF]"><ChevronRight size={20} strokeWidth={1} /></button>
          <p className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.16em] bg-[#FFFFFF]/90 px-3 py-1.5 rounded-full pointer-events-none" data-testid="gallery-view-label">
            {images[i].view}{images[i].on_model ? " · model is 5'9\"" : images[i].cleaned ? " · background cleaned" : " · unretouched"} · {i + 1}/{images.length}
          </p>
        </div>
      </div>
      {/* Mobile: swipe */}
      <div className="nav:hidden -mx-5">
        <div className="flex overflow-x-auto snap-x snap-mandatory jd-scroll" onScroll={onSwipe} data-testid="gallery-swipe">
          {images.map((im, k) => (
            <button key={k} onClick={() => setViewer(k)} className="relative shrink-0 w-full snap-center aspect-[4/5] jd-photo" data-testid={`gallery-swipe-${k}`} aria-label={`Open ${im.view} full screen`}>
              <LoadingImg src={im.url} alt={`${title} — ${im.view}`} loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${im.cleaned ? "jd-cleaned" : ""}`} />
              {im.on_model && <ModelTag />}
              <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.16em] bg-[#FFFFFF]/90 px-2.5 py-1 rounded-full">{im.view}</span>
              <span className="absolute bottom-3 right-3 w-[34px] h-[34px] rounded-full bg-[#FFFFFF]/90 flex items-center justify-center"><Maximize2 size={13} strokeWidth={1.2} /></span>
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 py-3">{images.map((_, k) => <span key={k} className={`h-px w-6 ${k === i ? "bg-[#1B1714]" : "bg-[#E2DFDA]"}`} />)}</div>
      </div>
      <ZoomViewer images={images} title={title} index={viewer} onClose={() => setViewer(null)} />
    </div>
  );
};
