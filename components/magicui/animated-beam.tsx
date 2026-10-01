"use client";

import { motion } from "motion/react";
import { useEffect, useId, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Animated Beam.
 * Draws a curved path between two elements and animates a gradient along it.
 */
type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  className?: string;
  pathColor?: string;
  gradientStartColor?: string;
  gradientStopColor?: string;
};

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 4,
  delay = 0,
  className,
  pathColor = "#cbd5e1",
  gradientStartColor = "#f97316",
  gradientStopColor = "#1e3a8a",
}: AnimatedBeamProps) {
  const id = useId();
  const [d, setD] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  const coords = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"] };

  useEffect(() => {
    const update = () => {
      const c = containerRef.current,
        a = fromRef.current,
        b = toRef.current;
      if (!c || !a || !b) return;
      const cr = c.getBoundingClientRect(),
        ar = a.getBoundingClientRect(),
        br = b.getBoundingClientRect();
      setSize({ w: cr.width, h: cr.height });
      const sx = ar.left - cr.left + ar.width / 2,
        sy = ar.top - cr.top + ar.height / 2;
      const ex = br.left - cr.left + br.width / 2,
        ey = br.top - cr.top + br.height / 2;
      const cy = sy - curvature;
      setD(`M ${sx},${sy} Q ${(sx + ex) / 2},${cy} ${ex},${ey}`);
    };
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    update();
    return () => ro.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      aria-hidden
      fill="none"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      className={cn("pointer-events-none absolute top-0 left-0 transform-gpu", className)}
    >
      <path d={d} stroke={pathColor} strokeWidth={2} strokeOpacity={0.5} strokeLinecap="round" />
      <path d={d} strokeWidth={2} stroke={`url(#${id})`} strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{ x1: coords.x1, x2: coords.x2, y1: ["0%", "0%"], y2: ["0%", "0%"] }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
