"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { industries } from "@/config/site";
import { caseStudies } from "@/content/case-studies";
import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Industries served — tab list + animated detail panel. */
export function Industries() {
  const [active, setActive] = useState(industries[0].id);
  const ind = industries.find((i) => i.id === active)!;
  const study = caseStudies.find((c) => c.industry === ind.label);

  return (
    <section className="section-y relative bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              Deep expertise where the <em>stakes</em> are high.
            </>
          }
          subtitle="We bring domain patterns, compliance know-how and proven playbooks to every industry we serve."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Industries"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {industries.map((i) => (
              <button
                key={i.id}
                role="tab"
                type="button"
                aria-selected={active === i.id}
                aria-controls={`industry-panel`}
                onClick={() => setActive(i.id)}
                className={cn(
                  "group relative flex min-h-14 shrink-0 items-center gap-3 rounded-2xl border px-4 text-left transition-[background-color,border-color,box-shadow] duration-300 lg:px-5",
                  active === i.id
                    ? "border-navy-800/20 bg-white shadow-[var(--shadow-lift)]"
                    : "hover:bg-surface-alt border-transparent",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-xl transition-colors duration-300",
                    active === i.id
                      ? "bg-orange-500 text-white"
                      : "bg-surface-alt text-navy-800 group-hover:text-orange-700",
                  )}
                >
                  <Icon name={i.icon} className="size-4" />
                </span>
                <span className="font-display text-ink text-base font-semibold whitespace-nowrap">
                  {i.label}
                </span>
                <ArrowRight
                  className={cn(
                    "ml-auto hidden size-4 transition-all duration-300 lg:block",
                    active === i.id
                      ? "translate-x-0 text-orange-500 opacity-100"
                      : "-translate-x-2 opacity-0",
                  )}
                  aria-hidden
                />
              </button>
            ))}
          </div>

          <div id="industry-panel" role="tabpanel" className="relative lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="border-line grid h-full grid-cols-1 gap-6 overflow-hidden rounded-[28px] border bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 md:grid-cols-2"
              >
                <div className="flex flex-col">
                  <p className="eyebrow">{ind.label}</p>
                  <h3 className="text-h3 mt-3 font-bold">{ind.title}</h3>
                  <p className="text-body mt-3 leading-relaxed">{ind.text}</p>
                  <ul className="mt-6 grid gap-2.5">
                    {ind.points.map((p) => (
                      <li key={p} className="text-ink flex items-center gap-2.5 text-[0.9375rem]">
                        <span className="grid size-5 place-items-center rounded-full bg-orange-50 text-orange-700">
                          <Check className="size-3" aria-hidden />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  {ind.metric && (
                    <div className="mt-auto pt-8">
                      <p className="font-display text-navy-950 text-4xl font-bold tracking-[-0.04em]">
                        {ind.metric.value}
                      </p>
                      <p className="text-muted-ink mt-1 text-sm">{ind.metric.label}</p>
                    </div>
                  )}
                </div>
                {study && (
                  <Link
                    href={`/work/${study.slug}`}
                    className="group bg-surface-subtle relative min-h-64 overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={study.image}
                      alt={study.client}
                      fill
                      sizes="(min-width:1024px) 400px, 100vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="from-navy-950/80 via-navy-950/10 absolute inset-0 bg-gradient-to-t to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-xs font-medium tracking-wider text-orange-400 uppercase">
                        Case study
                      </p>
                      <p className="font-display mt-1 text-lg leading-snug font-semibold">
                        {study.client}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 group-hover:text-white">
                        Read the story{" "}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
