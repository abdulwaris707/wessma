import * as React from "react";
import { cn } from "@/lib/utils";

export const inputBase =
  "flex w-full rounded-xl border border-line bg-white px-4 text-[0.9375rem] text-ink shadow-[0_1px_2px_rgb(10_31_68/0.04)] transition-[border-color,box-shadow] duration-200 placeholder:text-muted-ink/80 hover:border-navy-800/30 focus-visible:border-orange-500 focus-visible:shadow-[0_0_0_4px_rgb(249_115_22/0.12)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input ref={ref} type={type} className={cn(inputBase, "h-12", className)} {...props} />
));
Input.displayName = "Input";
