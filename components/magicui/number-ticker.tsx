"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Number Ticker.
 * Springs from 0 to `value` when scrolled into view.
 */
type NumberTickerProps = {
  value: number;
  decimals?: number;
  delay?: number;
  className?: string;
};

export function NumberTicker({ value, decimals = 0, delay = 0, className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useSafeReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 120 });
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const fmt = (n: number) =>
    Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(Number(n.toFixed(decimals)));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = fmt(value);
      return;
    }
    const t = setTimeout(() => motionValue.set(value), delay * 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, delay, reduce]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = fmt(latest);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spring, decimals],
  );

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {fmt(0)}
    </span>
  );
}
