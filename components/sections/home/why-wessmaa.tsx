"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Quote } from "lucide-react";
import { useRef } from "react";
import { whyWessmaa } from "@/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { BorderBeam } from "@/components/magicui/border-beam";
import { EASE } from "@/lib/motion";

/** Animated SVG checkmark that draws itself in. */
function AnimatedCheck({ delay }: { delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useSafeReducedMotion();
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-500 text-white shadow-[var(--shadow-glow-orange)]">
      <svg ref={ref} viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
        <motion.path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.6, delay, ease: EASE }}
        />
      </svg>
    </span>
  );
}

export function WhyWessmaa() {
  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            align="left"
            eyebrow={whyWessmaa.eyebrow}
            title={whyWessmaa.title}
            subtitle={whyWessmaa.subtitle}
          />
          <ul className="mt-10 grid gap-5">
            {whyWessmaa.benefits.map((b, i) => (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="flex gap-4"
              >
                <AnimatedCheck delay={0.2 + i * 0.1} />
                <div>
                  <p className="font-display text-ink text-lg font-semibold tracking-tight">
                    {b.title}
                  </p>
                  <p className="text-body mt-1 leading-relaxed">{b.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div
            aria-hidden
            className="bg-gradient-brand absolute -inset-6 -z-10 rounded-[40px] opacity-[0.12] blur-3xl"
          />
          <div className="border-line relative overflow-hidden rounded-[28px] border bg-white p-2 shadow-[var(--shadow-float)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
              <Image
                src="/images/culture/culture-1.webp"
                alt="The Wessmaa team collaborating in the studio"
                fill
                sizes="(min-width:1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            <BorderBeam size={260} duration={10} />
          </div>
          <div className="glass absolute right-4 -bottom-8 left-4 rounded-2xl border border-white/80 p-5 shadow-[var(--shadow-float)] sm:right-[-1.5rem] sm:left-auto sm:w-80">
            <Quote className="size-5 text-orange-500" aria-hidden />
            <p className="text-navy-950 mt-2 font-serif text-xl leading-snug">
              “{whyWessmaa.quote.text}”
            </p>
            <p className="text-muted-ink mt-3 text-sm">{whyWessmaa.quote.author}</p>
          </div>
          <div className="glass absolute -top-6 left-[-1rem] hidden rounded-2xl border border-white/80 px-5 py-4 shadow-[var(--shadow-lift)] sm:block">
            <p className="font-display text-navy-950 text-3xl font-bold tracking-tight">92%</p>
            <p className="text-muted-ink text-xs">projects shipped on time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
