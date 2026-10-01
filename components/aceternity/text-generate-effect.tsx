"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Aceternity — Text Generate Effect.
 * Words fade and un-blur one after another when in view.
 */
export function TextGenerateEffect({ words, className }: { words: string; className?: string }) {
  const reduce = useSafeReducedMotion();
  return (
    <p className={cn(className)}>
      {words.split(" ").map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </p>
  );
}
