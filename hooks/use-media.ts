"use client";

import { useEffect, useState } from "react";

/** Subscribe to a CSS media query. Returns false during SSR. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True on devices with a fine pointer (mouse / trackpad) and hover support. */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** True on mobile screens (viewport < 768px). */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}

/** True on tablet & smaller screens (viewport < 1024px). */
export function useIsSmallScreen() {
  return useMediaQuery("(max-width: 1023px)");
}
