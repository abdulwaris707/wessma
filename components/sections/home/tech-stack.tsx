import Image from "next/image";
import { techStack } from "@/config/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BrandIcon } from "@/components/shared/brand-icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function Orb({ name, size = "md" }: { name: string; size?: "md" | "sm" }) {
  return (
    <span
      className={`border-line grid place-items-center rounded-full border bg-white shadow-[var(--shadow-lift)] ${size === "md" ? "size-14" : "size-11"}`}
      title={name}
    >
      <BrandIcon name={name} colored className={size === "md" ? "size-6" : "size-5"} />
    </span>
  );
}

/** Orbiting Circles tech showcase + grouped stack list. */
export function TechStack() {
  return (
    <section className="section-y bg-surface-alt relative overflow-hidden">
      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={techStack.eyebrow}
            title={techStack.title}
            subtitle={techStack.subtitle}
          />
          <div className="mt-10 grid gap-5">
            {techStack.groups.map((g, i) => (
              <BlurFade
                key={g.label}
                delay={i * 0.05}
                className="border-line grid grid-cols-1 gap-3 border-t pt-5 sm:grid-cols-[160px_1fr] sm:items-center"
              >
                <p className="text-ink text-sm font-semibold">{g.label}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <Tooltip key={t}>
                      <TooltipTrigger asChild>
                        <span
                          tabIndex={0}
                          className="border-line text-body hover:text-navy-950 inline-flex min-h-9 items-center gap-2 rounded-full border bg-white px-3 text-sm transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-orange-500/40"
                        >
                          <BrandIcon name={t} colored className="size-4" />
                          {t}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{`${t} — production experience`}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
        <BlurFade
          delay={0.1}
          className="relative mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center"
        >
          <div
            aria-hidden
            className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14),transparent_70%)]"
          />
          <div className="border-line relative z-10 grid size-24 place-items-center rounded-3xl border bg-white shadow-[var(--shadow-float)] sm:size-28">
            <Image
              src="/logo-mark.png"
              alt="Wessmaa"
              width={403}
              height={440}
              className="h-14 w-auto sm:h-16"
            />
          </div>
          <div className="absolute inset-0 scale-[0.62] sm:scale-100">
            <OrbitingCircles radius={130} duration={28} iconSize={56}>
              {["React", "Next.js", "Node.js", "Python", "TypeScript"].map((n) => (
                <Orb key={n} name={n} />
              ))}
            </OrbitingCircles>
            <OrbitingCircles radius={225} duration={42} reverse iconSize={44}>
              {["Flutter", "AWS", "PostgreSQL", "Docker", "Figma", "Google Ads", "Meta", "n8n"].map(
                (n) => (
                  <Orb key={n} name={n} size="sm" />
                ),
              )}
            </OrbitingCircles>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
