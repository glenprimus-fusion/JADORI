import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../../lib/api";
import { AuthSeal } from "../AuthBadge";
import { Monogram, MonogramPattern } from "../Monogram";

const recordNo = (id) => `JD-SAMPLE-${id.replace("sample-", "").padStart(4, "0")}`;

const Field = ({ k, v, testid }) => (
  <div className="py-2.5 border-b border-[#1B1714]/10 flex justify-between gap-6 text-[13px]">
    <span className="uppercase tracking-[0.16em] text-[#7A716A] text-[10px] pt-0.5">{k}</span><span className="text-right" data-testid={testid}>{v}</span>
  </div>
);

export const Certificate = ({ l }) => (
  <div className="relative p-3 nav:p-4 shadow-[0_30px_60px_-30px_rgba(27,23,20,0.5)] max-w-[460px] w-full" data-testid="auth-certificate">
    <div className="absolute inset-0"><MonogramPattern opacity={0.55} tile={70} testid="certificate-pattern" /></div>
    <div className="relative bg-[#FFFFFF] text-[#1B1714] px-7 nav:px-10 py-10 text-center">
      <Monogram size={44} knock="#FFFFFF" testid="certificate-monogram" />
      <p className="font-serif uppercase tracking-[0.42em] pl-[0.42em] text-[18px] mt-3">Jadori</p>
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A716A] mt-2">Record of authentication</p>
      <div className="my-7 h-px bg-[#E2DFDA]" />
      <div className="text-left">
        <Field k="Record no." v={l ? recordNo(l.id) : "—"} testid="certificate-record" />
        <Field k="Brand" v={l?.brand || "—"} testid="certificate-brand" />
        <Field k="Model" v={l?.name || "—"} />
        <Field k="Colour" v={l?.color || "—"} />
        <Field k="Condition" v={l?.condition || "—"} />
        <Field k="Inspection" v="In person · specialist to be confirmed" />
        <Field k="Result" v="Passed (sample)" testid="certificate-result" />
      </div>
      <div className="flex justify-center mt-8"><AuthSeal size={96} /></div>
      <p className="text-[10px] text-[#7A716A] mt-6">Concept design · sample record, not a real certificate</p>
    </div>
  </div>
);

export const Verify = () => {
  const [all, setAll] = useState([]);
  const [q, setQ] = useState("");
  const [res, setRes] = useState(null);
  useEffect(() => { http.get("/listings").then((r) => setAll(r.data)); }, []);
  const verified = all.filter((l) => l.auth_status === "verified");
  const check = (e) => {
    e.preventDefault();
    const hit = verified.find((l) => recordNo(l.id) === q.trim().toUpperCase());
    setRes(hit ? { ok: true, l: hit } : { ok: false });
  };
  return (
    <section className="bg-[#1F1A17] text-[#F3F1ED]" data-testid="auth-verify">
      <div className="jd-container py-20 nav:py-28 grid nav:grid-cols-2 gap-14 items-center">
        <div className="max-w-lg">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#F3F1ED]/60 mb-4">Verify a record · simulated</p>
          <h2 className="text-[28px] nav:text-[42px] leading-[1.12]">Every authenticated bag carries a record number</h2>
          <p className="mt-4 text-[#F3F1ED]/75">It's printed on the hang tag and listed on the bag's page. Enter one to see its record.</p>
          <form onSubmit={check} className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-end">
            <label className="flex-1">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#F3F1ED]/70 font-medium">Record number</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="JD-SAMPLE-0001" data-testid="verify-input"
                className="w-full bg-transparent border-0 border-b border-[#F3F1ED]/30 focus:border-[#F3F1ED] outline-none py-3 text-base placeholder:text-[#F3F1ED]/35 uppercase tracking-[0.08em]" />
            </label>
            <button className="jd-btn-light" data-testid="verify-submit">Verify</button>
          </form>
          <p className="text-xs text-[#F3F1ED]/50 mt-4">Try: {verified.slice(0, 3).map((l) => <button key={l.id} type="button" onClick={() => setQ(recordNo(l.id))} className="underline underline-offset-4 mr-3" data-testid={`verify-example-${l.id}`}>{recordNo(l.id)}</button>)}</p>
          {res && !res.ok && <p className="mt-6 text-sm border-l border-[#F3F1ED] pl-3" data-testid="verify-not-found">No record found for that number. Bags awaiting inspection don't have a record yet.</p>}
          {res?.ok && <p className="mt-6 text-sm border-l border-[#F3F1ED] pl-3" data-testid="verify-found">Record found: {res.l.brand} {res.l.name}. <Link to={`/bag/${res.l.id}`} className="underline underline-offset-4">View the bag</Link></p>}
        </div>
        <div className="flex justify-center"><Certificate l={res?.ok ? res.l : verified[0]} /></div>
      </div>
    </section>
  );
};
