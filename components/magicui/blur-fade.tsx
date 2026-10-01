"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { EASE } from "@/lib/motion";

/**
 * Magic UI — Blur Fade.
 * Fades + un-blurs + lifts content in when it scrolls into view.
 */
type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  inViewMargin?: `${number}px` | `${number}px ${number}px`;
  as?: "div" | "li" | "section" | "span";
};

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.7,
  yOffset = 14,
  blur = "6px",
  inViewMargin = "-60px",
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: inViewMargin });
  const reduce = useSafeReducedMotion();
  const variants: Variants = reduce
    ? {
        hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }
    : {
        hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
        visible: { y: 0, opacity: 1, filter: "blur(0px)" },
      };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay: 0.04 + delay, duration, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
