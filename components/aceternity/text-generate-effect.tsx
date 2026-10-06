"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { useIsMobile } from "@/hooks/use-media";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Aceternity — Text Generate Effect.
 * Words fade and un-blur one after another when in view (blur on desktop, clean opacity on mobile).
 */
export function TextGenerateEffect({ words, className }: { words: string; className?: string }) {
  const reduce = useSafeReducedMotion();
  const isMobile = useIsMobile();
  return (
    <p className={cn(className)}>
      {words.split(" ").map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          initial={
            reduce
              ? false
              : { opacity: 0 }
          }
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: isMobile ? 0.35 : 0.45, delay: i * 0.04, ease: EASE }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}
