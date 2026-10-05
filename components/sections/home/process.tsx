import { processSteps } from "@/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import { cn } from "@/lib/utils";

/** Process timeline with an Aceternity tracing beam. Alternates sides on desktop. */
export function Process({
  eyebrow = "How we work",
  compact = false,
}: {
  eyebrow?: string;
  compact?: boolean;
}) {
  return (
    <section className="section-y bg-surface-alt relative">
      <div className="container-page">
        <SectionHeading
          eyebrow={eyebrow}
          title={
            <>
              The WESSMAA <em>Digital Growth</em> Journey.
            </>
          }
          subtitle="A connected six-stage system: Discover, Build, Attract, Trust, Convert, and Improve — turning digital attention into compounding business results."
        />
        <TracingBeam className={cn("mx-auto mt-16 max-w-5xl", compact && "mt-12")}>
          <ol className="grid gap-10 md:gap-4">
            {processSteps.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={s.step}
                  className={cn("relative grid md:grid-cols-2 md:gap-16", i > 0 && "md:-mt-16")}
                >
                  {/* node */}
                  <span
                    aria-hidden
                    className="absolute top-6 left-[19px] z-10 grid size-3 -translate-x-1/2 place-items-center md:left-1/2"
                  >
                    <span className="size-3 rounded-full border-2 border-white bg-orange-500 shadow-[0_0_0_4px_rgb(249_115_22/0.18)]" />
                  </span>
                  <BlurFade
                    className={cn("pl-12 md:pl-0", right ? "md:col-start-2" : "md:text-right")}
                    delay={0.05}
                  >
                    <div
                      className={cn(
                        "group border-line hover:border-navy-800/20 rounded-3xl border bg-white p-6 shadow-[var(--shadow-soft)] transition-[box-shadow,border-color,transform] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-7",
                        !right && "md:ml-auto",
                      )}
                    >
                      <div
                        className={cn("flex items-center gap-3", !right && "md:flex-row-reverse")}
                      >
                        <span className="font-display text-sm font-bold text-orange-700">
                          {s.step}
                        </span>
                        <span className="bg-line h-px w-8" />
                        <span className="text-muted-ink text-xs font-medium tracking-wider uppercase">
                          {s.duration}
                        </span>
                      </div>
                      <h3 className="text-h3 mt-4 font-bold">{s.title}</h3>
                      <p className="text-body mt-3 leading-relaxed">{s.text}</p>
                      <div className={cn("mt-5 flex flex-wrap gap-2", !right && "md:justify-end")}>
                        {s.outputs.map((o) => (
                          <span
                            key={o}
                            className="border-line bg-surface-alt text-body rounded-full border px-3 py-1 text-xs font-medium"
                          >
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  </BlurFade>
                </li>
              );
            })}
          </ol>
        </TracingBeam>
      </div>
    </section>
  );
}
