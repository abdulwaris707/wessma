"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { useIsMobile } from "@/hooks/use-media";
import { motion, useInView, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "@/lib/motion";

/**
 * Magic UI — Blur Fade.
 * On desktop: fades + un-blurs + lifts content in.
 * On mobile or prefers-reduced-motion: replaces heavy blur filters with an instant,
 * clean subtle opacity/transform for peak performance and battery savings.
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
  duration = 0.5,
  yOffset = 12,
  blur = "4px",
  inViewMargin = "-40px",
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: inViewMargin });
  const reduce = useSafeReducedMotion();
  const isMobile = useIsMobile();
  const [observerFallback, setObserverFallback] = useState(false);

  // Fallback timer ensures mobile views never stay blank if observer throttles
  useEffect(() => {
    const id = window.setTimeout(() => setObserverFallback(true), 800);
    return () => window.clearTimeout(id);
  }, []);

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 1, y: 0, filter: "none" },
        visible: { opacity: 1, y: 0, filter: "none" },
      }
    : isMobile
      ? {
          // On mobile, completely eliminate expensive filter: blur() to maximize FPS
          hidden: { y: 6, opacity: 0 },
          visible: { y: 0, opacity: 1 },
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
      animate={inView || observerFallback ? "visible" : "hidden"}
      variants={variants}
      transition={{
        delay: isMobile ? 0.02 : 0.04 + delay,
        duration: isMobile ? 0.3 : duration,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
