import { useEffect, useState } from "react";

const KEY = "jadori_following";
const EVT = "jadori-following";
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };

export const toggleFollow = (slug) => {
  const f = read();
  localStorage.setItem(KEY, JSON.stringify(f.includes(slug) ? f.filter((x) => x !== slug) : [...f, slug]));
  window.dispatchEvent(new Event(EVT));
};

export const useFollowing = () => {
  const [f, setF] = useState(read);
  useEffect(() => {
    const on = () => setF(read());
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);
  return f;
};
