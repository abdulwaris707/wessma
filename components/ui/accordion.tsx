"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-line data-[state=open]:border-navy-800/20 rounded-2xl border bg-white px-5 transition-[box-shadow,border-color] duration-300 data-[state=open]:shadow-[var(--shadow-soft)] sm:px-6",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group font-display text-ink hover:text-navy-800 flex flex-1 items-center justify-between gap-6 py-5 text-left text-base font-semibold tracking-tight transition-colors sm:text-lg",
        className,
      )}
      {...props}
    >
      {children}
      <span className="border-line bg-surface-alt text-navy-800 grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-orange-500/40 group-data-[state=open]:rotate-45 group-data-[state=open]:border-orange-500 group-data-[state=open]:bg-orange-500 group-data-[state=open]:text-white">
        <Plus className="size-4" aria-hidden />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="text-body overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-[accordion-down_300ms_cubic-bezier(0.22,1,0.36,1)]"
    {...props}
  >
    <div className={cn("max-w-[65ch] pb-6 leading-relaxed", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";
