"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Target, TrendingUp, Sparkles, Layers } from "lucide-react";
import { missionPillars, ctas } from "@/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { CTAButton } from "@/components/shared/cta-button";

const iconMap = {
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
  target: Target,
};

export function MissionPillars() {
  return (
    <section className="section-y bg-surface-alt relative overflow-hidden" id="about-mission">
      {/* Decorative gradient glow */}
      <div
        aria-hidden
        className="hidden sm:block bg-navy-600/10 pointer-events-none absolute -top-40 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full blur-[120px]"
      />

      <div className="container-page relative">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Core Mission & Foundation"
            title={
              <>
                Drive Traffic. Build Trust. <em>Increase Conversions.</em>
              </>
            }
            subtitle="WESSMAA builds digital experiences and growth systems that help businesses become more visible, more credible and more effective online."
          />
          <BlurFade delay={0.15} className="flex flex-wrap items-center gap-3">
            <CTAButton href={ctas.primary.href} size="default" magnetic>
              {ctas.primary.label}
            </CTAButton>
            <CTAButton href={ctas.secondary.href} variant="secondary" size="default" arrow={false}>
              {ctas.secondary.label}
            </CTAButton>
          </BlurFade>
        </div>

        {/* The 3 Mission Pillars */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {missionPillars.map((p, i) => {
            const IconComponent = iconMap[p.icon as keyof typeof iconMap] ?? Sparkles;
            return (
              <BlurFade key={p.pillar} delay={0.06 * i} className="h-full">
                <MagicCard className="h-full rounded-3xl">
                  <div className="flex h-full flex-col p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-orange-500/10 text-orange-600">
                        <IconComponent className="size-6" />
                      </span>
                      <span className="border-line bg-surface-alt text-muted-ink rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-navy-950 mt-6 text-2xl font-bold tracking-tight">
                      {p.pillar}
                    </h3>

                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-muted-ink text-xs font-semibold tracking-wider uppercase">
                          What WESSMAA Does
                        </p>
                        <p className="text-body mt-1.5 leading-relaxed">{p.whatWessmaaDoes}</p>
                      </div>

                      <div className="border-line rounded-2xl border bg-white/70 p-4">
                        <p className="text-muted-ink text-xs font-semibold tracking-wider uppercase">
                          Expected Outcome
                        </p>
                        <p className="font-display text-navy-900 mt-1 font-semibold text-emerald-800">
                          {p.expectedOutcome}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-slate-100">
                      <p className="text-muted-ink mb-2 text-xs font-medium">Connected Disciplines:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.capabilities.map((c) => (
                          <span
                            key={c}
                            className="bg-surface-subtle text-navy-800 rounded-md px-2 py-0.5 text-xs font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>

        {/* Why WESSMAA is Different / How WESSMAA Thinks banner */}
        <BlurFade delay={0.25} className="mt-8">
          <div className="border-navy-950 bg-navy-950 relative overflow-hidden rounded-[28px] border p-8 text-white sm:p-10 shadow-[var(--shadow-float)]">
            <div
              aria-hidden
              className="hidden sm:block absolute -top-24 -right-24 size-80 rounded-full bg-orange-500/15 blur-xl"
            />
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-orange-400">
                  <Layers className="size-4" />
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    Why WESSMAA Is Different
                  </span>
                </div>
                <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Not only just a marketing agency. One connected growth system.
                </h3>
                <p className="mt-4 leading-relaxed text-white/80">
                  WESSMAA is not presented as individual, disconnected marketing services. We connect
                  technology, creative content, social media, SEO, marketing, advertising and automation so they
                  work together as one growth engine where every service has a purpose.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-orange-400 shrink-0" />
                    <span>Get Found</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-orange-400 shrink-0" />
                    <span>Get Trusted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-orange-400 shrink-0" />
                    <span>Get Chosen</span>
                  </div>
                </div>
              </div>

              <div className="border-line/20 rounded-2xl border bg-white/[0.08] p-6 lg:col-span-5">
                <p className="text-xs font-semibold tracking-wider text-orange-300 uppercase">
                  How WESSMAA Thinks
                </p>
                <blockquote className="font-serif mt-3 text-lg leading-snug text-white italic">
                  “We don&apos;t just create digital activity. We build the digital foundation and growth
                  system that helps a business get found, get trusted and get chosen.”
                </blockquote>
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 hover:text-orange-300"
                  >
                    Read our story
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white"
                  >
                    See all capabilities
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
