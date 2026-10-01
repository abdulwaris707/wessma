import Image from "next/image";
import { featuredQuote, testimonials } from "@/content/company";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DotPattern } from "@/components/magicui/dot-pattern";

/** Featured quote + two rows of infinite moving testimonial cards. */
export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section className="section-y bg-surface-alt relative overflow-hidden">
      <div className="container-page">
        <SectionHeading
          eyebrow="Client love"
          title={
            <>
              Partners who <em>keep</em> coming back.
            </>
          }
          subtitle={`${siteConfig.rating.score}/5 average from ${siteConfig.rating.reviews} verified reviews on ${siteConfig.rating.source}. 78% of our revenue comes from returning clients.`}
        />

        <BlurFade delay={0.1} className="relative mx-auto mt-14 max-w-5xl">
          <figure className="border-line relative overflow-hidden rounded-[32px] border bg-white p-8 sm:p-12">
            <DotPattern className="[mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]" />
            <BorderBeam size={300} duration={12} />
            <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <span aria-hidden className="font-serif text-7xl leading-none text-orange-500">
                  “
                </span>
                <blockquote className="text-navy-950 -mt-6 max-w-[34ch] font-serif text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-[1.25]">
                  {featuredQuote.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <Image
                    src={featuredQuote.avatar}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover object-top ring-4 ring-white"
                  />
                  <div>
                    <p className="text-ink font-semibold">{featuredQuote.name}</p>
                    <p className="text-muted-ink text-sm">{featuredQuote.role}</p>
                  </div>
                </figcaption>
              </div>
              <div className="border-line rounded-2xl border bg-white p-6 shadow-[var(--shadow-soft)] md:w-56">
                <p className="font-display text-gradient-brand text-5xl font-bold tracking-[-0.05em]">
                  {featuredQuote.metric.value}
                </p>
                <p className="text-muted-ink mt-2 text-sm">{featuredQuote.metric.label}</p>
              </div>
            </div>
          </figure>
        </BlurFade>
      </div>

      <div className="mt-14 grid gap-4">
        <InfiniteMovingCards duration="70s">
          {testimonials
            .slice(0, half)
            .concat(testimonials.slice(half))
            .map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
        </InfiniteMovingCards>
        <InfiniteMovingCards duration="80s" reverse className="hidden md:block">
          {testimonials
            .slice(half)
            .concat(testimonials.slice(0, half))
            .map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
        </InfiniteMovingCards>
      </div>
    </section>
  );
}
