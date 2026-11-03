import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { AuthBadge } from "./AuthBadge";
import { SaveButton } from "./SaveButton";
import { usd } from "../../lib/api";

const Row = ({ k, v, testid }) => (
  <div className="flex justify-between py-2 border-b border-[#E2DFDA] text-sm"><span className="text-[#7A716A]">{k}</span><span data-testid={testid}>{v}</span></div>
);

export const QuickView = ({ l, onClose }) => (
  <Dialog open={!!l} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="rounded-none bg-[#F8F7F5] border-[#E2DFDA] max-w-[920px] w-[94vw] p-0 gap-0 max-h-[92vh] overflow-y-auto" data-testid="quick-view-dialog">
      {l && (
        <div className="grid sm:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[560px] jd-photo">
            <img src={l.images[0].url} alt={`${l.brand} ${l.name} (sample image)`} className="absolute inset-0 w-full h-full object-cover" data-testid="quick-view-image" />
            <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-[#7A716A]">Sample image</span>
          </div>
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="flex items-start justify-between gap-4 pr-6">
              <AuthBadge status={l.auth_status} testid="quick-view-auth" />
            </div>
            <p className="jd-eyebrow !text-[#1B1714] mt-4" data-testid="quick-view-brand">{l.brand}</p>
            <DialogTitle className="font-serif font-normal text-[28px] leading-tight mt-1" data-testid="quick-view-name">{l.name}</DialogTitle>
            <DialogDescription className="sr-only">Quick preview of a sample listing</DialogDescription>
            <p className="font-serif text-[26px] mt-5" data-testid="quick-view-rent-price">{usd(l.rent_per_day)}<span className="font-sans text-sm text-[#7A716A]"> / day</span></p>
            <div className="mt-5">
              {l.retail_verified && <Row k="Original retail" v={<span className="line-through text-[#7A716A]">{usd(l.retail_price)}</span>} />}
              {l.buy_enabled && <Row k="Purchase price" v={usd(l.buy_price)} testid="quick-view-buy-price" />}
              <Row k="Refundable deposit" v={usd(l.deposit)} />
              <Row k="Condition" v={l.condition} />
              <Row k="Style · Color" v={`${l.style} · ${l.color}`} />
              <Row k="Lender" v={<span className="inline-flex items-center gap-1.5">{l.lender.name}{l.lender.rating ? <><Star size={11} strokeWidth={1.25} className="fill-[#1B1714]" />{l.lender.rating.toFixed(1)} (sample)</> : " · New lender"}</span>} />
              <Row k="Location" v={`${l.lender.city}, MA`} />
              <Row k="Availability" v={l.available ? "Available" : "Currently rented"} />
            </div>
            <div className="mt-auto pt-8 flex gap-3">
              <Link to={`/bag/${l.id}`} className="jd-btn-solid flex-1 !px-4" data-testid="quick-view-details-link">{l.available ? "Choose dates" : "View details"}</Link>
              <span className="border border-[#1B1714] w-[52px] h-[52px] relative shrink-0"><SaveButton id={l.id} className="absolute inset-0 flex items-center justify-center" testid="quick-view-save-button" /></span>
            </div>
            <p className="text-[11px] text-[#7A716A] mt-4">Concept prototype · sample listing.</p>
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);
