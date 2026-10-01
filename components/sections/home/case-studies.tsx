import { caseStudies } from "@/content/case-studies";
import { SectionHeading } from "@/components/shared/section-heading";
import { CaseStudyCard } from "@/components/shared/case-study-card";
import { CTAButton } from "@/components/shared/cta-button";
import { BlurFade } from "@/components/magicui/blur-fade";

/** Three featured case studies: one large + two stacked. */
export function FeaturedCaseStudies() {
  const [a, b, c] = [caseStudies[0], caseStudies[2], caseStudies[4]];
  return (
    <section className="section-y relative bg-white">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title={
              <>
                Results our clients <em>brag</em> about.
              </>
            }
            subtitle="A few recent projects where product and growth moved the numbers that matter."
          />
          <BlurFade delay={0.15} className="shrink-0">
            <CTAButton href="/work" variant="secondary" size="default">
              View all case studies
            </CTAButton>
          </BlurFade>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <BlurFade className="lg:col-span-7">
            <CaseStudyCard study={a} size="large" />
          </BlurFade>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <BlurFade delay={0.08}>
              <CaseStudyCard study={b} />
            </BlurFade>
            <BlurFade delay={0.16} className="lg:hidden">
              <CaseStudyCard study={c} />
            </BlurFade>
          </div>
        </div>
        <div className="mt-5 hidden gap-5 lg:grid lg:grid-cols-12">
          <BlurFade className="lg:col-span-5">
            <CaseStudyCard study={c} />
          </BlurFade>
          <BlurFade
            delay={0.08}
            className="border-line flex flex-col justify-between rounded-[28px] border bg-white p-10 shadow-[var(--shadow-soft)] lg:col-span-7"
          >
            <p className="eyebrow">Impact, in aggregate</p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { v: "$1.2B+", l: "processed through platforms we built" },
                { v: "3.4×", l: "average ROAS across retail clients" },
                { v: "2.1M", l: "hours saved by our automations" },
              ].map((m) => (
                <div key={m.v}>
                  <p className="font-display text-navy-950 text-4xl font-bold tracking-[-0.04em]">
                    {m.v}
                  </p>
                  <p className="text-muted-ink mt-2 text-sm leading-relaxed">{m.l}</p>
                </div>
              ))}
            </div>
            <p className="text-navy-950 mt-10 max-w-lg font-serif text-2xl leading-snug">
              “We measure our work by what it does for your business — not by how many tickets we
              closed.”
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
