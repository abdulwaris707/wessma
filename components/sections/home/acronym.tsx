"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { acronym } from "@/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Signature section — what WESSMAA stands for.
 * Desktop: horizontal expanding columns. Mobile: stacked list.
 */
export function Acronym() {
  const [active, setActive] = useState(0);
  return (
    <section className="section-y bg-surface-alt relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,#e2e8f0,transparent)]"
      />
      <div className="container-page">
        <SectionHeading
          eyebrow="The name says it all"
          title={
            <>
              Seven disciplines. <em>One</em> accountable team.
            </>
          }
          subtitle="WESSMAA stands for Website, Editing, Social, SEO, Marketing, Automation and Ads — everything a modern business needs to build a product and grow it, without juggling five agencies."
        />

        {/* Desktop */}
        <BlurFade delay={0.1} className="mt-16 hidden h-[420px] gap-2 lg:flex">
          {acronym.map((a, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={a.word}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                animate={{ flexGrow: isActive ? 4.2 : 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={cn(
                  "group relative flex min-w-0 basis-0 flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-colors duration-500",
                  isActive
                    ? "border-navy-950 bg-navy-950 text-white"
                    : "border-line text-navy-950 hover:border-navy-800/25 bg-white",
                )}
              >
                {isActive && (
                  <>
                    <div
                      aria-hidden
                      className="hidden sm:block absolute -top-20 -right-20 size-64 rounded-full bg-orange-500/20 blur-xl"
                    />
                    <div
                      aria-hidden
                      className="hidden sm:block bg-navy-600/30 absolute -bottom-24 -left-10 size-64 rounded-full blur-xl"
                    />
                  </>
                )}
                <span
                  className={cn(
                    "font-display relative text-[5.5rem] leading-[0.85] font-bold tracking-[-0.06em] transition-colors duration-500",
                    isActive ? "text-orange-500" : "text-navy-950/90",
                  )}
                >
                  {a.letter}
                </span>
                <div className="relative min-w-0">
                  <p
                    className={cn(
                      "font-display text-xl font-bold tracking-tight whitespace-nowrap",
                      !isActive && "origin-bottom-left",
                    )}
                  >
                    {a.word}
                  </p>
                  {isActive && 'tagline' in a && a.tagline && (
                    <p className="mt-0.5 text-xs font-semibold text-orange-400">
                      {a.tagline}
                    </p>
                  )}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={a.word}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
                        className="w-[min(340px,100%)]"
                      >
                        <p className="mt-2 text-sm leading-relaxed text-white/80">{a.purpose ?? a.text}</p>
                        <Link
                          href={a.href}
                          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-orange-300"
                        >
                          Explore {a.word}
                          <ArrowUpRight className="size-4" aria-hidden />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </BlurFade>

        {/* Mobile / tablet */}
        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {acronym.map((a, i) => (
            <BlurFade as="li" key={a.word} delay={i * 0.04}>
              <Link
                href={a.href}
                className="group border-line flex items-start gap-4 rounded-2xl border bg-white p-5 transition-[border-color,box-shadow] hover:border-orange-500/40 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="bg-navy-950 font-display grid size-12 shrink-0 place-items-center rounded-xl text-2xl font-bold text-orange-500">
                  {a.letter}
                </span>
                <span>
                  <span className="font-display text-navy-950 flex items-center gap-1.5 text-lg font-bold tracking-tight">
                    {a.word}
                    <ArrowUpRight
                      className="size-4 text-orange-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                  {'tagline' in a && a.tagline && (
                    <span className="block text-xs font-semibold text-orange-600 mt-0.5">
                      {a.tagline}
                    </span>
                  )}
                  <span className="text-body mt-1 block text-sm leading-relaxed">{a.purpose ?? a.text}</span>
                </span>
              </Link>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  );
}
