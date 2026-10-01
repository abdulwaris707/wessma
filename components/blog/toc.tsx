"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

/** Sticky table of contents with active-heading tracking. */
export function Toc({ headings }: { headings: { id: string; text: string; level: 2 | 3 }[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label="Table of contents">
      <p className="text-muted-ink text-xs font-semibold tracking-[0.12em] uppercase">
        On this page
      </p>
      <ol className="border-line mt-4 grid gap-1 border-l">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(`#${h.id}`);
                history.replaceState(null, "", `#${h.id}`);
              }}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors duration-200",
                h.level === 3 ? "pl-7" : "pl-4",
                active === h.id
                  ? "text-navy-950 border-orange-500 font-medium"
                  : "text-muted-ink hover:text-ink border-transparent",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
