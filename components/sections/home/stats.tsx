import { stats } from "@/config/site";
import { BlurFade } from "@/components/magicui/blur-fade";
import { StatCounter } from "@/components/shared/stat-counter";

export function Stats() {
  return (
    <section aria-label="Wessmaa in numbers" className="relative bg-white py-20 lg:py-24">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <BlurFade key={s.label} delay={i * 0.08} className="relative lg:pl-8 lg:first:pl-0">
              {i > 0 && (
                <span
                  aria-hidden
                  className="bg-line absolute top-2 left-0 hidden h-16 w-px lg:block"
                />
              )}
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} detail={s.detail} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
