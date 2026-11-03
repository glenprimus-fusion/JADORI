import { Heart, MessageCircle, Send, Bookmark, Link2, MousePointerClick, ShoppingBag, Wallet } from "lucide-react";
import { CIMG } from "../../../lib/creators";

const Phone = ({ children, label, testid, className = "" }) => (
  <figure className={`shrink-0 snap-center ${className}`} data-testid={testid}>
    <div className="relative w-[248px] nav:w-[270px] aspect-[9/19] rounded-[38px] bg-[#1B1714] p-[9px] shadow-[0_40px_80px_-40px_rgba(27,23,20,0.55)]">
      <div className="relative h-full w-full rounded-[30px] overflow-hidden bg-[#FFFFFF]">
        <span className="absolute top-2 left-1/2 -translate-x-1/2 w-[76px] h-[20px] rounded-full bg-[#1B1714] z-20" />
        {children}
      </div>
    </div>
    <figcaption className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#7A716A] text-center">{label}</figcaption>
  </figure>
);

const Avatar = ({ light }) => <span className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-[12px] ${light ? "bg-[#F3F1ED] text-[#1B1714]" : "bg-[#1B1714] text-[#F3F1ED]"}`}>A</span>;

const Post = () => (
  <div className="h-full flex flex-col pt-9 text-[#1B1714]">
    <div className="flex items-center gap-2 px-3 py-2"><Avatar /><div className="leading-tight"><p className="text-[11px] font-medium">ava.in.boston</p><p className="text-[9px] text-[#7A716A]">Paid partnership with jadori</p></div></div>
    <div className="relative flex-1 min-h-0"><img src={CIMG.post} alt="Sample creator post" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <span className="absolute bottom-3 left-3 bg-[#F8F7F5]/95 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em]">Chanel · rented on JADORI</span></div>
    <div className="px-3 pt-2.5 pb-4">
      <div className="flex gap-3"><Heart size={17} strokeWidth={1.4} /><MessageCircle size={17} strokeWidth={1.4} /><Send size={17} strokeWidth={1.4} /><Bookmark size={17} strokeWidth={1.4} className="ml-auto" /></div>
      <p className="text-[10.5px] mt-2 leading-snug"><b className="font-medium">ava.in.boston</b> Borrowed, not bought. Sunday in Beacon Hill with the quilted flap. Use <b className="font-medium">AVA10</b> for 10% off your first rental.</p>
    </div>
  </div>
);

const Story = () => (
  <div className="relative h-full">
    <img src={CIMG.story} alt="Sample creator story" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    <div className="absolute inset-x-3 top-8 flex gap-1">{[1, 0, 0].map((a, i) => <span key={i} className={`h-[2px] flex-1 rounded ${a ? "bg-[#F3F1ED]" : "bg-[#F3F1ED]/40"}`} />)}</div>
    <div className="absolute top-12 left-3 flex items-center gap-2 text-[#F3F1ED]"><Avatar light /><span className="text-[11px] font-medium drop-shadow">ava.in.boston</span></div>
    <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2.5">
      <span className="bg-[#F8F7F5] text-[#1B1714] px-4 py-2 text-[10px] uppercase tracking-[0.18em] flex items-center gap-2 shadow"><Link2 size={12} strokeWidth={1.6} /> Rent this look · JADORI</span>
      <span className="bg-[#1B1714]/85 text-[#F3F1ED] px-3 py-1.5 text-[10px] tracking-[0.2em]">CODE AVA10</span>
    </div>
  </div>
);

const Metric = ({ icon: Ico, k, v }) => (
  <div className="border border-[#E2DFDA] p-3"><Ico size={14} strokeWidth={1.2} className="text-[#7A716A]" /><p className="font-serif text-[22px] mt-2 leading-none">{v}</p><p className="text-[9px] uppercase tracking-[0.16em] text-[#7A716A] mt-1.5">{k}</p></div>
);

const Dashboard = () => (
  <div className="h-full pt-10 px-4 bg-[#F8F7F5] text-[#1B1714]">
    <p className="font-serif tracking-[0.3em] text-[13px] text-center">JADORI</p>
    <p className="text-[9px] uppercase tracking-[0.2em] text-[#7A716A] mt-5">Creator dashboard · October</p>
    <p className="font-serif text-[22px] mt-1">Hello, Ava</p>
    <div className="mt-4 bg-[#1B1714] text-[#F3F1ED] p-4"><p className="text-[9px] uppercase tracking-[0.2em] opacity-60">Your code</p><p className="font-serif text-[26px] tracking-[0.12em] mt-1">AVA10</p></div>
    <div className="grid grid-cols-2 gap-2 mt-3">
      <Metric icon={MousePointerClick} k="Link clicks" v="1,284" />
      <Metric icon={ShoppingBag} k="Rentals" v="23" />
      <Metric icon={Wallet} k="Earned" v="$412" />
      <Metric icon={Heart} k="Saves" v="318" />
    </div>
    <div className="mt-3 border-t border-[#E2DFDA] pt-3 flex items-center gap-3">
      <img src={CIMG.studio} alt="" className="w-10 h-14 object-cover" /><div><p className="text-[9px] uppercase tracking-[0.16em] text-[#7A716A]">Current loan</p><p className="text-[12px]">Dior · Structured Top-Handle</p><p className="text-[10px] text-[#7A716A]">Collection on Nov 14</p></div>
    </div>
  </div>
);

export const PhoneMocks = () => (
  <div className="flex nav:justify-center gap-6 nav:gap-12 overflow-x-auto snap-x snap-mandatory jd-scroll -mx-5 px-5 pb-2 nav:mx-0 nav:px-0" data-testid="creator-phone-mocks">
    <Phone label="01 · Your post" testid="mock-post" className="nav:mt-16"><Post /></Phone>
    <Phone label="02 · Your story & code" testid="mock-story"><Story /></Phone>
    <Phone label="03 · Your earnings" testid="mock-dashboard" className="nav:mt-16"><Dashboard /></Phone>
  </div>
);
