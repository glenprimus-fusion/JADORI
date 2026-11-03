import axios from "axios";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const http = axios.create({ baseURL: API });

export const errMsg = (e) => {
  const d = e?.response?.data?.detail;
  if (Array.isArray(d)) return d.map((x) => x.msg).join(". ");
  return d || "Something went wrong. Please try again.";
};

export const usd = (n) =>
  n == null ? "" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const KEY = "jadori_concept_user";
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
};
const EVT = () => window.dispatchEvent(new Event("jadori-wishlist"));
export const setUser = (u) => { localStorage.setItem(KEY, JSON.stringify(u)); EVT(); };
export const clearUser = () => { localStorage.removeItem(KEY); EVT(); };
