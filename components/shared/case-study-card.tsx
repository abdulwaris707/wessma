import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/content/case-studies";
import { Card3D } from "@/components/aceternity/card-3d";
import { cn } from "@/lib/utils";

/** Case study card with 3D tilt, image zoom and headline metric. */
export function CaseStudyCard({
  study,
  size = "default",
  priority = false,
}: {
  study: CaseStudy;
  size?: "default" | "large";
  priority?: boolean;
}) {
  return (
    <Card3D max={4}>
      <Link
        href={`/work/${study.slug}`}
        className="group border-line block overflow-hidden rounded-[28px] border bg-white p-2 shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-float)]"
      >
        <div
          className={cn(
            "bg-surface-subtle relative overflow-hidden rounded-[22px]",
            size === "large" ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={study.image}
            alt={`${study.client} — ${study.title}`}
            fill
            priority={priority}
            sizes={
              size === "large"
                ? "(min-width:1024px) 60vw, 100vw"
                : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div className="from-navy-950/50 absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            <span className="glass text-navy-950 rounded-full border border-white/70 px-3 py-1 text-xs font-semibold">
              {study.industry}
            </span>
          </div>
          <div className="glass absolute bottom-4 left-4 rounded-2xl border border-white/70 px-4 py-3 shadow-[var(--shadow-lift)]">
            <p className="font-display text-navy-950 text-2xl leading-none font-bold tracking-tight">
              {study.headline.value}
            </p>
            <p className="text-body mt-1 max-w-[16rem] text-xs">{study.headline.label}</p>
          </div>
          <span className="text-navy-950 absolute top-4 right-4 grid size-11 translate-y-2 place-items-center rounded-full bg-orange-500 opacity-0 shadow-[var(--shadow-glow-orange)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-5" aria-hidden />
          </span>
        </div>
        <div className="p-4 pb-5 sm:p-5">
          <p className="text-muted-ink text-sm font-medium">
            {study.client} · {study.services.slice(0, 2).join(" · ")}
          </p>
          <h3
            className={cn(
              "group-hover:text-navy-800 mt-2 font-bold tracking-tight transition-colors duration-300",
              size === "large" ? "text-h3" : "text-xl",
            )}
          >
            {study.title}
          </h3>
        </div>
      </Link>
    </Card3D>
  );
}
