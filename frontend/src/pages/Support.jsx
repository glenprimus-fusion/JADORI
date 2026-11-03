import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { http, errMsg } from "../lib/api";
import { PageHead, ConceptNote } from "../components/jadori/Layout";

const FAQ = [
  ["Is every bag authenticated?", "Every bag is independently authenticated before it reaches you. New listings show “Authenticated before handoff” until their in-person inspection is complete."],
  ["Where is JADORI available?", "JADORI is beginning in Massachusetts, starting with areas such as Boston, Brookline, Cambridge, Newton and Somerville. Exact launch areas are still being confirmed."],
  ["What if a bag is damaged?", "Condition is documented with unretouched photographs before and after each rental. Damage protection and deposit terms are being finalised."],
  ["Can I buy a bag I rented?", "Only if its owner has enabled the purchase option. Look for a purchase price on the listing."],
];

export default function Support() {
  const [f, setF] = useState({ full_name: "", email: "", topic: "Renting", message: "" });
  const [st, setSt] = useState({ s: "idle", msg: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setSt({ s: "loading", msg: "" });
    try { await http.post("/contact", f); setSt({ s: "done", msg: "Thank you — your message has been received. We reply within two business days (concept)." }); setF({ ...f, message: "" }); }
    catch (er) { setSt({ s: "error", msg: errMsg(er) }); }
  };
  return (
    <div data-testid="support-page">
      <PageHead eyebrow="Support & contact" title="How can we help?" />
      <div className="jd-container pb-24 grid nav:grid-cols-2 gap-14">
        <div>
          <p className="jd-label mb-2">Frequently asked</p>
          <Accordion type="single" collapsible className="border-t border-[#E2DFDA]">
            {FAQ.map(([q, a], i) => (
              <AccordionItem key={q} value={`q${i}`} className="border-[#E2DFDA]">
                <AccordionTrigger className="text-left font-serif text-lg font-normal hover:no-underline" data-testid={`faq-${i}`}>{q}</AccordionTrigger>
                <AccordionContent className="text-[15px] text-[#4A423C]">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <form onSubmit={submit} className="bg-[#FFFFFF] border border-[#E2DFDA] p-6 nav:p-10 space-y-6" data-testid="contact-form">
          <p className="jd-label">Write to us</p>
          <label className="block"><span className="jd-label">Full name</span><input required minLength={2} className="jd-input" value={f.full_name} onChange={set("full_name")} data-testid="contact-name-input" /></label>
          <label className="block"><span className="jd-label">Email</span><input required type="email" className="jd-input" value={f.email} onChange={set("email")} data-testid="contact-email-input" /></label>
          <label className="block"><span className="jd-label">Topic</span><select className="jd-select" value={f.topic} onChange={set("topic")} data-testid="contact-topic-select">{["Renting", "Lending", "Buying", "Authentication", "Press", "Other"].map((t) => <option key={t}>{t}</option>)}</select></label>
          <label className="block"><span className="jd-label">Message</span><textarea required minLength={5} rows={4} className="jd-input resize-none" value={f.message} onChange={set("message")} data-testid="contact-message-input" /></label>
          {st.msg && <p className={`text-sm ${st.s === "error" ? "font-medium" : "text-[#4A423C]"}`} data-testid={`contact-${st.s}`}>{st.msg}</p>}
          <button disabled={st.s === "loading"} className="jd-btn-solid w-full" data-testid="contact-submit-button">{st.s === "loading" ? "Sending…" : "Send message"}</button>
          <ConceptNote>Messages are stored for the prototype; no email is sent.</ConceptNote>
        </form>
      </div>
    </div>
  );
}
