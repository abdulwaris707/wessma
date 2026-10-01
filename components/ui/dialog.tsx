"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="bg-navy-950/40 fixed inset-0 z-[80] backdrop-blur-sm data-[state=open]:animate-[fade-in_200ms_ease-out]" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "border-line fixed top-1/2 left-1/2 z-[90] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border bg-white p-6 shadow-[var(--shadow-float)] data-[state=open]:animate-[dialog-in_350ms_cubic-bezier(0.22,1,0.36,1)] sm:p-8",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="text-muted-ink hover:bg-surface-subtle hover:text-ink absolute top-4 right-4 grid size-10 place-items-center rounded-full transition-colors">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";
export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-ink text-2xl font-bold tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";
export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-muted-ink mt-2 text-sm", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
