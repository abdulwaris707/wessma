"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Aceternity — Container Scroll Animation.
 * A device-frame that rotates from a tilted 3D angle to flat as it scrolls into view.
 */
export function ContainerScroll({ header, children }: { header?: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, 0]);

  return (
    <div ref={ref} className="relative overflow-x-clip [perspective:1400px]">
      {header}
      <motion.div
        style={{ rotateX: rotate, scale, y }}
        className="border-line mx-auto w-full origin-top rounded-[28px] border bg-white p-2 shadow-[var(--shadow-float)] will-change-transform sm:p-3"
      >
        <div className="border-line bg-surface-alt overflow-hidden rounded-[20px] border">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
