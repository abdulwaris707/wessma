"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { motion } from "motion/react";
import { memo } from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity — Background Beams.
 * Curved SVG paths with animated gradient pulses. Works on light and navy backgrounds.
 */
const PATHS = Array.from({ length: 18 }, (_, i) => {
  const o = i * 7;
  return `M${-380 + o} ${-189 - o * 1.1}C${-380 + o} ${-189 - o * 1.1} ${-312 + o} ${216 - o} ${152 + o} ${343 - o}C${616 + o} ${470 - o} ${684 + o} ${875 - o} ${684 + o} ${875 - o}`;
});

export const BackgroundBeams = memo(function BackgroundBeams({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduce = useSafeReducedMotion();
  const base = tone === "dark" ? "rgba(255,255,255,0.06)" : "rgba(30,58,138,0.07)";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]",
        className,
      )}
    >
      <svg
        className="absolute size-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {PATHS.map((d) => (
          <path key={`base-${d}`} d={d} stroke={base} strokeWidth="0.6" />
        ))}
        {!reduce &&
          PATHS.map((d, i) => (
            <motion.path
              key={`beam-${d}`}
              d={d}
              stroke={`url(#beam-grad-${i})`}
              strokeOpacity="0.9"
              strokeWidth="0.8"
            />
          ))}
        <defs>
          {PATHS.map((_, i) => (
            <motion.linearGradient
              id={`beam-grad-${i}`}
              key={`g-${i}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + (i % 5)}%`],
              }}
              transition={{
                duration: 8 + (i % 6) * 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: (i * 0.7) % 6,
              }}
            >
              <stop stopColor="#f97316" stopOpacity="0" />
              <stop stopColor="#f97316" />
              <stop offset="32.5%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});
