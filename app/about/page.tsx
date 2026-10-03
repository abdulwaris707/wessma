import Image from "next/image";
import { Award } from "lucide-react";
import { BrandIcon } from "@/components/shared/brand-icon";
import { awards, team, timeline, values } from "@/content/company";
import { acronym } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { Marquee } from "@/components/magicui/marquee";
import { Icon } from "@/components/shared/icon";
import { TextGenerateEffect } from "@/components/aceternity/text-generate-effect";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import { Stats } from "@/components/sections/home/stats";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Wessmaa is an early-stage software and growth studio based at NUML in Islamabad, Pakistan.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "About", href: "/about" }]}
        eyebrow="About Wessmaa"
        title={
          <>
            Built at NUML Islamabad. <em>Made</em> for growth.
          </>
        }
        subtitle="We are a focused team of engineers, designers and marketers who believe great software deserves great growth — and that one team should own both."
      />

      {/* Story */}
      <section className="bg-white pb-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <BlurFade className="relative lg:col-span-6">
            <div className="grid grid-cols-5 gap-3">
              <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/images/culture/culture-1.webp"
                  alt="Wessmaa studio"
                  fill
                  sizes="(min-width:1024px) 360px, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 grid gap-3">
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src="/images/culture/culture-2.webp"
                    alt="Design workshop"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-3xl">
                  <Image
                    src="/images/culture/culture-3.webp"
                    alt="Pair programming"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </BlurFade>
          <div className="lg:col-span-6">
            <p className="eyebrow">Our story</p>
            <TextGenerateEffect
              className="font-display text-navy-950 mt-5 text-[clamp(1.5rem,1.2rem+1vw,2.125rem)] leading-snug font-semibold tracking-[-0.03em]"
              words="Wessmaa started at NUML Islamabad with one belief: businesses should not have to hire several agencies to build a product and grow it."
            />
            <div className="text-body mt-6 grid gap-4 leading-relaxed">
              <p>
                We began building websites for local businesses in Islamabad. Clients kept
                asking for more — an app, a booking system, then help getting customers to use them.
                So we built the team to do it all.
              </p>
              <p>
                Today, the name says exactly what we do: <strong className="text-ink">W</strong>
                ebsite, <strong className="text-ink">E</strong>diting,{" "}
                <strong className="text-ink">S</strong>ocial,{" "}
                <strong className="text-ink">S</strong>EO, <strong className="text-ink">M</strong>
                arketing, <strong className="text-ink">A</strong>utomation and{" "}
                <strong className="text-ink">A</strong>ds — engineered and run by one senior team.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {acronym.map((a, i) => (
                <span
                  key={i}
                  className="bg-navy-950 font-display grid size-11 place-items-center rounded-xl text-lg font-bold text-orange-400"
                  title={a.word}
                >
                  {a.letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="section-y bg-surface-alt">
        <div className="container-page grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            {
              k: "Mission",
              t: "To give every ambitious company a senior product and growth team that owns outcomes — not just deliverables.",
            },
            {
              k: "Vision",
              t: "To be the most trusted software and growth partner to come out of Pakistan, known for craft, candour and results.",
            },
          ].map((m, i) => (
            <BlurFade key={m.k} delay={i * 0.08}>
              <div
                className={`h-full rounded-[28px] p-10 ${i === 0 ? "bg-navy-950 text-white" : "border-line border bg-white"}`}
              >
                <p className={`eyebrow ${i === 0 ? "!text-orange-400" : ""}`}>{m.k}</p>
                <p
                  className={`mt-5 font-serif text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-snug ${i === 0 ? "text-white" : "text-navy-950"}`}
                >
                  {m.t}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Values"
            title={
              <>
                What we <em>stand</em> for.
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <BlurFade key={v.title} delay={i * 0.05} className="h-full">
                <MagicCard className="h-full rounded-3xl">
                  <div className="group p-7">
                    <span className="grid size-12 place-items-center rounded-2xl bg-orange-50 text-orange-700 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon name={v.icon} className="size-5" />
                    </span>
                    <h3 className="mt-6 text-lg font-bold">{v.title}</h3>
                    <p className="text-body mt-2 leading-relaxed">{v.text}</p>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our journey"
            title={
              <>
                Eight years of <em>shipping</em>.
              </>
            }
          />
          <TracingBeam className="mx-auto mt-14 max-w-3xl">
            <ol className="grid gap-10">
              {timeline.map((t, i) => (
                <BlurFade as="li" key={t.year} delay={0.04 * i} className="relative pl-14 md:pl-0">
                  <span
                    aria-hidden
                    className="absolute top-2 left-[19px] size-3 -translate-x-1/2 rounded-full border-2 border-white bg-orange-500 shadow-[0_0_0_4px_rgb(249_115_22/0.18)] md:left-1/2"
                  />
                  <div className="md:grid md:grid-cols-2 md:gap-16">
                    <p
                      className={`font-display text-navy-950 text-4xl font-bold tracking-[-0.04em] md:text-right ${i % 2 ? "md:order-2 md:text-left" : ""}`}
                    >
                      {t.year}
                    </p>
                    <div className={i % 2 ? "md:order-1 md:text-right" : ""}>
                      <h3 className="mt-2 text-lg font-bold md:mt-1">{t.title}</h3>
                      <p className="text-body mt-1 leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </ol>
          </TracingBeam>
        </div>
      </section>

      {/* Team */}
      <section className="section-y bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Leadership"
            title={
              <>
                The people <em>behind</em> the work.
              </>
            }
          />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m, i) => (
              <BlurFade key={m.name} delay={i * 0.05}>
                <article className="group border-line bg-surface-subtle relative overflow-hidden rounded-[28px] border">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="from-navy-950/90 via-navy-950/10 absolute inset-0 bg-gradient-to-t to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="font-display text-xl font-bold">{m.name}</p>
                    <p className="text-sm text-orange-400">{m.role}</p>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-white/80">{m.bio}</p>
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-white hover:text-orange-400"
                        >
                          <BrandIcon name="linkedin" className="size-4" /> LinkedIn
                          <span className="sr-only"> profile of {m.name}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      {/* Awards */}
      <section className="border-line bg-surface-alt border-y py-16">
        <p className="container-page text-muted-ink mb-8 text-center text-sm font-medium">
          Awards, partnerships & certifications
        </p>
        <div className="[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <Marquee className="[--duration:40s]" repeat={2}>
            {awards.map((a) => (
              <div
                key={a.title}
                className="border-line flex min-w-64 items-center gap-4 rounded-2xl border bg-white px-5 py-4 shadow-[var(--shadow-soft)]"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-700">
                  <Award className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-navy-950 text-sm font-bold">{a.title}</p>
                  <p className="text-muted-ink text-xs">
                    {a.org} · {a.year}
                  </p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      <FinalCta
        title="Want to build with us?"
        text="Tell us about your product and goals — we will reply within one business day with next steps."
      />
    </>
  );
}
