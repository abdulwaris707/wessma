"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { useIsMobile } from "@/hooks/use-media";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Word Rotate (with Aceternity Flip Words-style blur).
 * Cycles through words with a vertical blur transition on desktop,
 * and clean sharp opacity/slide on mobile.
 */
export function WordRotate({
  words,
  duration = 2600,
  className,
}: {
  words: readonly string[];
  duration?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useSafeReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), duration);
    return () => clearInterval(id);
  }, [words, duration]);

  return (
    <span
      className="relative inline-grid justify-items-center overflow-hidden pb-[0.12em] align-bottom"
      aria-live="polite"
    >
      {/* invisible sizer keeps width stable on the widest word */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className={cn("col-start-1 row-start-1 whitespace-nowrap", className)}
          initial={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: isMobile ? "40%" : "55%" }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: isMobile ? "-40%" : "-55%" }
          }
          transition={{ duration: isMobile ? 0.3 : 0.45, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
