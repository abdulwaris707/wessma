import { cn } from "@/lib/utils";

/**
 * Sample client wordmarks — each with a distinct geometric glyph.
 * Rendered grayscale; colour appears on hover. Replace with real SVG logos.
 */
const glyphs = [
  // circle split
  (c: string) => (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill={c} />
    </>
  ),
  // triangle
  (c: string) => (
    <>
      <path
        d="M12 3 21 20H3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="2.5" fill={c} />
    </>
  ),
  // squares
  (c: string) => (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill={c} />
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
  // arcs
  (c: string) => (
    <>
      <path
        d="M4 18a8 8 0 0 1 16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8 18a4 4 0 0 1 8 0"
        fill="none"
        stroke={c}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
  ),
  // hexagon
  (c: string) => (
    <>
      <path
        d="M12 2.5 20.5 7.3v9.4L12 21.5 3.5 16.7V7.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M12 7.5 16 10v4l-4 2.5L8 14v-4z" fill={c} />
    </>
  ),
  // bolt
  (c: string) => (
    <>
      <rect x="3" y="3" width="18" height="18" rx="6" fill="currentColor" />
      <path d="m13 6-5 7h4l-1 5 5-7h-4z" fill={c === "currentColor" ? "#fff" : c} />
    </>
  ),
];

export function ClientLogo({
  name,
  index,
  className,
}: {
  name: string;
  index: number;
  className?: string;
}) {
  const accent = index % 2 === 0 ? "#f97316" : "#2563eb";
  const glyph = glyphs[index % glyphs.length];
  return (
    <div
      className={cn(
        "group/logo hover:text-navy-950 flex h-12 shrink-0 items-center gap-2.5 px-6 text-slate-400 transition-colors duration-500",
        className,
      )}
      title={name}
    >
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <g
          className="[--c:#94a3b8] group-hover/logo:[--c:var(--accent)]"
          style={{ ["--accent" as string]: accent }}
        >
          {glyph("var(--c)")}
        </g>
      </svg>
      <span
        className={cn(
          "font-display text-xl font-bold tracking-[-0.04em]",
          index % 3 === 1 && "font-medium tracking-tight",
          index % 3 === 2 && "text-base tracking-[0.08em] uppercase",
        )}
      >
        {name}
      </span>
    </div>
  );
}
