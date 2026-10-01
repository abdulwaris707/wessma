import { useId } from "react";
import { cn } from "@/lib/utils";

/** Magic UI — Grid Pattern background with optional highlighted squares. */
export function GridPattern({
  width = 48,
  height = 48,
  squares = [],
  className,
}: {
  width?: number;
  height?: number;
  squares?: [number, number][];
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn(
        "stroke-navy-800/[0.07] pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          width={width - 1}
          height={height - 1}
          x={x * width + 1}
          y={y * height + 1}
          className="fill-orange-500/[0.05]"
          strokeWidth={0}
        />
      ))}
    </svg>
  );
}
