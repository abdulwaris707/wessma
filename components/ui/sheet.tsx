"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/** shadcn Sheet (Radix Dialog) — used for the full-screen mobile menu. */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="bg-navy-950/20 fixed inset-0 z-[60] backdrop-blur-sm data-[state=open]:animate-[fade-in_200ms_ease-out]" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-0 z-[70] flex flex-col bg-white data-[state=open]:animate-[sheet-in_450ms_cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";
