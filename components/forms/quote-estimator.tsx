"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { estimator } from "@/content/estimator";
import { submitForm } from "@/lib/forms";
import { EASE } from "@/lib/motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/shared/icon";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ChoiceChip, Field } from "./field";
import { SuccessState } from "./success-state";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  company: z.string().optional(),
});
type Contact = z.infer<typeof contactSchema>;

const STEPS = ["Project", "Features", "Design", "Growth", "Timeline", "Details"];
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function AnimatedAmount({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 120, damping: 24 });
  const text = useTransform(spring, (n) => usd(Math.round(n / 100) * 100));
  useEffect(() => mv.set(value), [mv, value]);
  return <motion.span>{text}</motion.span>;
}

/** Six-step project estimator with a live, animated price range. */
export function QuoteEstimator() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [design, setDesign] = useState("custom");
  const [growth, setGrowth] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("standard");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string>();
  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "" },
  });

  const est = useMemo(() => {
    const t = estimator.projectTypes.find((p) => p.id === type);
    const f = estimator.features
      .filter((x) => features.includes(x.id))
      .reduce((a, b) => a + b.price, 0);
    const d = estimator.design.find((x) => x.id === design)?.multiplier ?? 1;
    const tl = estimator.timelines.find((x) => x.id === timeline)?.multiplier ?? 1;
    const build = ((t?.base ?? 0) + (t && t.base > 0 ? f : 0)) * d * tl;
    const monthly = estimator.growth
      .filter((g) => growth.includes(g.id))
      .reduce((a, b) => a + b.monthly, 0);
    return {
      low: build * 0.9,
      high: build * 1.2,
      monthly,
      weeks: t ? Math.round((6 + features.length * 1.2) * (timeline === "rush" ? 0.7 : 1)) : 0,
    };
  }, [type, features, design, growth, timeline]);

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  const next = () => {
    if (step === 0 && !type) return setErr("Choose a project type to continue");
    setErr(undefined);
    // Skip build-only steps for growth-only engagements
    if (step === 0 && type === "growth") return setStep(3);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => (s === 3 && type === "growth" ? 0 : Math.max(0, s - 1)));

  const onSubmit = async (c: Contact) => {
    try {
      await submitForm("quote", { ...c, type, features, design, growth, timeline, estimate: est });
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (done)
    return (
      <div className="border-line rounded-[28px] border bg-white p-8 shadow-[var(--shadow-lift)]">
        <SuccessState
          title="Your estimate is on its way"
          text={`We've sent a detailed breakdown to ${form.getValues("email")}. A strategist will follow up within one business day to refine the scope.`}
        >
          <Button
            variant="outline"
            onClick={() => {
              setDone(false);
              setStep(0);
              setType("");
              setFeatures([]);
              setGrowth([]);
              form.reset();
            }}
          >
            Start a new estimate
          </Button>
        </SuccessState>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="border-line rounded-[28px] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10 lg:col-span-8">
        <div className="flex items-center justify-between text-sm">
          <p className="text-ink font-semibold">
            Step {step + 1} of {STEPS.length}{" "}
            <span className="text-muted-ink font-normal">· {STEPS[step]}</span>
          </p>
          <p className="text-muted-ink">{Math.round(((step + 1) / STEPS.length) * 100)}%</p>
        </div>
        <Progress
          value={((step + 1) / STEPS.length) * 100}
          className="mt-3"
          aria-label="Estimator progress"
        />
        <ol className="mt-5 hidden gap-2 sm:flex" aria-hidden>
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium",
                i <= step ? "text-navy-950" : "text-muted-ink",
              )}
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full text-[10px]",
                  i < step
                    ? "text-navy-950 bg-orange-500"
                    : i === step
                      ? "bg-navy-950 text-white"
                      : "bg-surface-subtle",
                )}
              >
                {i < step ? <Check className="size-3" /> : i + 1}
              </span>
              {s}
              {i < STEPS.length - 1 && <span className="bg-line mx-1 h-px w-4" />}
            </li>
          ))}
        </ol>

        <div className="relative mt-8 min-h-[360px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {step === 0 && (
                <fieldset>
                  <legend className="font-display text-navy-950 text-2xl font-bold tracking-tight">
                    What are we building?
                  </legend>
                  <div role="radiogroup" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {estimator.projectTypes.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={type === p.id}
                        onClick={() => {
                          setType(p.id);
                          setErr(undefined);
                        }}
                        className={cn(
                          "flex items-start gap-4 rounded-2xl border p-4 text-left transition-[border-color,background-color,box-shadow]",
                          type === p.id
                            ? "border-orange-500 bg-orange-50 shadow-[0_0_0_4px_rgb(249_115_22/0.12)]"
                            : "border-line hover:border-navy-800/30 bg-white",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-11 shrink-0 place-items-center rounded-xl",
                            type === p.id
                              ? "text-navy-950 bg-orange-500"
                              : "bg-surface-alt text-navy-800",
                          )}
                        >
                          <Icon name={p.icon} className="size-5" />
                        </span>
                        <span>
                          <span className="text-ink block font-semibold">{p.label}</span>
                          <span className="text-muted-ink block text-sm">{p.text}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  {err && (
                    <p role="alert" className="mt-3 text-sm font-medium text-red-600">
                      {err}
                    </p>
                  )}
                </fieldset>
              )}
              {step === 1 && (
                <fieldset>
                  <legend className="font-display text-navy-950 text-2xl font-bold tracking-tight">
                    Which features do you need?
                  </legend>
                  <p className="text-muted-ink mt-2 text-sm">
                    Select all that apply — you can refine later.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {estimator.features.map((f) => (
                      <ChoiceChip
                        key={f.id}
                        role="checkbox"
                        selected={features.includes(f.id)}
                        onClick={() => toggle(features, setFeatures, f.id)}
                      >
                        <span className="flex-1">{f.label}</span>
                        <span className="text-muted-ink text-xs font-normal">+{usd(f.price)}</span>
                      </ChoiceChip>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 2 && (
                <fieldset>
                  <legend className="font-display text-navy-950 text-2xl font-bold tracking-tight">
                    How far should design go?
                  </legend>
                  <div role="radiogroup" className="mt-6 grid gap-3">
                    {estimator.design.map((d) => (
                      <ChoiceChip
                        key={d.id}
                        selected={design === d.id}
                        onClick={() => setDesign(d.id)}
                      >
                        <span className="flex-1">
                          <span className="block">{d.label}</span>
                          <span className="text-muted-ink block text-sm font-normal">{d.text}</span>
                        </span>
                      </ChoiceChip>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 3 && (
                <fieldset>
                  <legend className="font-display text-navy-950 text-2xl font-bold tracking-tight">
                    Want us to grow it too?
                  </legend>
                  <p className="text-muted-ink mt-2 text-sm">
                    Optional monthly growth services — the S, S, M, A and A in WESSMAA.
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {estimator.growth.map((g) => (
                      <ChoiceChip
                        key={g.id}
                        role="checkbox"
                        selected={growth.includes(g.id)}
                        onClick={() => toggle(growth, setGrowth, g.id)}
                      >
                        <span className="flex-1">{g.label}</span>
                        <span className="text-muted-ink text-xs font-normal">
                          {usd(g.monthly)}/mo
                        </span>
                      </ChoiceChip>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 4 && (
                <fieldset>
                  <legend className="font-display text-navy-950 text-2xl font-bold tracking-tight">
                    When do you need it?
                  </legend>
                  <div role="radiogroup" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {estimator.timelines.map((t) => (
                      <ChoiceChip
                        key={t.id}
                        selected={timeline === t.id}
                        onClick={() => setTimeline(t.id)}
                      >
                        <span>
                          <span className="block">{t.label}</span>
                          <span className="text-muted-ink block text-sm font-normal">{t.text}</span>
                        </span>
                      </ChoiceChip>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 5 && (
                <form
                  id="quote-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className="grid gap-5"
                >
                  <p className="font-display text-navy-950 text-2xl font-bold tracking-tight">
                    Where should we send your estimate?
                  </p>
                  <Field id="q-name" label="Full name" error={form.formState.errors.name?.message}>
                    <Input
                      id="q-name"
                      autoComplete="name"
                      aria-invalid={!!form.formState.errors.name}
                      {...form.register("name")}
                    />
                  </Field>
                  <Field
                    id="q-email"
                    label="Work email"
                    error={form.formState.errors.email?.message}
                  >
                    <Input
                      id="q-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!form.formState.errors.email}
                      {...form.register("email")}
                    />
                  </Field>
                  <Field id="q-company" label="Company" optional>
                    <Input
                      id="q-company"
                      autoComplete="organization"
                      {...form.register("company")}
                    />
                  </Field>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-line mt-8 flex items-center justify-between gap-4 border-t pt-6">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={back}>
              <ArrowLeft className="size-4" /> Back
            </Button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <Button type="button" size="lg" onClick={next}>
              Continue <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              form="quote-form"
              variant="accent"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />} Get my
              estimate
            </Button>
          )}
        </div>
      </div>

      <aside className="lg:col-span-4">
        <div
          className="bg-navy-950 relative overflow-hidden rounded-[28px] p-8 text-white lg:sticky lg:top-28"
          aria-live="polite"
        >
          <BorderBeam size={220} duration={9} colorFrom="#f97316" colorTo="#ffffff" />
          <div
            aria-hidden
            className="absolute -top-16 -right-16 size-56 rounded-full bg-orange-500/25 blur-3xl"
          />
          <p className="eyebrow relative !text-orange-400">Live estimate</p>
          {est.high > 0 ? (
            <p className="font-display relative mt-4 text-[2.25rem] leading-none font-bold tracking-[-0.04em]">
              <AnimatedAmount value={est.low} /> <span className="text-white/50">–</span>{" "}
              <AnimatedAmount value={est.high} />
            </p>
          ) : (
            <p className="font-display relative mt-4 text-3xl font-bold tracking-tight">
              {type === "growth" ? "Growth retainer" : "Pick a project"}
            </p>
          )}
          <p className="relative mt-2 text-sm text-white/70">
            One-off build, including design, QA and launch.
          </p>
          <dl className="relative mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Growth services</dt>
              <dd className="font-semibold">
                {est.monthly ? (
                  <>
                    <AnimatedAmount value={est.monthly} />
                    /mo
                  </>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Estimated timeline</dt>
              <dd className="font-semibold">{est.weeks ? `~${est.weeks} weeks` : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Features selected</dt>
              <dd className="font-semibold">{features.length}</dd>
            </div>
          </dl>
          <p className="relative mt-8 text-xs leading-relaxed text-white/60">
            Ballpark only. Your final fixed quote follows a free 30-minute discovery call.
          </p>
        </div>
      </aside>
    </div>
  );
}
