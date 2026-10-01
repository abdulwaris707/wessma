"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity — Tracing Beam / Timeline.
 * A vertical line that fills with the brand gradient as the user scrolls.
 */
export function TracingBeam({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 400, damping: 60 });
  const height = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className="bg-line absolute top-0 bottom-0 left-[19px] w-px md:left-1/2 md:-translate-x-1/2"
      >
        <motion.div
          style={{ height }}
          className="w-px origin-top bg-[linear-gradient(180deg,#1e3a8a,#f97316)] shadow-[0_0_12px_rgb(249_115_22/0.5)]"
        />
      </div>
      {children}
    </div>
  );
}
