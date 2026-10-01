import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

/** Eyebrow + title + subtitle. The title supports inline <em> for the serif accent. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <BlurFade>
          <p
            className={cn(
              "eyebrow inline-flex items-center gap-2",
              tone === "light" && "!text-orange-400",
            )}
          >
            <span aria-hidden className="h-px w-5 bg-current opacity-60" />
            {eyebrow}
          </p>
        </BlurFade>
      )}
      <BlurFade delay={0.06}>
        <Tag
          className={cn(
            Tag === "h1" ? "text-h1" : "text-h2",
            "font-bold [&_em]:font-serif [&_em]:font-normal [&_em]:tracking-[-0.01em]",
            tone === "light" ? "!text-white [&_em]:text-orange-400" : "[&_em]:text-orange-700",
          )}
        >
          {title}
        </Tag>
      </BlurFade>
      {subtitle && (
        <BlurFade delay={0.12}>
          <p
            className={cn(
              "text-lead max-w-[62ch]",
              tone === "light" ? "text-white/70" : "text-body",
            )}
          >
            {subtitle}
          </p>
        </BlurFade>
      )}
    </div>
  );
}
