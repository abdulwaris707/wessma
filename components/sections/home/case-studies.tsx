import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTAButton } from "@/components/shared/cta-button";
import { BlurFade } from "@/components/magicui/blur-fade";

/**
 * Selected work: three focused project cards (visual, category, problem → solution, CTA).
 * Change which projects appear by editing the slugs below.
 */
const featuredSlugs = ["northwind-pay", "luma-commerce", "medora-health"];

export function FeaturedCaseStudies() {
  const projects = featuredSlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

  return (
    <section className="section-y relative bg-white">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title={
              <>
                Projects built with <em>intent</em>.
              </>
            }
            subtitle="A closer look at how we pair strategy, design and engineering to solve real business problems."
          />
          <BlurFade delay={0.15} className="shrink-0">
            <CTAButton href="/work" variant="secondary" size="default">
              View all work
            </CTAButton>
          </BlurFade>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <BlurFade
              key={p.slug}
              delay={0.06 * i}
              className={i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}
            >
              <article className="group border-line flex h-full flex-col overflow-hidden rounded-[28px] border bg-white p-2 shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-float)]">
                <div className="bg-surface-subtle relative aspect-[4/3] overflow-hidden rounded-[22px]">
                  <Image
                    src={p.image}
                    alt={`${p.client} project preview`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="text-navy-950 absolute top-4 left-4 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-xs font-semibold shadow-[var(--shadow-soft)]">
                    {p.services[0]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-muted-ink text-sm font-medium">
                    {p.client} · {p.industry}
                  </p>
                  <dl className="mt-4 grid gap-3 text-[0.9375rem] leading-relaxed">
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-orange-700 uppercase">
                        Problem
                      </dt>
                      <dd className="text-body mt-0.5">{p.challengePoints[0]}</dd>
                    </div>
                    <div>
                      <dt className="text-navy-800 text-xs font-semibold tracking-wide uppercase">
                        Solution
                      </dt>
                      <dd className="text-navy-950 mt-0.5 font-medium">{p.solutionPoints[0]}</dd>
                    </div>
                  </dl>
                  <Link
                    href={`/work/${p.slug}`}
                    className="text-navy-950 border-line mt-6 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors hover:border-orange-500/40 hover:text-orange-700"
                  >
                    View Project
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
