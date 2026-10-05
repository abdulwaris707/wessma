import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { MagicCard } from "@/components/magicui/magic-card";
import { Icon } from "./icon";
import { cn } from "@/lib/utils";

/** Reusable service card with Magic Card spotlight and arrow-slide link. */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <MagicCard className={cn("h-full rounded-3xl", className)}>
      <Link href={`/services/${service.slug}`} className="group flex h-full flex-col p-7">
        <div className="flex items-start justify-between">
          <span className="border-line bg-surface-alt text-navy-800 grid size-12 place-items-center rounded-2xl border transition-[color,background-color,border-color,transform] duration-500 group-hover:-rotate-6 group-hover:border-orange-500/30 group-hover:bg-orange-50 group-hover:text-orange-700">
            <Icon name={service.icon} className="size-5" />
          </span>
          <span className="border-line text-muted-ink rounded-full border px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wider uppercase">
            {service.group}
          </span>
        </div>
        <h3 className="text-h3 mt-8 font-bold">{service.title}</h3>
        {service.tagline && (
          <p className="mt-1 text-sm font-semibold text-orange-600">{service.tagline}</p>
        )}
        <p className="text-body mt-2 flex-1 leading-relaxed">{service.short}</p>
        <span className="text-navy-800 mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-orange-700">
          Learn more
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </Link>
    </MagicCard>
  );
}
