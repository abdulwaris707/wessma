"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { FaqItem } from "@/content/company";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { scrollToTarget } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

/** Searchable, categorised FAQ with a sticky category rail. */
export function FaqBrowser({
  categories,
}: {
  categories: { id: string; label: string; items: FaqItem[] }[];
}) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          items: c.items.filter((i) => !term || `${i.q} ${i.a}`.toLowerCase().includes(term)),
        }))
        .filter((c) => c.items.length),
    [categories, term],
  );
  const total = filtered.reduce((a, c) => a + c.items.length, 0);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="lg:sticky lg:top-28">
          <label className="relative block">
            <span className="sr-only">Search questions</span>
            <Search
              className="text-muted-ink pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search questions"
              className="border-line text-ink placeholder:text-muted-ink h-12 w-full rounded-full border bg-white pr-4 pl-11 text-[0.9375rem] shadow-[var(--shadow-soft)] outline-none focus-visible:border-orange-500 focus-visible:shadow-[0_0_0_4px_rgb(249_115_22/0.12)]"
            />
          </label>
          <nav
            aria-label="FAQ categories"
            className="no-scrollbar mt-6 flex gap-1 overflow-x-auto lg:flex-col"
          >
            {categories.map((c) => {
              const count = filtered.find((f) => f.id === c.id)?.items.length ?? 0;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => scrollToTarget(`#faq-${c.id}`, -110)}
                  disabled={!count}
                  className={cn(
                    "hover:text-navy-950 flex min-h-11 shrink-0 items-center justify-between gap-3 rounded-xl px-4 text-left text-sm font-medium transition-colors hover:bg-white disabled:opacity-40",
                    "text-body",
                  )}
                >
                  {c.label}
                  <span className="text-muted-ink rounded-full bg-white px-2 text-xs">{count}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
      <div className="grid gap-12 lg:col-span-9">
        <p className="sr-only" aria-live="polite">
          {total} questions found
        </p>
        {filtered.map((c) => (
          <section
            key={c.id}
            id={`faq-${c.id}`}
            aria-labelledby={`faq-h-${c.id}`}
            className="scroll-mt-28"
          >
            <h2 id={`faq-h-${c.id}`} className="text-h3 font-bold">
              {c.label}
            </h2>
            <Accordion type="single" collapsible className="mt-5 grid gap-3">
              {c.items.map((f, i) => (
                <AccordionItem key={f.q} value={`${c.id}-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
        {!filtered.length && (
          <div className="border-line rounded-3xl border border-dashed bg-white p-12 text-center">
            <p className="font-display text-ink text-lg font-semibold">No answers match “{q}”.</p>
            <p className="text-body mt-2 text-sm">
              Try another word, or ask us directly — we reply within one business day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
