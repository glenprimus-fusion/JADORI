import { Heart } from "lucide-react";
import { toggleSaved, useSaved } from "../../lib/wishlist";

export const SaveButton = ({ id, className = "absolute top-3 right-3 z-10 p-1.5", testid }) => {
  const on = useSaved().includes(id);
  const toggle = (e) => { e.preventDefault(); e.stopPropagation(); toggleSaved(id); };
  return (
    <button onClick={toggle} aria-label={on ? "Remove from saved" : "Save bag"} aria-pressed={on} data-testid={testid || `wishlist-button-${id}`} className={`${className} hover:opacity-60 transition-opacity`}>
      <Heart size={18} strokeWidth={1.1} className={on ? "fill-[#1B1714] text-[#1B1714]" : "text-[#1B1714]"} />
    </button>
  );
};
