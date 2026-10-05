import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredServiceSlugs, getService } from "@/content/services";
import { MagicCard } from "@/components/magicui/magic-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTAButton } from "@/components/shared/cta-button";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import {
  AdsVisual,
  AutomationVisual,
  CodeVisual,
  DesignVisual,
  LighthouseVisual,
  PhoneVisual,
  SeoVisual,
  SocialVisual,
} from "./bento-visuals";

/** Magic UI Bento Grid of 8 core services, each with its own micro-interaction. */
const layout: Record<string, { span: string; visual: React.ReactNode }> = {
  "software-development": { span: "lg:col-span-2", visual: <CodeVisual /> },
  "ai-automation": { span: "lg:col-span-2 lg:row-span-2", visual: <AutomationVisual /> },
  "website-development": { span: "", visual: <LighthouseVisual /> },
  "mobile-app-development": { span: "", visual: <PhoneVisual /> },
  seo: { span: "", visual: <SeoVisual /> },
  "paid-ads": { span: "", visual: <AdsVisual /> },
  "ui-ux-design": { span: "", visual: <DesignVisual /> },
  "social-media": { span: "", visual: <SocialVisual /> },
};

export function ServicesBento() {
  const order = [
    "software-development",
    "ai-automation",
    "website-development",
    "mobile-app-development",
    "seo",
    "paid-ads",
    "ui-ux-design",
    "social-media",
  ];
  return (
    <section className="section-y relative bg-white" id="services">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Connected capabilities"
            title={
              <>
                Everything you need to build, launch and <em>grow</em>.
              </>
            }
            subtitle="The services are presented as connected capabilities, not unrelated service cards — working together as one unified digital growth system."
          />
          <BlurFade delay={0.15} className="shrink-0">
            <CTAButton href="/services" variant="secondary" size="default">
              All services
            </CTAButton>
          </BlurFade>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(300px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {order
            .filter((s) => featuredServiceSlugs.includes(s))
            .map((slug, i) => {
              const s = getService(slug)!;
              const l = layout[slug];
              const big = slug === "ai-automation";
              return (
                <BlurFade
                  key={slug}
                  delay={0.04 * i}
                  className={cn(
                    "h-full",
                    l.span,
                    slug === "software-development" && "md:col-span-2",
                    big && "md:col-span-2",
                  )}
                >
                  <MagicCard className="h-full rounded-3xl">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col overflow-hidden p-6 sm:p-7"
                    >
                      <div
                        className={cn(
                          "bg-surface-alt relative flex flex-1 items-center justify-center rounded-2xl p-5",
                          big ? "min-h-64" : "min-h-40",
                        )}
                      >
                        <div
                          aria-hidden
                          className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                        <div className="relative w-full">{l.visual}</div>
                      </div>
                      <div className="mt-6 flex items-start gap-3">
                        <span className="border-line text-navy-800 grid size-9 shrink-0 place-items-center rounded-xl border transition-colors duration-300 group-hover:border-orange-500/30 group-hover:text-orange-700">
                          <Icon name={s.icon} className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={cn("font-bold tracking-tight", big ? "text-h3" : "text-lg")}
                          >
                            {s.title}
                          </h3>
                          {s.tagline && (
                            <p className="mt-0.5 text-xs font-semibold text-orange-600">
                              {s.tagline}
                            </p>
                          )}
                          <p className="text-body mt-1.5 text-[0.9375rem] leading-relaxed">
                            {s.short}
                          </p>
                          <span className="text-navy-800 mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-orange-700">
                            Learn more
                            <ArrowRight
                              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                              aria-hidden
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </MagicCard>
                </BlurFade>
              );
            })}
        </div>
      </div>
    </section>
  );
}
