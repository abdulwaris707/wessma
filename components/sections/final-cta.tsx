import { CalendarDays, Clock, ShieldCheck } from "lucide-react";
import { ctas, finalCta } from "@/config/site";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { CTAButton } from "@/components/shared/cta-button";
import { BlurFade } from "@/components/magicui/blur-fade";

/** Deep navy final CTA band with background beams. */
export function FinalCta({
  title = finalCta.title,
  text = finalCta.text,
  tone = "white",
}: {
  title?: string;
  text?: string;
  tone?: "white" | "alt";
}) {
  return (
    <section
      className={`px-3 pb-3 sm:px-4 sm:pb-4 ${tone === "alt" ? "bg-surface-alt" : "bg-white"}`}
    >
      <div className="bg-navy-950 relative isolate overflow-hidden rounded-[32px] px-6 py-24 text-center sm:py-28 lg:py-32">
        <BackgroundBeams tone="dark" />
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -z-10 h-72 w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/25 blur-[120px]"
        />
        <div
          aria-hidden
          className="bg-navy-600/40 absolute bottom-0 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 translate-y-1/2 rounded-full blur-[120px]"
        />
        <div className="relative mx-auto max-w-4xl">
          <BlurFade>
            <p className="eyebrow !text-orange-400">{finalCta.eyebrow}</p>
          </BlurFade>
          <BlurFade delay={0.06}>
            <h2 className="text-display mt-5 font-bold !text-white">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <em className="font-serif font-normal text-orange-400">
                {title.split(" ").slice(-1)}
              </em>
            </h2>
          </BlurFade>
          <BlurFade delay={0.12}>
            <p className="text-lead mx-auto mt-6 max-w-[56ch] text-white/70">{text}</p>
          </BlurFade>
          <BlurFade
            delay={0.18}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CTAButton href={ctas.primary.href} magnetic>
              {ctas.primary.label}
            </CTAButton>
            <CTAButton href={ctas.book.href} variant="inverse-outline" arrow={false}>
              <CalendarDays className="size-4" aria-hidden /> {ctas.book.label}
            </CTAButton>
          </BlurFade>
          <BlurFade
            delay={0.24}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/65"
          >
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-orange-400" aria-hidden /> Reply within 1 business day
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-orange-400" aria-hidden /> NDA on request
            </span>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
