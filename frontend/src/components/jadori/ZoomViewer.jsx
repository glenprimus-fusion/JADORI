import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";

const Arrow = ({ dir, onClick }) => {
  const Ico = dir < 0 ? ChevronLeft : ChevronRight;
  return (
    <button onClick={onClick} aria-label={dir < 0 ? "Previous image" : "Next image"} data-testid={`zoom-${dir < 0 ? "prev" : "next"}`}
      className={`jd-chip absolute top-1/2 -translate-y-1/2 ${dir < 0 ? "left-3 nav:left-8" : "right-3 nav:right-8"} z-10 w-[48px] h-[48px] bg-[#FFFFFF]/90 border border-[#E2DFDA] flex items-center justify-center`}>
      <Ico size={20} strokeWidth={1} />
    </button>
  );
};

export const ZoomViewer = ({ images, title, index, onClose }) => {
  const open = index !== null;
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  useEffect(() => { if (open) { setI(index); setZoom(false); } }, [open, index]);
  const go = (d) => { setZoom(false); setI((x) => (x + d + images.length) % images.length); };
  useEffect(() => {
    if (!open) return undefined;
    const k = (e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }); // eslint-disable-line react-hooks/exhaustive-deps
  const track = (e) => {
    const p = e.touches ? e.touches[0] : e;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((p.clientX - r.left) / r.width) * 100}% ${((p.clientY - r.top) / r.height) * 100}%`);
  };
  const im = open ? images[i] : null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-none w-screen h-[100dvh] p-0 rounded-none border-0 bg-[#F8F7F5] flex flex-col gap-0 [&>button]:z-20 [&>button]:top-5 [&>button]:right-5" data-testid="zoom-viewer">
        <DialogTitle className="sr-only">{title} gallery</DialogTitle>
        <DialogDescription className="sr-only">Full-screen view. Click or tap the image to zoom.</DialogDescription>
        {im && <>
          <div className="flex items-center gap-4 px-5 nav:px-8 h-[64px] shrink-0 border-b border-[#E2DFDA] pr-[76px] nav:pr-[84px]">
            <div className="min-w-0 flex flex-col nav:flex-row nav:gap-1 text-[11px] uppercase tracking-[0.2em]" data-testid="zoom-label">
              <span className="truncate">{title}</span>
              <span className="text-[#7A716A] truncate"><span className="hidden nav:inline">· </span>{im.view}{im.on_model ? " · on the model" : ""}</span>
            </div>
            <span className="ml-auto text-[11px] tracking-[0.16em] text-[#7A716A] shrink-0" data-testid="zoom-counter">{i + 1} / {images.length}</span>
          </div>
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <div className={`absolute inset-0 ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`} onClick={(e) => { track(e); setZoom((z) => !z); }} onMouseMove={zoom ? track : undefined} onTouchMove={zoom ? track : undefined} data-testid="zoom-stage">
              <img src={im.url} alt={`${title} — ${im.view} (sample image)`} draggable={false} data-testid="zoom-image" data-zoomed={zoom}
                className={`w-full h-full object-contain select-none ${im.cleaned ? "jd-cleaned" : ""}`}
                style={{ transform: zoom ? "scale(2.4)" : "scale(1)", transformOrigin: origin, transition: "transform 450ms cubic-bezier(.2,.7,.2,1)" }} />
            </div>
            <Arrow dir={-1} onClick={() => go(-1)} />
            <Arrow dir={1} onClick={() => go(1)} />
            <button onClick={() => setZoom((z) => !z)} className="jd-chip absolute bottom-4 left-1/2 -translate-x-1/2 h-[40px] px-5 bg-[#1B1714] text-[#F3F1ED] text-[10px] uppercase tracking-[0.18em] flex items-center gap-2" data-testid="zoom-toggle">
              {zoom ? <><ZoomOut size={14} strokeWidth={1.4} />Zoom out</> : <><ZoomIn size={14} strokeWidth={1.4} />Zoom in</>}
            </button>
          </div>
          <div className="shrink-0 flex gap-2 px-5 nav:px-8 py-3 overflow-x-auto jd-scroll border-t border-[#E2DFDA] nav:justify-center" data-testid="zoom-thumbs">
            {images.map((t, k) => (
              <button key={k} onClick={() => { setZoom(false); setI(k); }} data-testid={`zoom-thumb-${k}`} aria-label={t.view}
                className={`shrink-0 w-[52px] aspect-[2/3] jd-photo overflow-hidden border transition-opacity ${k === i ? "border-[#1B1714]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={t.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </>}
      </DialogContent>
    </Dialog>
  );
};
