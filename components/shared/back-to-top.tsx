"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/components/providers/smooth-scroll";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/75 transition-colors hover:border-orange-400 hover:text-white"
    >
      Back to top
      <ArrowUp
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  );
}
