import Image from "next/image";
import { Star } from "lucide-react";
import type { Testimonial } from "@/content/company";
import { cn } from "@/lib/utils";

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure
      className={cn(
        "border-line hover:border-navy-800/20 flex w-[340px] shrink-0 flex-col rounded-3xl border bg-white p-6 shadow-[var(--shadow-soft)] transition-[box-shadow,border-color] duration-300 hover:shadow-[var(--shadow-lift)] sm:w-[380px]",
        className,
      )}
    >
      <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-orange-500 text-orange-500" aria-hidden />
        ))}
      </div>
      <blockquote className="text-ink mt-4 flex-1 text-[0.9375rem] leading-relaxed">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Image
          src={t.avatar}
          alt=""
          width={44}
          height={44}
          className="size-11 rounded-full object-cover object-top"
        />
        <div>
          <p className="text-ink text-sm font-semibold">{t.name}</p>
          <p className="text-muted-ink text-xs">
            {t.role}, {t.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
