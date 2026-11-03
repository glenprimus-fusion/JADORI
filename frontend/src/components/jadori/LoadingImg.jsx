import { useEffect, useRef, useState } from "react";
import { Monogram } from "./Monogram";

export const MonogramLoader = ({ testid = "monogram-loader", className = "" }) => (
  <div className={`absolute inset-0 jd-photo flex items-center justify-center ${className}`} data-testid={testid} role="status" aria-label="Loading photo">
    <div className="jd-breathe w-[22%] max-w-[64px] min-w-[28px] aspect-square">
      <Monogram size="100%" color="#7A716A" knock="#EFEEEC" title="" testid={`${testid}-mark`} />
    </div>
  </div>
);

export const PlaceholderTile = ({ className = "aspect-[2/3]" }) => (
  <div className={`relative ${className}`} data-testid="listing-placeholder"><MonogramLoader testid="placeholder-loader" /></div>
);

export const LoadingImg = ({ className = "", loaderTestid, ...props }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, [props.src]);
  return (
    <>
      {!loaded && <MonogramLoader testid={loaderTestid} />}
      <img ref={ref} {...props} onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} data-loaded={loaded}
        className={`${className} transition-[opacity,transform] ${loaded ? "opacity-100" : "opacity-0"}`} />
    </>
  );
};
