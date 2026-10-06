"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { pricingTiers } from "@/content/company";
import { BorderBeam } from "@/components/magicui/border-beam";
import { CTAButton } from "@/components/shared/cta-button";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Three pricing tiers with a monthly / per-project toggle. */
export function PricingTiers() {
  const [mode, setMode] = useState<"monthly" | "project">("project");
  const fmt = (n: number) => `PKR ${n.toLocaleString("en-PK")}`;
  return (
    <div>
      <div className="flex justify-center">
        <div
          role="radiogroup"
          aria-label="Billing"
          className="border-line relative inline-flex rounded-full border bg-white p-1 shadow-[var(--shadow-soft)]"
        >
          {(["project", "monthly"] as const).map((m) => (
            <button
              key={m}
              role="radio"
              aria-checked={mode === m}
              type="button"
              onClick={() => setMode(m)}
              className="relative inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium"
            >
              {mode === m && (
                <motion.span
                  layoutId="billing-pill"
                  className="bg-navy-950 absolute inset-0 rounded-full"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              <span
                className={cn(
                  "relative transition-colors",
                  mode === m ? "text-white" : "text-body",
                )}
              >
                {m === "project" ? "Per project" : "Monthly retainer"}
              </span>
              {m === "monthly" && (
                <span
                  className={cn(
                    "relative rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold",
                    mode === m ? "text-navy-950 bg-orange-500" : "bg-orange-50 text-orange-700",
                  )}
                >
                  Save 15%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        {pricingTiers.map((t) => {
          const price = mode === "monthly" ? t.monthly : t.project;
          return (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-[28px] border p-8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1",
                t.popular
                  ? "border-navy-950 bg-navy-950 text-white shadow-[var(--shadow-float)] lg:-my-4 lg:py-12"
                  : "border-line bg-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
              )}
            >
              {t.popular && (
                <BorderBeam size={260} duration={8} colorFrom="#f97316" colorTo="#ffffff" />
              )}
              <div className="flex items-center justify-between">
                <h3 className={cn("font-display text-xl font-bold", t.popular && "!text-white")}>
                  {t.name}
                </h3>
                {t.popular && (
                  <span className="text-navy-950 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold">
                    Most popular
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-3 min-h-12 text-[0.9375rem] leading-relaxed",
                  t.popular ? "text-white/70" : "text-body",
                )}
              >
                {t.description}
              </p>
              <div className="mt-8 flex h-16 items-end gap-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${t.name}-${mode}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={cn(
                      "font-display text-5xl leading-none font-bold tracking-[-0.05em]",
                      t.popular ? "text-white" : "text-navy-950",
                    )}
                  >
                    {price ? fmt(price) : "Contact us"}
                  </motion.p>
                </AnimatePresence>
                {price && (
                  <span
                    className={cn("pb-1 text-sm", t.popular ? "text-white/60" : "text-muted-ink")}
                  >
                    {mode === "monthly" ? "/ month" : "starting from"}
                  </span>
                )}
              </div>
              <div className="mt-8">
                <CTAButton
                  href={t.name === "Custom" ? "/contact" : "/quote"}
                  variant={t.popular ? "primary" : "secondary"}
                  size="default"
                  className="w-full [&>span]:w-full"
                >
                  {t.cta}
                </CTAButton>
              </div>
              <ul
                className={cn(
                  "mt-8 grid gap-3 border-t pt-8",
                  t.popular ? "border-white/10" : "border-line",
                )}
              >
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-start gap-2.5 text-[0.9375rem]",
                      t.popular ? "text-white/90" : "text-ink",
                    )}
                  >
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        t.popular ? "text-orange-400" : "text-orange-500",
                      )}
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="text-muted-ink mt-6 text-center text-sm">
        Final scope and quote are tailored to your project requirements.
      </p>
    </div>
  );
}
