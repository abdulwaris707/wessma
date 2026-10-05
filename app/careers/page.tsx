import Image from "next/image";
import { benefits, values } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { Icon } from "@/components/shared/icon";
import { CTAButton } from "@/components/shared/cta-button";
import { JobBoard } from "@/components/sections/job-board";
import { ApplicationForm } from "@/components/forms/application-form";
import { getPublishedJobs } from "@/lib/db";

export const metadata = buildMetadata({
  title: "Careers & Opportunities",
  description:
    "Join Wessmaa — an early-stage software and growth studio at NUML Islamabad. Remote-friendly roles in engineering, design and marketing.",
  path: "/careers",
});

export const dynamic = "force-dynamic";
export default async function CareersPage() {
  const jobs = await getPublishedJobs();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Careers & Opportunities", href: "/careers" }]}
        eyebrow="Careers & Opportunities"
        title={
          <>
            Careers & <em>Opportunities</em>
          </>
        }
        subtitle="Join a focused team shipping products for clients in Pakistan and abroad — from NUML Islamabad or anywhere in Pakistan."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="#open-roles">Explore opportunities</CTAButton>
          <CTAButton href="#apply" variant="secondary" arrow={false}>
            Open application
          </CTAButton>
        </div>
      </PageHero>

      {/* Culture photos */}
      <section className="bg-white pb-24">
        <div className="container-page grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {[
            {
              src: "/images/culture/culture-1.webp",
              alt: "Team planning session",
              cls: "col-span-2 row-span-2 aspect-square md:aspect-auto",
            },
            { src: "/images/culture/culture-2.webp", alt: "Design critique", cls: "aspect-square" },
            {
              src: "/images/culture/culture-3.webp",
              alt: "Engineers pairing",
              cls: "aspect-square",
            },
            { src: "/images/team/team-3.webp", alt: "Team member portrait", cls: "aspect-square" },
            { src: "/images/team/team-2.webp", alt: "Team member portrait", cls: "aspect-square" },
          ].map((p, i) => (
            <BlurFade
              key={p.src}
              delay={i * 0.05}
              className={`bg-surface-subtle relative overflow-hidden rounded-3xl ${p.cls}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width:768px) 25vw, 50vw"
                className="object-cover object-top transition-transform duration-1000 hover:scale-105"
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Culture values */}
      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Culture"
            title={
              <>
                How we <em>work</em> together.
              </>
            }
            subtitle="Small senior squads, radical candour and a bias for shipping. We hire for craft and kindness in equal measure."
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.slice(0, 3).map((v, i) => (
              <BlurFade key={v.title} delay={i * 0.06} className="h-full">
                <div className="border-line h-full rounded-3xl border bg-white p-7">
                  <span className="bg-navy-950 grid size-12 place-items-center rounded-2xl text-orange-400">
                    <Icon name={v.icon} className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-bold">{v.title}</h3>
                  <p className="text-body mt-2 leading-relaxed">{v.text}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Benefits"
            title={
              <>
                We take care of <em>our</em> people.
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <BlurFade key={b.title} delay={i * 0.05} className="h-full">
                <MagicCard className="h-full rounded-3xl">
                  <div className="flex gap-5 p-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-orange-50 text-orange-700">
                      <Icon name={b.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{b.title}</h3>
                      <p className="text-body mt-1.5 leading-relaxed">{b.text}</p>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="open-roles" className="section-y bg-surface-alt scroll-mt-24">
        <div className="container-page">
          <SectionHeading
            align="left"
            eyebrow="Opportunities"
            title={
              <>
                Find a way to <em>contribute</em>.
              </>
            }
          />
          <div className="mt-10">
            <JobBoard jobs={jobs} />
          </div>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="section-y scroll-mt-24 bg-white">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow="Apply"
              title="Don't see your role?"
              subtitle="Send a general application. We are always looking for exceptional engineers, designers and marketers."
            />
          </div>
          <div className="border-line rounded-[28px] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10 lg:col-span-8">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
