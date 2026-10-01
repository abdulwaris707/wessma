"use client";

import { Toaster as Sonner } from "sonner";

/** shadcn Sonner wrapper, themed to Wessmaa. */
export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !border !border-line !bg-white !text-ink !shadow-[var(--shadow-float)] !font-sans",
          description: "!text-muted-ink",
        },
      }}
    />
  );
}
