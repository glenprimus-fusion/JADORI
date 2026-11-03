import { Camera, ImagePlus, Bell } from "lucide-react";
import { GuidePage, StepPhoto, StepVideo, Mock, MockRow, MockButton } from "../components/jadori/Guide";
import { Monogram } from "../components/jadori/Monogram";

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
const G = (h) => `https://static.prod-images.emergentagent.com/jobs/e6269308-79fb-49b1-b3b9-65fbe7478071/images/${h}.jpeg`;
const BAG = G("64e75346aff96195fec1f59f116b228beb87b5c68bf89da891bd47fd1b916b68");
const VIEWS = ["Front", "Back", "Left", "Right", "Bottom", "Interior", "Hardware", "Wear"];

const PhotosVisual = () => (
  <div className="aspect-[4/5] bg-[#EFEEEC] p-6 nav:p-8 grid grid-cols-4 gap-2 content-center">
    {VIEWS.map((v, i) => (
      <div key={v} className={`aspect-[2/3] flex flex-col items-center justify-center gap-1.5 text-[9px] nav:text-[10px] uppercase tracking-[0.12em] relative overflow-hidden ${i === 0 ? "text-[#F3F1ED]" : "bg-[#F8F7F5] text-[#4A423C]"}`}>
        {i === 0 ? <><img src={BAG} alt="" className="absolute inset-0 w-full h-full object-cover" /><span className="absolute bottom-1.5 bg-[#1B1714]/85 px-1.5 py-0.5 flex items-center gap-1"><Camera size={10} />Main</span></> : <><ImagePlus size={16} strokeWidth={1} />{v}</>}
      </div>
    ))}
  </div>
);

const PriceVisual = () => (
  <Mock>
    <p className="jd-label mb-4">Pricing · example</p>
    <div className="flex justify-between items-baseline border-b border-[#1B1714] pb-2"><span className="text-[#4A423C]">Daily rental rate</span><span className="font-serif text-[26px]">$145</span></div>
    <div className="flex items-center justify-between mt-5"><span>Also offer for purchase</span><span className="w-10 h-5 bg-[#1B1714] relative"><span className="absolute right-0.5 top-0.5 w-4 h-4 bg-[#F3F1ED]" /></span></div>
    <div className="flex justify-between items-baseline border-b border-[#E2DFDA] pb-2 mt-4"><span className="text-[#4A423C]">Purchase price</span><span>$8,900</span></div>
    <p className="text-[12px] text-[#7A716A] mt-4">Listing status: Authenticated before handoff</p>
    <MockButton>Submit listing</MockButton>
  </Mock>
);

const RequestVisual = () => (
  <Mock>
    <div className="flex items-center gap-2 jd-label mb-4"><Bell size={13} strokeWidth={1.25} />New rental request</div>
    <div className="flex gap-4 items-center mb-4"><div className="relative w-14 aspect-[2/3]"><img src={BAG} alt="" className="absolute inset-0 w-full h-full object-cover" /></div><div><p className="font-serif">Quilted Flap</p><p className="text-[12px] text-[#7A716A]">Requested by Olivia R. · Cambridge</p></div></div>
    <MockRow k="Dates" v="Thu 12 → Sat 14" /><MockRow k="Duration" v="3 days" /><MockRow k="Deposit held" v="$1,350" />
    <div className="grid grid-cols-2 gap-2"><div className="h-[44px] border border-[#1B1714] text-[11px] uppercase tracking-[0.18em] flex items-center justify-center mt-5">Decline</div><MockButton>Approve</MockButton></div>
    <p className="text-[11px] text-[#7A716A] mt-3">Sample request for illustration</p>
  </Mock>
);

const PayoutVisual = () => (
  <Mock dark>
    <div className="flex items-center gap-3 mb-6"><Monogram size={30} color="#F3F1ED" knock="#1F1A17" testid="payout-monogram" /><span className="text-[11px] uppercase tracking-[0.22em] text-[#F3F1ED]/70">Payout · sample</span></div>
    <p className="font-serif text-[48px] leading-none">$348</p>
    <div className="mt-6"><MockRow light k="Rental income (3 days)" v="$435" /><MockRow light k="JADORI commission (20%, proposed)" v="−$87" /><MockRow light k="Status" v="Rental completed" /></div>
    <p className="text-[11px] text-[#F3F1ED]/50 mt-5">Illustration only. Payout timing and commission to be confirmed.</p>
  </Mock>
);

const STEPS = [
  { t: "Choose a bag to lend", v: <StepPhoto src={U("1560891958-68bb1fe7fb78")} alt="Owner with her designer handbag (stock placeholder)" />, d: "Pick a designer bag from your closet that's in good condition, with its original hardware. Have the serial or date code and dust bag ready.", pts: ["Launch brands include Chanel, Hermès, Dior and more", "Excellent, Very good or Good condition", "Your bag always stays yours"] },
  { t: "Photograph eight views", v: <PhotosVisual />, d: "Add the front, back, both sides, bottom, interior, hardware and any wear. Only the front becomes a cleaned catalogue thumbnail.", pts: ["About ten minutes with a phone camera", "Wear is shown honestly, never retouched", "Natural light gives the best results"] },
  { t: "Set your price", v: <PriceVisual />, d: "Choose your daily rental rate and decide whether to also offer the bag for purchase. You can change either at any time.", pts: ["Your rate, your decision", "Optional purchase price", "Prices always in US dollars"], cta: ["Start a listing", "/lend/new"] },
  { t: "Review & authentication", v: <StepPhoto src={U("1741086154510-522e68f76933")} alt="Close inspection of stitching (stock placeholder)" seal />, d: "Our team reviews your listing, then an independent specialist inspects the bag in person before its first rental.", pts: ["Listed as “Authenticated before handoff” until inspected", "Passing bags receive a record number and seal", "Inspection arranged by JADORI"], cta: ["How authentication works", "/authenticity"] },
  { t: "Approve every request", v: <RequestVisual />, d: "When someone wants your bag, you see their dates and city and choose to approve or decline. Nothing is rented without you.", pts: ["Full control of your calendar", "A refundable deposit is held for every rental", "Manage everything from your dashboard"] },
  { t: "The handoff", v: <StepVideo src="/guide/handoff.mp4" poster={U("1683921470299-b8f0f3331657")} label="Handoff of a handbag" testid="lend-handoff-video" />, d: "Hand the bag over locally or through a courier in participating Massachusetts areas. Its condition is photographed together at handoff.", pts: ["Boston, Brookline, Cambridge, Newton, Somerville", "Dust bag and hang tag go with every bag", "Damage protection during each rental"] },
  { t: "Your first payout", v: <PayoutVisual />, d: "After the bag is returned and passes its return check, your payout for the rental is released.", pts: ["Payout after each completed rental", "Track earnings in your lender dashboard", "Commission and timing to be confirmed"], cta: ["Open lender dashboard", "/account/lender"] },
];

export default function HowLendingWorks() {
  return (
    <GuidePage testid="how-lending-works-page" title="How lending works" steps={STEPS}
      intro="Make money from a bag sitting in your closet. Here is every step, from choosing which bag to lend to receiving your first payout."
      essentials={[["8 views", "Photos per listing"], ["You approve", "Every rental request"], ["Before handoff", "In-person authentication"], ["USD", "All prices in US dollars"]]}
      note="Concept prototype. Commission, payout timing, protection terms and service areas are illustrative and not yet final."
      cta={{ title: "Your bag could be someone's next occasion.", copy: "List it in minutes. Every bag is authenticated before its first handoff.", cta: "Start a listing", to: "/lend/new" }} />
  );
}
