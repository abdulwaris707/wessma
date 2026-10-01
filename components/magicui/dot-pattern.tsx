import { useId } from "react";
import { cn } from "@/lib/utils";

/** Magic UI — Dot Pattern background (very low opacity by default). */
export function DotPattern({
  width = 20,
  height = 20,
  cr = 1,
  className,
}: {
  width?: number;
  height?: number;
  cr?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn(
        "fill-navy-800/[0.13] pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <circle cx={width / 2} cy={height / 2} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
