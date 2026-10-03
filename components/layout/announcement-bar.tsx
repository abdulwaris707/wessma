"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "wessmaa:announcement:site-progress";

/** A compact, dismissible site-status notice above the navbar. */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(storageKey) === "dismissed") setVisible(false);
  }, []);

  if (!visible) return null;
  return (
    <div className="border-line relative z-50 border-b bg-surface-alt motion-safe:animate-[fade-in_300ms_var(--ease-premium)]">
      <div className="container-page relative flex min-h-11 items-center justify-center px-11">
        <p className="text-body inline-flex items-center gap-2.5 py-2 text-center text-[0.8125rem] leading-snug">
          <span
            aria-hidden
            className="size-2 shrink-0 rounded-full bg-orange-500 shadow-[0_0_0_4px_rgb(249_115_22/0.16)] motion-safe:animate-pulse"
          />
          Website currently under progress — we’re refining our digital experience.
        </p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(storageKey, "dismissed");
            setVisible(false);
          }}
          className="text-muted-ink hover:text-ink absolute right-2 grid size-9 place-items-center rounded-full transition-colors hover:bg-white sm:right-4"
          aria-label="Dismiss website status notice"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
