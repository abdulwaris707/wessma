"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { submitForm } from "@/lib/forms";
import { cn } from "@/lib/utils";

const schema = z.object({ email: z.email("Please enter a valid email address") });
type Values = z.infer<typeof schema>;

/** Newsletter signup form. */
export function NewsletterForm({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = async (values: Values) => {
    try {
      await submitForm("newsletter", values);
      setDone(true);
      form.reset();
      toast.success("You're subscribed", {
        description: "One practical email a month. No spam, ever.",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const err = form.formState.errors.email?.message;
  const dark = tone === "dark";
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className={cn("w-full", className)}>
      <label htmlFor={`newsletter-${tone}`} className="sr-only">
        Email address
      </label>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full border p-1.5 transition-[border-color,box-shadow] focus-within:border-orange-500 focus-within:shadow-[0_0_0_4px_rgb(249_115_22/0.15)]",
          dark
            ? "border-white/15 bg-white/[0.06]"
            : "border-line bg-white shadow-[var(--shadow-soft)]",
        )}
      >
        <input
          id={`newsletter-${tone}`}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={!!err}
          {...form.register("email")}
          className={cn(
            "h-10 min-w-0 flex-1 bg-transparent px-3.5 text-sm outline-none focus-visible:outline-none",
            dark ? "text-white placeholder:text-white/60" : "text-ink placeholder:text-muted-ink",
          )}
        />
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="group text-navy-950 inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-orange-500 px-4 text-sm font-semibold transition-colors hover:bg-orange-400 disabled:opacity-70"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : done ? (
            <Check className="size-4" />
          ) : (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          )}
          <span>{done ? "Subscribed" : "Subscribe"}</span>
        </button>
      </div>
      {err && (
        <p
          role="alert"
          className={cn("mt-2 px-4 text-xs", dark ? "text-orange-400" : "text-red-600")}
        >
          {err}
        </p>
      )}
    </form>
  );
}
