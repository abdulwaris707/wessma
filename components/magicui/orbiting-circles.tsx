import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Magic UI — Orbiting Circles.
 * Children orbit around the centre of the parent on a dashed path.
 */
type OrbitingCirclesProps = {
  children: ReactNode[];
  radius?: number;
  duration?: number;
  reverse?: boolean;
  iconSize?: number;
  className?: string;
};

export function OrbitingCircles({
  children,
  radius = 160,
  duration = 30,
  reverse,
  iconSize = 44,
  className,
}: OrbitingCirclesProps) {
  const count = children.length;
  return (
    <>
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full">
        <circle
          className="stroke-navy-800/15"
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          strokeDasharray="4 6"
        />
      </svg>
      {children.map((child, i) => {
        const angle = (360 / count) * i;
        return (
          <div
            key={i}
            style={
              {
                "--duration": duration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                // static fallback position (used when animations are disabled)
                transform: `rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg)`,
              } as React.CSSProperties
            }
            className={cn(
              "absolute top-1/2 left-1/2 -mt-[calc(var(--icon-size)/2)] -ml-[calc(var(--icon-size)/2)] flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full",
              "animate-[orbit-angle_calc(var(--duration)*1s)_linear_infinite]",
              reverse && "[animation-direction:reverse]",
              className,
            )}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
