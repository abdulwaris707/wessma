import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Magic UI — Marquee. Pure CSS infinite scroller; pauses on hover.
 */
type MarqueeProps = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  style?: React.CSSProperties;
};

export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = true,
  vertical = false,
  repeat = 3,
  style,
}: MarqueeProps) {
  return (
    <div
      style={style}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 ? true : undefined}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
