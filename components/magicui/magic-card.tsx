"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Magic Card.
 * A cursor-following spotlight glow (orange/blue) on the card surface and border.
 */
type MagicCardProps = {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  borderFrom?: string;
  borderTo?: string;
};

export function MagicCard({
  children,
  className,
  gradientSize = 280,
  gradientColor = "rgba(249,115,22,0.07)",
  borderFrom = "#f97316",
  borderTo = "#1e3a8a",
}: MagicCardProps) {
  const x = useMotionValue(-gradientSize);
  const y = useMotionValue(-gradientSize);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    },
    [x, y],
  );
  const onLeave = useCallback(() => {
    x.set(-gradientSize);
    y.set(-gradientSize);
  }, [x, y, gradientSize]);

  const border = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${borderFrom}, ${borderTo}66 40%, #e2e8f0 100%)`;
  const glow = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientColor}, transparent 100%)`;

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("group/magic relative isolate rounded-[inherit]", className)}
    >
      <motion.div
        aria-hidden
        className="bg-line pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
        style={{ background: border }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] bg-white"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/magic:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </div>
  );
}
