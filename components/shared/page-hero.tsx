import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { JsonLd } from "./json-ld";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Inner-page hero with breadcrumbs, eyebrow, title, subtitle and optional actions. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  breadcrumbs = [],
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  breadcrumbs?: { label: string; href: string }[];
  align?: "center" | "left";
  className?: string;
}) {
  const crumbs = [{ label: "Home", href: "/" }, ...breadcrumbs];
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-36 pb-16 sm:pt-40 lg:pt-48 lg:pb-24",
        className,
      )}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${siteConfig.url}${c.href}`,
          })),
        }}
      />
      <GridPattern className="[mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]" />
      <div
        aria-hidden
        className="absolute -top-32 right-[-8%] -z-10 size-[32rem] rounded-full bg-orange-500/[0.10] blur-[120px]"
      />
      <div
        aria-hidden
        className="bg-navy-600/[0.09] absolute top-20 -left-[10%] -z-10 size-[28rem] rounded-full blur-[120px]"
      />
      <div
        className={cn(
          "container-page flex flex-col",
          align === "center" ? "items-center text-center" : "items-start",
        )}
      >
        {breadcrumbs.length > 0 && (
          <BlurFade>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="text-muted-ink flex flex-wrap items-center gap-1 text-sm">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="text-ink">
                        {c.label}
                      </span>
                    ) : (
                      <Link href={c.href} className="transition-colors hover:text-orange-700">
                        {c.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </BlurFade>
        )}
        {eyebrow && (
          <BlurFade>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-50 px-3 py-1.5">
              {eyebrow}
            </p>
          </BlurFade>
        )}
        <BlurFade delay={0.06}>
          <h1
            className={cn(
              "text-h1 mt-6 max-w-4xl font-bold tracking-[-0.04em] [&_em]:font-serif [&_em]:font-normal [&_em]:text-orange-700",
              align === "center" && "mx-auto",
            )}
          >
            {title}
          </h1>
        </BlurFade>
        {subtitle && (
          <BlurFade delay={0.12}>
            <p
              className={cn(
                "text-lead text-body mt-6 max-w-[62ch]",
                align === "center" && "mx-auto",
              )}
            >
              {subtitle}
            </p>
          </BlurFade>
        )}
        {children && (
          <BlurFade delay={0.18} className="mt-9 w-full">
            {children}
          </BlurFade>
        )}
      </div>
    </section>
  );
}
