import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Magic UI — Animated Gradient Text badge.
 * Pill with an animated navy → orange gradient border.
 */
export function AnimatedGradientBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "group text-navy-950 relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium shadow-[var(--shadow-soft)] border border-line/60",
        className,
      )}
    >
      <span
        aria-hidden
        className="animate-gradient absolute inset-0 block rounded-[inherit] bg-[linear-gradient(90deg,#1e3a8a,#f97316,#2563eb,#1e3a8a)] bg-[length:300%_100%] ![mask-composite:subtract] p-px [--bg-size:300%] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]"
      />
      {children}
    </span>
  );
}
