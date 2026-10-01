import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Quote } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { StatCounter } from "@/components/shared/stat-counter";
import { BrandIcon } from "@/components/shared/brand-icon";
import { JsonLd } from "@/components/shared/json-ld";
import { ContainerScroll } from "@/components/aceternity/container-scroll";
import { FinalCta } from "@/components/sections/final-cta";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({
    title: `${c.client} case study`,
    description: c.summary,
    path: `/work/${c.slug}`,
    image: c.image,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const facts = [
    { k: "Client", v: study.client },
    { k: "Industry", v: study.industry },
    { k: "Location", v: study.location },
    { k: "Timeline", v: study.duration },
    { k: "Year", v: study.year },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.summary,
          image: `${siteConfig.url}${study.image}`,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon-512.png` },
          },
        }}
      />
      <PageHero
        breadcrumbs={[
          { label: "Work", href: "/work" },
          { label: study.client, href: `/work/${study.slug}` },
        ]}
        eyebrow={`${study.industry} · Case study`}
        title={study.title}
        subtitle={study.summary}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {study.services.map((s) => (
            <span
              key={s}
              className="border-line text-body rounded-full border bg-white px-3 py-1.5 text-sm shadow-[var(--shadow-soft)]"
            >
              {s}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Hero image */}
      <section className="bg-white pb-20">
        <div className="container-page">
          <ContainerScroll>
            <div className="relative aspect-[16/9]">
              <Image
                src={study.image}
                alt={`${study.client} product`}
                fill
                priority
                sizes="(min-width:1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
          </ContainerScroll>
          <dl className="border-line bg-surface-alt mt-10 grid grid-cols-2 gap-6 rounded-3xl border p-6 sm:grid-cols-3 lg:grid-cols-5 lg:p-8">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="text-muted-ink text-xs font-semibold tracking-wider uppercase">
                  {f.k}
                </dt>
                <dd className="font-display text-navy-950 mt-1 font-semibold">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Results */}
      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="container-page">
          <p className="eyebrow !text-orange-400">Results</p>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {study.results.map((r, i) => (
              <BlurFade key={r.label} delay={i * 0.08} className="border-t border-white/15 pt-6">
                <StatCounter
                  tone="light"
                  value={r.value}
                  prefix={r.prefix}
                  suffix={r.suffix}
                  decimals={r.decimals}
                  label={r.label}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="section-y bg-white">
        <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-2">
          {[
            {
              label: "The challenge",
              text: study.challenge,
              points: study.challengePoints,
              tone: "muted",
            },
            {
              label: "The solution",
              text: study.solution,
              points: study.solutionPoints,
              tone: "accent",
            },
          ].map((b, i) => (
            <BlurFade key={b.label} delay={i * 0.08}>
              <p className="eyebrow">{b.label}</p>
              <p className="text-lead text-ink mt-5 leading-relaxed">{b.text}</p>
              <ul className="mt-8 grid gap-3">
                {b.points.map((p) => (
                  <li
                    key={p}
                    className="border-line bg-surface-alt text-ink flex gap-3 rounded-2xl border px-4 py-3.5 text-[0.9375rem]"
                  >
                    <Check
                      className={`mt-0.5 size-4 shrink-0 ${b.tone === "accent" ? "text-orange-500" : "text-muted-ink"}`}
                      aria-hidden
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Process"
            title={
              <>
                How we <em>got</em> there.
              </>
            }
          />
          <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {study.process.map((p, i) => (
              <BlurFade
                as="li"
                key={p.title}
                delay={i * 0.06}
                className="border-line relative rounded-3xl border bg-white p-7"
              >
                <span className="font-display text-sm font-bold text-orange-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="text-body mt-2 text-[0.9375rem] leading-relaxed">{p.text}</p>
              </BlurFade>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <p className="text-ink mr-2 text-sm font-semibold">Tech stack</p>
            {study.tech.map((t) => (
              <span
                key={t}
                className="border-line text-body inline-flex min-h-9 items-center gap-2 rounded-full border bg-white px-3 text-sm"
              >
                <BrandIcon name={t} colored className="size-4" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading align="left" eyebrow="Gallery" title="Behind the build" />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                src: study.image,
                alt: `${study.client} final product`,
                cls: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
              },
              {
                src: "/images/culture/culture-2.webp",
                alt: "Discovery workshop",
                cls: "aspect-[4/3]",
              },
              {
                src: "/images/culture/culture-3.webp",
                alt: "Engineering sprint",
                cls: "aspect-[4/3]",
              },
            ].map((g) => (
              <BlurFade
                key={g.alt}
                className={`border-line bg-surface-subtle relative overflow-hidden rounded-3xl border ${g.cls}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white pb-24">
        <div className="container-page">
          <BlurFade>
            <figure className="border-line bg-surface-alt relative mx-auto max-w-4xl overflow-hidden rounded-[32px] border p-8 text-center sm:p-14">
              <BorderBeam size={280} duration={12} />
              <Quote className="mx-auto size-8 text-orange-500" aria-hidden />
              <blockquote className="text-navy-950 mt-6 font-serif text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-snug">
                “{study.testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-3">
                <Image
                  src={study.testimonial.avatar}
                  alt=""
                  width={52}
                  height={52}
                  className="size-13 rounded-full object-cover object-top"
                />
                <div className="text-left">
                  <p className="text-ink font-semibold">{study.testimonial.name}</p>
                  <p className="text-muted-ink text-sm">{study.testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          </BlurFade>
        </div>
      </section>

      {/* Next project */}
      <section className="border-line border-t bg-white">
        <Link
          href={`/work/${next.slug}`}
          className="group container-page flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center lg:py-20"
        >
          <div>
            <p className="eyebrow">Next project</p>
            <p className="text-h2 text-navy-950 group-hover:text-navy-800 mt-3 max-w-2xl font-bold tracking-[-0.04em] transition-colors duration-300">
              {next.client}: {next.headline.value} {next.headline.label}
            </p>
          </div>
          <span className="text-navy-950 grid size-16 shrink-0 place-items-center rounded-full bg-orange-500 shadow-[var(--shadow-glow-orange)] transition-transform duration-500 group-hover:translate-x-2">
            <ArrowRight className="size-6" aria-hidden />
          </span>
        </Link>
      </section>
      <FinalCta />
    </>
  );
}
