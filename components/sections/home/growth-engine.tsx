"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, Target } from "lucide-react";
import type { ServiceIcon } from "@/content/services";
import { Icon } from "@/components/shared/icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTAButton } from "@/components/shared/cta-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { useMediaQuery } from "@/hooks/use-media";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * "Your Digital Growth Engine" — how Wessma's services connect around a client's goals.
 * Edit the nodes below to change labels, descriptions, icons or links.
 * Geometry uses a 1000×600 coordinate space shared by the SVG and the HTML nodes.
 */
type EngineNode = {
  slug: string;
  title: string;
  text: string;
  icon: ServiceIcon;
  x: number;
  y: number;
};

const nodes: EngineNode[] = [
  {
    slug: "website-development",
    title: "Website & Development",
    text: "High-performing experiences built to convert.",
    icon: "globe",
    x: 150,
    y: 100,
  },
  {
    slug: "ui-ux-design",
    title: "Brand Strategy",
    text: "A clear identity that earns recognition and trust.",
    icon: "pen-tool",
    x: 150,
    y: 300,
  },
  {
    slug: "social-media",
    title: "Social Media Management",
    text: "Consistent content that keeps your brand relevant.",
    icon: "share",
    x: 150,
    y: 500,
  },
  {
    slug: "paid-ads",
    title: "Paid Ads",
    text: "Targeted campaigns built to generate qualified leads.",
    icon: "target",
    x: 850,
    y: 100,
  },
  {
    slug: "seo",
    title: "SEO & Organic Growth",
    text: "Long-term visibility through search-led strategy.",
    icon: "search",
    x: 850,
    y: 300,
  },
  {
    slug: "digital-marketing",
    title: "Content Strategy",
    text: "Useful stories that turn attention into action.",
    icon: "sparkles",
    x: 850,
    y: 500,
  },
];

const CENTER = { x: 500, y: 300 };

/** Curved path from a service node into the central goal. */
function pathFor(n: EngineNode) {
  const dir = n.x < CENTER.x ? 1 : -1;
  const c1x = n.x + dir * 170;
  const c2x = CENTER.x - dir * 170;
  return `M${n.x},${n.y} C${c1x},${n.y} ${c2x},${CENTER.y} ${CENTER.x},${CENTER.y}`;
}

