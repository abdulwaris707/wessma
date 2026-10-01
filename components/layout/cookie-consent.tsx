"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

const KEY = "wessmaa:cookie-consent";

/** Cookie consent banner (shadcn Card + Buttons). Choice persists in localStorage. */
/** Re-open the banner from anywhere (e.g. footer "Cookie settings"). */
export function openCookieSettings() {
  window.dispatchEvent(new Event("wessmaa:cookie-settings"));
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(!localStorage.getItem(KEY)), 1400);
    const open = () => setShow(true);
    window.addEventListener("wessmaa:cookie-settings", open);
    return () => {
      clearTimeout(t);
      window.removeEventListener("wessmaa:cookie-settings", open);
    };
  }, []);
  const choose = (v: "all" | "essential") => {
    localStorage.setItem(KEY, v);
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="border-line fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-md rounded-3xl border bg-white p-5 shadow-[var(--shadow-float)] sm:inset-x-auto sm:bottom-5 sm:left-5"
        >
          <div className="flex gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-700">
              <Cookie className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-ink text-base font-semibold">We value your privacy</p>
              <p className="text-muted-ink mt-1 text-sm leading-relaxed">
                We use cookies to improve your experience and measure performance. Read our{" "}
                <Link
                  href="/cookie-policy"
                  className="text-navy-800 underline underline-offset-2 hover:text-orange-700"
                >
                  cookie policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2 sm:pl-14">
            <Button size="sm" onClick={() => choose("all")} className="flex-1 sm:flex-none">
              Accept all
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => choose("essential")}
              className="flex-1 sm:flex-none"
            >
              Essential only
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
