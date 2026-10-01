import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Shimmer Button (brand orange).
 * A light sweep travels around the border; purely CSS, works in Server Components.
 */
export interface ShimmerButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
  shimmerColor?: string;
  background?: string;
  size?: "sm" | "default" | "lg";
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  background = "linear-gradient(180deg, #ff8a3d 0%, #f97316 100%)",
  size = "default",
  className,
  children,
  style,
  ...props
}: ShimmerButtonProps) {
  return (
    <span
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--speed": "3s",
          "--cut": "0.08em",
          "--bg": background,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "group/shimmer text-navy-950 relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap [background:var(--bg)]",
        "shadow-[var(--shadow-glow-orange)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgb(249_115_22/0.6)] active:translate-y-px",
        size === "sm" && "h-10 px-4 text-sm",
        size === "default" && "h-11 px-5 text-sm",
        size === "lg" && "h-13 px-7 text-[0.9375rem]",
        className,
      )}
      {...props}
    >
      {/* spark container */}
      <span className="[container-type:size] absolute inset-0 -z-30 overflow-visible blur-[2px]">
        <span className="animate-shimmer-slide absolute inset-0 [aspect-ratio:1] h-[100cqh] [border-radius:0] [mask:none]">
          <span className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </span>
      </span>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {/* highlight */}
      <span className="absolute inset-0 rounded-full shadow-[inset_0_-8px_10px_#ffffff1f] transition-shadow duration-300 group-hover/shimmer:shadow-[inset_0_-6px_10px_#ffffff3f]" />
      {/* backdrop */}
      <span className="absolute [inset:var(--cut)] -z-20 rounded-full [background:var(--bg)]" />
    </span>
  );
}
