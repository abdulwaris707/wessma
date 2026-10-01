"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer bg-line data-[state=checked]:bg-navy-800 inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-300",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="block size-6 translate-x-0.5 rounded-full bg-white shadow-[var(--shadow-soft)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=checked]:translate-x-[1.35rem]" />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
