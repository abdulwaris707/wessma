import { Check, Clock } from "lucide-react";
import { solutions } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { MagicCard } from "@/components/magicui/magic-card";
import { CTAButton } from "@/components/shared/cta-button";
import { Icon } from "@/components/shared/icon";
import { ContainerScroll } from "@/components/aceternity/container-scroll";
import { HeroDashboard } from "@/components/sections/home/hero-dashboard";
import { FinalCta } from "@/components/sections/final-cta";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Productised packages from Wessmaa: MVP Launch, the WESSMAA Growth Engine, AI Integration and Enterprise Modernization.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Solutions", href: "/solutions" }]}
        eyebrow="Solutions"
        title={
          <>
            Proven packages for your <em>next</em> big move.
          </>
        }
        subtitle="Clear scope, fixed timelines and outcomes you can plan around. Pick the package that matches your stage — we tailor the details."
      />

      <section className="bg-white pb-24">
        <div className="container-page">
          <ContainerScroll>
            <HeroDashboard />
          </ContainerScroll>
          <p className="text-muted-ink mt-6 text-center text-sm">
            The Wessmaa Growth OS — every client gets a live dashboard across product, SEO, social,
            ads and automation.
          </p>
        </div>
      </section>

      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Packages"
            title={
              <>
                Four ways to <em>move</em> faster.
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {solutions.map((s, i) => (
              <BlurFade key={s.slug} delay={i * 0.06} className="h-full">
                <div id={s.slug} className="relative h-full scroll-mt-32">
                  <MagicCard className="h-full rounded-[28px]">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[inherit] p-8 sm:p-10">
                      {s.featured && <BorderBeam size={260} duration={9} />}
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={cn(
                            "grid size-14 place-items-center rounded-2xl",
                            s.accent === "orange"
                              ? "bg-orange-50 text-orange-700"
                              : "bg-navy-800/[0.07] text-navy-800",
                          )}
                        >
                          <Icon name={s.icon} className="size-6" />
                        </span>
                        {s.featured && (
                          <span className="text-navy-950 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold">
                            Signature package
                          </span>
                        )}
                      </div>
                      <h2 className="text-h3 mt-8 font-bold">{s.name}</h2>
                      <p className="mt-1 font-medium text-orange-700">{s.tagline}</p>
                      <p className="text-body mt-4 leading-relaxed">{s.text}</p>
                      <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {s.includes.map((inc) => (
                          <li
                            key={inc}
                            className="text-ink flex items-start gap-2 text-[0.9375rem]"
                          >
                            <Check className="mt-1 size-4 shrink-0 text-orange-500" aria-hidden />{" "}
                            {inc}
                          </li>
                        ))}
                      </ul>
                      <div
                        className="border-line mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                        style={{ marginTop: "2rem" }}
                      >
                        <div className="flex items-center gap-5">
                          <div>
                            <p className="text-muted-ink text-xs">From</p>
                            <p className="font-display text-navy-950 text-xl font-bold tracking-tight">
                              {s.from}
                            </p>
                          </div>
                          <div className="bg-line h-8 w-px" />
                          <p className="text-body inline-flex items-center gap-1.5 text-sm">
                            <Clock className="size-4 text-orange-500" aria-hidden /> {s.timeline}
                          </p>
                        </div>
                        <CTAButton
                          href="/quote"
                          size="sm"
                          variant={s.featured ? "primary" : "secondary"}
                        >
                          Get started
                        </CTAButton>
                      </div>
                    </div>
                  </MagicCard>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
