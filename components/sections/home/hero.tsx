"use client";

import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ctas, hero } from "@/config/site";
import { AnimatedGradientBadge } from "@/components/magicui/animated-gradient-text";
import { WordRotate } from "@/components/magicui/word-rotate";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/aceternity/spotlight";
import { CTAButton } from "@/components/shared/cta-button";
import { useFinePointer } from "@/hooks/use-media";
import { EASE } from "@/lib/motion";
import { FloatingAgentCard, FloatingMetricCard, HeroDashboard } from "./hero-dashboard";

/** Home hero: rotating headline, CTAs, trust line and a parallax dashboard mockup. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useSafeReducedMotion();
  const fine = useFinePointer();

  // Parallax on scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const dashY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const cardAY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const cardBY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);

  // Cursor-follow glow (desktop only)
  const gx = useSpring(useMotionValue(-600), { stiffness: 120, damping: 24 });
  const gy = useSpring(useMotionValue(-600), { stiffness: 120, damping: 24 });

  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE },
  });

  useEffect(() => {
    // The dashboard is DOM-rendered, so this confirms its React commit. The
    // root loader waits for two additional browser paint frames before reveal.
    window.dispatchEvent(new Event("wessmaa:hero-mounted"));
  }, []);

  return (
    <section
      ref={ref}
      data-initial-hero
      onPointerMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        gx.set(e.clientX - r.left);
        gy.set(e.clientY - r.top);
      }}
      className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-40 lg:pt-44 lg:pb-28"
    >
      {/* Backgrounds */}
      <GridPattern
        className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        squares={[
          [4, 3],
          [9, 2],
          [14, 5],
          [20, 3],
          [6, 7],
          [17, 8],
        ]}
      />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#2563eb" />
      <div
        aria-hidden
        className="absolute -top-24 right-[-10%] -z-10 size-[36rem] rounded-full bg-orange-500/[0.12] blur-[120px]"
      />
      <div
        aria-hidden
        className="bg-navy-600/[0.10] absolute top-40 left-[-12%] -z-10 size-[30rem] rounded-full blur-[120px]"
      />
      {fine && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.10),transparent_60%)]"
          style={{ left: gx, top: gy }}
        />
      )}

      <div className="container-page">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.div {...item(0)}>
            <AnimatedGradientBadge>
              <span className="size-1.5 rounded-full bg-orange-500 shadow-[0_0_0_4px_rgb(249_115_22/0.18)]" />
              {hero.badge}
            </AnimatedGradientBadge>
          </motion.div>

          <motion.h1
            {...item(1)}
            className="text-display text-navy-950 mt-7 font-bold tracking-[-0.045em]"
          >
            {hero.titleStart}
            <br />
            <WordRotate words={hero.rotatingWords} className="text-gradient-brand" />
            <br /> {hero.titleEnd}{" "}
            <em className="font-serif font-normal tracking-[-0.02em] text-orange-700">
              {hero.titleAccent}
            </em>{" "}
            {hero.titleLast}
          </motion.h1>

          <motion.p {...item(2)} className="text-lead text-body mt-6 max-w-[60ch]">
            {hero.subtitle}
          </motion.p>

          <motion.div
            {...item(3)}
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <CTAButton href={ctas.primary.href} magnetic>
              {ctas.primary.label}
            </CTAButton>
            <CTAButton href={ctas.secondary.href} variant="secondary" arrow={false}>
              {ctas.secondary.label}
            </CTAButton>
          </motion.div>

          <motion.div
            {...item(4)}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <div className="text-body text-sm">
              <span className="text-navy-950 font-semibold">{hero.trust}</span>
              <span className="text-line mx-2">·</span>
              <span>Focused on quality, clarity, and long-term partnerships</span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.45, ease: EASE }}
          className="relative mx-auto mt-16 max-w-5xl lg:mt-20"
        >
          <div
            aria-hidden
            className="bg-gradient-brand absolute inset-x-10 top-10 -bottom-10 -z-10 rounded-[40px] opacity-20 blur-3xl"
          />
          <motion.div style={{ y: dashY }}>
            <HeroDashboard />
          </motion.div>
          <motion.div
            style={{ y: cardAY }}
            className="absolute top-24 -left-6 hidden lg:block xl:-left-16"
          >
            <div className="animate-float">
              <FloatingAgentCard />
            </div>
          </motion.div>
          <motion.div
            style={{ y: cardBY }}
            className="absolute -right-6 bottom-16 hidden lg:block xl:-right-14"
          >
            <div className="animate-float [animation-delay:-3s]">
              <FloatingMetricCard />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
