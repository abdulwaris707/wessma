import { NumberTicker } from "@/components/magicui/number-ticker";
import { cn } from "@/lib/utils";

/** Animated statistic: big number + label + detail. */
export function StatCounter({
  value,
  prefix,
  suffix,
  decimals = 0,
  label,
  detail,
  tone = "dark",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  detail?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <p
        className={cn(
          "font-display text-[clamp(2.5rem,1.8rem+2.4vw,3.75rem)] leading-none font-bold tracking-[-0.045em]",
          tone === "dark" ? "text-navy-950" : "text-white",
        )}
      >
        {prefix}
        <NumberTicker value={value} decimals={decimals} />
        <span className="text-orange-500">{suffix}</span>
      </p>
      <p className={cn("mt-3 font-semibold", tone === "dark" ? "text-ink" : "text-white")}>
        {label}
      </p>
      {detail && (
        <p className={cn("mt-1 text-sm", tone === "dark" ? "text-muted-ink" : "text-white/60")}>
          {detail}
        </p>
      )}
    </div>
  );
}
