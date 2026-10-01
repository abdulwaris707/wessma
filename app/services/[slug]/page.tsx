import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { getService, services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { CTAButton } from "@/components/shared/cta-button";
import { CaseStudyCard } from "@/components/shared/case-study-card";
import { ServiceCard } from "@/components/shared/service-card";
import { BrandIcon } from "@/components/shared/brand-icon";
import { Icon } from "@/components/shared/icon";
import { JsonLd } from "@/components/shared/json-ld";
import { Process } from "@/components/sections/home/process";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.short, path: `/services/${s.slug}` });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = caseStudies.filter((c) => service.caseStudies.includes(c.slug));
  const others = services
    .filter((s) => s.slug !== service.slug && s.group === service.group)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.short,
          provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          areaServed: "Worldwide",
          offers: { "@type": "Offer", description: `From ${service.pricingHint.from}` },
        }}
      />
      <PageHero
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
        eyebrow={service.letter ? `${service.letter} · ${service.title}` : service.title}
        title={service.heroTitle}
        subtitle={service.heroText}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/quote" magnetic>
            Start your project
          </CTAButton>
          <CTAButton href="/book" variant="secondary" arrow={false}>
            Book a free call
          </CTAButton>
        </div>
      </PageHero>

      {/* Problem → Solution */}
      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="The challenge"
            title={
              <>
                From <em>friction</em> to momentum.
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <BlurFade className="h-full">
              <div className="border-line h-full rounded-[28px] border bg-white p-8 sm:p-10">
                <span className="bg-surface-subtle text-muted-ink inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                  The problem
                </span>
                <h2 className="text-h3 mt-5 font-bold">{service.problem.title}</h2>
                <ul className="mt-6 grid gap-4">
                  {service.problem.points.map((p) => (
                    <li key={p} className="text-body flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
                        <X className="size-3.5" aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
            <BlurFade delay={0.08} className="h-full">
              <div className="border-navy-950 bg-navy-950 relative h-full overflow-hidden rounded-[28px] border p-8 text-white sm:p-10">
                <BorderBeam size={260} duration={10} />
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 size-72 rounded-full bg-orange-500/25 blur-3xl"
                />
                <span className="text-navy-950 relative inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                  The Wessmaa way
                </span>
                <h2 className="text-h3 relative mt-5 font-bold !text-white">
                  {service.solution.title}
                </h2>
                <ul className="relative mt-6 grid gap-4">
                  {service.solution.points.map((p) => (
                    <li key={p} className="flex gap-3 text-white/85">
                      <span className="text-navy-950 mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-orange-500">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's included"
            title={
              <>
                Built for results, <em>not</em> just launch day.
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <BlurFade key={f.title} delay={i * 0.05} className="h-full">
                <MagicCard className="h-full rounded-3xl">
                  <div className="p-7">
                    <span className="font-display grid size-11 place-items-center rounded-2xl bg-orange-50 text-sm font-bold text-orange-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 text-lg font-bold">{f.title}</h3>
                    <p className="text-body mt-2 leading-relaxed">{f.text}</p>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>

          {/* Deliverables + tech + pricing */}
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <BlurFade className="h-full lg:col-span-2">
              <div className="border-line bg-surface-alt grid h-full grid-cols-1 gap-8 rounded-3xl border p-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow">Deliverables</p>
                  <ul className="mt-5 grid gap-3">
                    {service.deliverables.map((d) => (
                      <li key={d} className="text-ink flex items-center gap-2.5">
                        <Check className="size-4 shrink-0 text-orange-500" aria-hidden /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow">Tech we use</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="border-line text-body inline-flex min-h-9 items-center gap-2 rounded-full border bg-white px-3 text-sm"
                      >
                        <BrandIcon name={t} colored className="size-4" /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={0.08} className="h-full">
              <div className="border-line relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-white p-8 shadow-[var(--shadow-soft)]">
                <BorderBeam size={180} duration={9} />
                <div>
                  <span className="bg-navy-950 grid size-11 place-items-center rounded-2xl text-orange-400">
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <p className="text-muted-ink mt-6 text-sm">Projects start from</p>
                  <p className="font-display text-navy-950 mt-1 text-4xl font-bold tracking-[-0.04em]">
                    {service.pricingHint.from}
                  </p>
                  <p className="text-body mt-2 text-sm">{service.pricingHint.note}</p>
                </div>
                <div className="mt-8">
                  <CTAButton href="/quote" size="default">
                    Get an exact quote
                  </CTAButton>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      <Process eyebrow="Our process" />

      {related.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-page">
            <SectionHeading
              align="left"
              eyebrow="Related work"
              title={
                <>
                  Proof, <em>not</em> promises.
                </>
              }
            />
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {related.map((c, i) => (
                <BlurFade key={c.slug} delay={i * 0.08}>
                  <CaseStudyCard study={c} />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection items={service.faqs} tone="alt" />

      <section className="section-y bg-white">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading align="left" eyebrow="Explore more" title="Related services" />
            <Link
              href="/services"
              className="text-navy-800 hidden items-center gap-1.5 text-sm font-semibold hover:text-orange-700 sm:inline-flex"
            >
              All services <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
