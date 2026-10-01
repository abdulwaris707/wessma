"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Hydration-safe reduced-motion flag: always `false` on the server and first
 * client render, then reflects the user's OS preference.
 */
export function useSafeReducedMotion() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduce) : false;
}
