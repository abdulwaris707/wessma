"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { submitForm } from "@/lib/forms";
import { acronym } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChoiceChip, Field } from "./field";
import { SuccessState } from "./success-state";
import { EASE } from "@/lib/motion";

const budgets = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];
const timelines = ["ASAP", "1 – 3 months", "3 – 6 months", "Flexible"];
const interests = [...acronym.map((a) => a.word), "Custom software", "Mobile app"];

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  company: z.string().optional(),
  interests: z.array(z.string()).min(1, "Pick at least one area"),
  budget: z.string().optional(),
  timeline: z.string().min(1, "Please choose a timeline"),
  message: z.string().min(20, "Tell us a little more (20+ characters)"),
});
type Values = z.infer<typeof schema>;

const steps: { title: string; fields: (keyof Values)[] }[] = [
  { title: "About you", fields: ["name", "email", "company"] },
  { title: "Your project", fields: ["interests", "budget", "timeline"] },
  { title: "The details", fields: ["message"] },
];

/** Three-step contact form with validation per step and a success animation. */
export function ContactForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interests: [],
      budget: "",
      timeline: "",
      message: "",
    },
  });
  const { errors } = form.formState;
  const v = form.watch();

  const next = async () => {
    const ok = await form.trigger(steps[step].fields);
    if (ok) {
      setDir(1);
      setStep((s) => s + 1);
    }
  };
  const back = () => {
    setDir(-1);
    setStep((s) => s - 1);
  };
  const onSubmit = async (values: Values) => {
    setSubmissionError(null);
    try {
      await submitForm("contact", values);
      setDone(true);
    } catch {
      const message = "We could not send your message. Please try again or email us directly.";
      setSubmissionError(message);
      toast.error(message);
    }
  };
  const toggle = (i: string) => {
    const cur = form.getValues("interests");
    form.setValue("interests", cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i], {
      shouldValidate: form.formState.isSubmitted || !!errors.interests,
    });
  };

  if (done)
    return (
      <SuccessState
        title={`Thanks, ${v.name.split(" ")[0] || "there"}.`}
        text="Your message has been received. We will review it and follow up with the right next step."
      >
        <Button
          variant="outline"
          onClick={() => {
            form.reset();
            setStep(0);
            setDone(false);
          }}
        >
          Send another message
        </Button>
      </SuccessState>
    );

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="flex items-center justify-between text-sm">
        <p className="text-ink font-semibold">
          Step {step + 1} of {steps.length}{" "}
          <span className="text-muted-ink font-normal">· {steps[step].title}</span>
        </p>
        <p className="text-muted-ink">{Math.round(((step + 1) / steps.length) * 100)}%</p>
      </div>
      <Progress
        value={((step + 1) / steps.length) * 100}
        className="mt-3"
        aria-label="Form progress"
      />

      <div className="relative mt-8 min-h-[340px] overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -32 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid gap-5"
          >
            {step === 0 && (
              <>
                <Field id="c-name" label="Full name" error={errors.name?.message}>
                  <Input
                    id="c-name"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    {...form.register("name")}
                  />
                </Field>
                <Field id="c-email" label="Work email" error={errors.email?.message}>
                  <Input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    {...form.register("email")}
                  />
                </Field>
                <Field id="c-company" label="Company / organisation" optional>
                  <Input
                    id="c-company"
                    autoComplete="organization"
                    placeholder="Company name"
                    {...form.register("company")}
                  />
                </Field>
              </>
            )}
            {step === 1 && (
              <>
                <fieldset>
                  <legend className="text-ink text-sm font-medium">Service interested in</legend>
                  <div role="group" className="mt-3 flex flex-wrap gap-2">
                    {interests.map((i) => {
                      const on = v.interests.includes(i);
                      return (
                        <button
                          key={i}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggle(i)}
                          className={`min-h-11 rounded-full border px-4 text-sm font-medium transition-colors ${on ? "text-navy-950 border-orange-500 bg-orange-50" : "border-line text-body hover:border-navy-800/30 bg-white"}`}
                        >
                          {i}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests && (
                    <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                      {errors.interests.message}
                    </p>
                  )}
                </fieldset>
                <fieldset>
                  <legend className="text-ink text-sm font-medium">
                    Estimated budget <span className="text-muted-ink font-normal">(optional)</span>
                  </legend>
                  <div role="radiogroup" className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {budgets.map((b) => (
                      <ChoiceChip
                        key={b}
                        selected={v.budget === b}
                        onClick={() => form.setValue("budget", b, { shouldValidate: true })}
                      >
                        {b}
                      </ChoiceChip>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-ink text-sm font-medium">Timeline</legend>
                  <div role="radiogroup" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {timelines.map((t) => (
                      <ChoiceChip
                        key={t}
                        selected={v.timeline === t}
                        onClick={() => form.setValue("timeline", t, { shouldValidate: true })}
                      >
                        {t}
                      </ChoiceChip>
                    ))}
                  </div>
                  {errors.timeline && (
                    <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                      {errors.timeline.message}
                    </p>
                  )}
                </fieldset>
              </>
            )}
            {step === 2 && (
              <>
                <Field
                  id="c-message"
                  label="Project details"
                  hint="Goals, current situation, links — anything that helps."
                  error={errors.message?.message}
                >
                  <Textarea
                    id="c-message"
                    rows={7}
                    placeholder="What are you hoping to build, improve, or launch?"
                    aria-invalid={!!errors.message}
                    {...form.register("message")}
                  />
                </Field>
                <div className="border-line bg-surface-alt text-body rounded-2xl border p-4 text-sm">
                  <p className="text-ink font-semibold">Summary</p>
                  <p className="mt-1">
                    {v.name} · {v.email}
                    {v.company ? ` · ${v.company}` : ""}
                  </p>
                  <p>
                    {v.interests.join(", ")} · {v.budget} · {v.timeline}
                  </p>
                </div>
              </>
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
          <span className="text-muted-ink text-xs">Your details stay private. NDA on request.</span>
        )}
        {step < steps.length - 1 ? (
          <Button type="button" variant="default" size="lg" onClick={next}>
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" variant="accent" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />} Send
            message
          </Button>
        )}
      </div>
      {submissionError && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-600">
          {submissionError}
        </p>
      )}
    </form>
  );
}
