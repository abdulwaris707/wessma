"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { caseStudies, caseStudyIndustries, caseStudyServices } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/shared/case-study-card";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Filterable portfolio grid with animated layout transitions. */
export function WorkGrid() {
  const [industry, setIndustry] = useState("All");
  const [service, setService] = useState("All");
  const items = useMemo(
    () =>
      caseStudies.filter(
        (c) =>
          (industry === "All" || c.industry === industry) &&
          (service === "All" || c.services.includes(service)),
      ),
    [industry, service],
  );

  return (
    <div>
      <div className="border-line flex flex-col gap-4 rounded-3xl border bg-white p-3 shadow-[var(--shadow-soft)] lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by industry"
          className="no-scrollbar flex gap-1 overflow-x-auto"
        >
          {caseStudyIndustries.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndustry(i)}
              aria-pressed={industry === i}
              className="relative inline-flex min-h-10 shrink-0 items-center rounded-full px-4 text-sm font-medium"
            >
              {industry === i && (
                <motion.span
                  layoutId="industry-pill"
                  className="bg-navy-950 absolute inset-0 rounded-full"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <span
                className={cn(
                  "relative transition-colors duration-300",
                  industry === i ? "text-white" : "text-body hover:text-navy-950",
                )}
              >
                {i}
              </span>
            </button>
          ))}
        </div>
        <label className="text-muted-ink flex items-center gap-2 px-2 text-sm">
          <span className="shrink-0">Service</span>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border-line bg-surface-alt text-ink h-10 min-w-0 rounded-full border px-4 text-sm font-medium outline-none focus-visible:border-orange-500"
          >
            {caseStudyServices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="text-muted-ink mt-6 text-sm" aria-live="polite">
        Showing {items.length} {items.length === 1 ? "project" : "projects"}
      </p>
      <motion.div layout className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((c) => (
            <motion.div
              key={c.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <CaseStudyCard study={c} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {items.length === 0 && (
        <div className="border-line mt-6 rounded-3xl border border-dashed p-12 text-center">
          <p className="font-display text-ink text-lg font-semibold">
            No projects match those filters yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setIndustry("All");
              setService("All");
            }}
            className="text-navy-800 mt-3 text-sm font-semibold hover:text-orange-700"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
