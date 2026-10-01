import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Accessible label + control + error wrapper used by every form. */
export function Field({
  id,
  label,
  error,
  hint,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label
        htmlFor={id}
        className="text-ink flex items-center justify-between text-sm font-medium"
      >
        {label}
        {optional && <span className="text-muted-ink text-xs font-normal">Optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-muted-ink text-xs">{hint}</p>
      ) : null}
    </div>
  );
}

/** Pill-style choice (radio/checkbox look) for multi-step forms. */
export function ChoiceChip({
  selected,
  onClick,
  children,
  role = "radio",
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  role?: "radio" | "checkbox";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-12 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[0.9375rem] font-medium transition-[border-color,background-color,box-shadow] duration-200",
        selected
          ? "text-navy-950 border-orange-500 bg-orange-50 shadow-[0_0_0_4px_rgb(249_115_22/0.12)]"
          : "border-line text-ink hover:border-navy-800/30 bg-white",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid size-5 shrink-0 place-items-center border-2 transition-colors",
          role === "radio" ? "rounded-full" : "rounded-md",
          selected ? "border-orange-500 bg-orange-500" : "border-slate-300",
        )}
      >
        {selected && (
          <span
            className={cn(
              "bg-white",
              role === "radio" ? "size-1.5 rounded-full" : "size-2 rounded-[2px]",
            )}
          />
        )}
      </span>
      {children}
    </button>
  );
}
