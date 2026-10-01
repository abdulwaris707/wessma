"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="bg-gradient-brand fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}
