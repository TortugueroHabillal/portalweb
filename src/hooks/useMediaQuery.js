import { useEffect, useState } from "react";

/* Devuelve true mientras la media query coincida (se actualiza al cambiar el tamaño). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
