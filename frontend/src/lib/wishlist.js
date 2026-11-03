import { useEffect, useState } from "react";
import { getUser } from "./api";

const EVT = "jadori-wishlist";
const keyFor = () => `jadori_wishlist_${getUser()?.email || "guest"}`;
const read = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };

export const getSaved = () => {
  const k = keyFor();
  const guest = read("jadori_wishlist_guest");
  if (k !== "jadori_wishlist_guest" && guest.length) {
    localStorage.setItem(k, JSON.stringify([...new Set([...read(k), ...guest])]));
    localStorage.removeItem("jadori_wishlist_guest");
  }
  return read(k);
};

export const toggleSaved = (id) => {
  const w = getSaved();
  const next = w.includes(id) ? w.filter((x) => x !== id) : [...w, id];
  localStorage.setItem(keyFor(), JSON.stringify(next));
  window.dispatchEvent(new Event(EVT));
  return next;
};

export const useSaved = () => {
  const [ids, setIds] = useState(getSaved);
  useEffect(() => {
    const on = () => setIds(getSaved());
    window.addEventListener(EVT, on);
    window.addEventListener("storage", on);
    return () => { window.removeEventListener(EVT, on); window.removeEventListener("storage", on); };
  }, []);
  return ids;
};
