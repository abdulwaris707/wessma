import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { ServiceCard } from "@/components/shared/service-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CTAButton } from "@/components/shared/cta-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Process } from "@/components/sections/home/process";
import { FinalCta } from "@/components/sections/final-cta";
import { acronym } from "@/config/site";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Websites, custom software, SaaS, mobile apps, UI/UX, AI automation, SEO, social, content editing and paid ads — from one senior team.",
  path: "/services",
});

export default function ServicesPage() {
  const groups = [
    {
      id: "build",
      label: "Build",
      title: (
        <>
          Engineering & <em>design</em>
        </>
      ),
      text: "Products, platforms and experiences engineered to scale.",
      items: services.filter((s) => s.group === "Build"),
    },
    {
      id: "grow",
      label: "Grow",
      title: (
        <>
          Marketing & <em>growth</em>
        </>
      ),
      text: "The channels and content that put your product in front of buyers.",
      items: services.filter((s) => s.group === "Grow"),
    },
  ];
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Services", href: "/services" }]}
        eyebrow="Services"
        title={
          <>
            Build it. Launch it. <em>Grow</em> it.
          </>
        }
        subtitle="Twelve senior disciplines under one roof — so the team that builds your product is the same team that ranks it, markets it and automates it."
      >
        <div className="flex flex-wrap justify-center gap-2">
          {acronym.map((a, i) => (
            <span
              key={a.word + i}
              className="border-line text-body inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm shadow-[var(--shadow-soft)]"
            >
              <span className="font-display font-bold text-orange-700">{a.letter}</span>
              {a.word}
            </span>
          ))}
        </div>
      </PageHero>

      {groups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          className={`section-y ${gi % 2 === 0 ? "bg-surface-alt" : "bg-white"}`}
        >
          <div className="container-page">
            <SectionHeading align="left" eyebrow={g.label} title={g.title} subtitle={g.text} />
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((s, i) => (
                <BlurFade key={s.slug} delay={i * 0.05} className="h-full">
                  <ServiceCard service={s} />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white pb-8">
        <div className="container-page">
          <div className="border-line bg-surface-alt flex flex-col items-start justify-between gap-6 rounded-[28px] border p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="font-display text-navy-950 text-2xl font-bold tracking-tight">
                Not sure what you need?
              </p>
              <p className="text-body mt-2">
                Answer six quick questions and get an instant estimate for your project.
              </p>
            </div>
            <CTAButton href="/quote">Get an estimate</CTAButton>
          </div>
        </div>
      </section>
      <Process />
      <FinalCta />
    </>
  );
}