export function GrowthEngine() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const reduce = useSafeReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const animate = isDesktop && !reduce;
  const current = nodes[active];

  return (
    <section
      id="growth-engine"
      className="bg-navy-950 section-y relative isolate overflow-hidden text-white"
    >
      {/* Ambient accents — gradients only (no filter blur), desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_45%_40%_at_50%_58%,rgba(249,115,22,0.10),transparent_70%)] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
      />

      <div className="container-page">
        <SectionHeading
          tone="light"
          eyebrow="Connected capabilities"
          title="Every Digital Move, Working Toward One Goal."
          subtitle="Wessma brings strategy, design, technology, and marketing together—so your digital presence works as one connected growth system."
        />

        {/* ---------------- Desktop: connected ecosystem ---------------- */}
        <BlurFade delay={0.1} className="relative mx-auto mt-16 hidden max-w-6xl lg:block">
          <div className="relative aspect-[5/3] w-full">
            <svg
              viewBox="0 0 1000 600"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="engine-active" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Orbit ring around the goal */}
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r="150"
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="2 8"
              />

              {nodes.map((n, i) => {
                const d = pathFor(n);
                const on = i === active;
                return (
                  <g key={n.slug}>
                    <path
                      d={d}
                      stroke={on ? "url(#engine-active)" : "rgba(255,255,255,0.14)"}
                      strokeWidth={on ? 2 : 1.25}
                      className="transition-[stroke-width] duration-300"
                    />
                    {on && (
                      <path
                        d={d}
                        stroke="#fdba74"
                        strokeWidth="1.5"
                        strokeDasharray="4 14"
                        strokeLinecap="round"
                        opacity="0.7"
                      >
                        {animate && (
                          <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="-36"
                            dur="1.2s"
                            repeatCount="indefinite"
                          />
                        )}
                      </path>
                    )}
                    {on && animate && (
                      <circle r="4" fill="#f97316">
                        <animateMotion dur="2.2s" repeatCount="indefinite" path={d} />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central goal node */}
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: "50%", top: "50%" }}
            >
              <div className="relative">
                {animate && (
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-[28px] border border-orange-500/30 [animation-duration:3s]"
                  />
                )}
                <div className="bg-[#0f2650] relative w-[17rem] rounded-[28px] border border-white/10 p-6 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-orange-500 text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.7)]">
                    <Target className="size-6" aria-hidden />
                  </span>
                  <p className="font-display mt-4 text-xl font-bold tracking-tight">
                    Your Business Goals
                  </p>
                  <p className="mt-1 text-xs tracking-wide text-white/50 uppercase">
                    Visibility · Trust · Growth
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-3 text-sm text-white/70">
                    Powered by{" "}
                    <span key={current.slug} className="font-semibold text-orange-400">
                      {current.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service nodes */}
            {nodes.map((n, i) => {
              const on = i === active;
              return (
                <div
                  key={n.slug}
                  className="absolute z-10 w-[15.5rem] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x / 10}%`, top: `${(n.y / 600) * 100}%` }}
                  onMouseEnter={() => setActive(i)}
                >
                  <div
                    className={cn(
                      "bg-[#0f2650] rounded-2xl border p-4 transition-[border-color,box-shadow,transform] duration-300",
                      on
                        ? "-translate-y-0.5 border-orange-500/60 shadow-[0_18px_40px_-18px_rgba(249,115,22,0.55)]"
                        : "border-white/10 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)] hover:border-white/25",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={on}
                      className="flex w-full items-center gap-3 text-left focus-visible:outline-none"
                    >
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300",
                          on
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-white/10 bg-white/5 text-white/80",
                        )}
                      >
                        <Icon name={n.icon} className="size-[18px]" />
                      </span>
                      <span className="text-[0.95rem] leading-snug font-semibold">{n.title}</span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-white/70">{n.text}</p>
                        <Link
                          href={`/services/${n.slug}`}
                          tabIndex={on ? 0 : -1}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300"
                        >
                          Learn more <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </BlurFade>

        {/* ---------------- Mobile / tablet: clean stacked layout ---------------- */}
        <div className="mx-auto mt-12 max-w-xl lg:hidden">
          <div className="bg-[#0f2650] rounded-3xl border border-orange-500/40 p-5 text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-orange-500 text-white">
              <Target className="size-5" aria-hidden />
            </span>
            <p className="font-display mt-3 text-lg font-bold">Your Business Goals</p>
            <p className="mt-1 text-xs tracking-wide text-white/50 uppercase">
              Visibility · Trust · Growth
            </p>
          </div>

          <ul className="relative mt-4 grid gap-3 pl-6">
            <span
              aria-hidden
              className="absolute top-0 bottom-6 left-[11px] w-px bg-gradient-to-b from-orange-500/60 via-white/15 to-transparent"
            />
            {nodes.map((n, i) => {
              const open = openMobile === i;
              return (
                <li key={n.slug} className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-[26px] -left-[17px] size-2.5 rounded-full border-2 transition-colors",
                      open ? "border-orange-500 bg-orange-500" : "bg-navy-950 border-white/30",
                    )}
                  />
                  <div
                    className={cn(
                      "bg-[#0f2650] rounded-2xl border transition-colors duration-200",
                      open ? "border-orange-500/60" : "border-white/10",
                    )}
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`engine-${n.slug}`}
                      onClick={() => setOpenMobile(open ? null : i)}
                      className="flex min-h-14 w-full items-center gap-3 p-3.5 text-left"
                    >
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-xl border",
                          open
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-white/10 bg-white/5 text-white/80",
                        )}
                      >
                        <Icon name={n.icon} className="size-[18px]" />
                      </span>
                      <span className="flex-1 text-[0.95rem] font-semibold">{n.title}</span>
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-4 text-white/50 transition-transform duration-200",
                          open && "rotate-180 text-orange-400",
                        )}
                      />
                    </button>
                    {open && (
                      <div id={`engine-${n.slug}`} className="px-4 pb-4 pl-[4.25rem]">
                        <p className="text-sm leading-relaxed text-white/70">{n.text}</p>
                        <Link
                          href={`/services/${n.slug}`}
                          className="mt-2 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-orange-400"
                        >
                          Learn more <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <CTAButton href="/services">Explore Our Services</CTAButton>
        </div>
      </div>
    </section>
  );
}
