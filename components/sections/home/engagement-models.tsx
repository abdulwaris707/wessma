import { Check } from "lucide-react";
import { engagementModels } from "@/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { CTAButton } from "@/components/shared/cta-button";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

/** Engagement models / pricing preview. */
export function EngagementModels() {
  return (
    <section className="section-y relative bg-white">
      <div className="container-page">
        <SectionHeading
          eyebrow="Engagement models"
          title={
            <>
              Flexible ways to work <em>together</em>.
            </>
          }
          subtitle="Pick the model that fits your stage. Switch as you grow — no penalties, no lock-in."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {engagementModels.map((m, i) => (
            <BlurFade key={m.name} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[28px] border p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 sm:p-8",
                  m.featured
                    ? "border-navy-950 bg-navy-950 text-white shadow-[var(--shadow-float)]"
                    : "border-line bg-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
                )}
              >
                {m.featured && (
                  <BorderBeam size={240} duration={8} colorFrom="#f97316" colorTo="#ff8a3d" />
                )}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl",
                      m.featured ? "bg-white/10 text-orange-400" : "bg-orange-50 text-orange-700",
                    )}
                  >
                    <Icon name={m.icon} className="size-5" />
                  </span>
                  {m.featured && (
                    <span className="text-navy-950 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold">
                      Most chosen
                    </span>
                  )}
                </div>
                <h3 className={cn("text-h3 mt-6 font-bold", m.featured && "!text-white")}>
                  {m.name}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm font-medium",
                    m.featured ? "text-orange-400" : "text-orange-700",
                  )}
                >
                  {m.bestFor}
                </p>
                <p
                  className={cn("mt-4 leading-relaxed", m.featured ? "text-white/75" : "text-body")}
                >
                  {m.text}
                </p>
                <ul className="mt-6 grid gap-3">
                  {m.points.map((p) => (
                    <li
                      key={p}
                      className={cn(
                        "flex items-start gap-2.5 text-[0.9375rem]",
                        m.featured ? "text-white/90" : "text-ink",
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          m.featured ? "text-orange-400" : "text-orange-500",
                        )}
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <div
                  className={cn(
                    "mt-auto flex items-center justify-between gap-4 border-t pt-6",
                    m.featured ? "border-white/10" : "border-line",
                  )}
                  style={{ marginTop: "2rem" }}
                >
                  <p
                    className={cn(
                      "font-display text-lg font-bold tracking-tight",
                      m.featured ? "text-white" : "text-navy-950",
                    )}
                  >
                    {m.from}
                  </p>
                  <CTAButton href="/quote" size="sm" variant={m.featured ? "primary" : "secondary"}>
                    Get a quote
                  </CTAButton>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
        <BlurFade delay={0.2} className="mt-10 text-center">
          <p className="text-body">
            Need a detailed breakdown?{" "}
            <a
              href="/pricing"
              className="text-navy-800 font-semibold underline decoration-orange-500/50 underline-offset-4 hover:text-orange-700"
            >
              See full pricing
            </a>
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
