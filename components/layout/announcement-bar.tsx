"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { announcement } from "@/config/site";

/** Dismissible announcement pill above the navbar. Dismissal persists in localStorage. */
export function AnnouncementBar() {
  const key = `wessmaa:announcement:${announcement.id}`;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(key) === "dismissed") setVisible(false);
  }, [key]);

  if (!visible) return null;
  return (
    <div className="border-line bg-surface-alt relative z-50 border-b">
      <div className="container-page flex h-11 items-center justify-center gap-3">
        <Link
          href={announcement.href}
          className="group text-body hover:text-navy-950 inline-flex min-w-0 items-center gap-2.5 rounded-full py-1 text-[0.8125rem] transition-colors"
        >
          <span className="text-navy-950 shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wider uppercase">
            {announcement.label}
          </span>
          <span className="truncate">{announcement.text}</span>
          <ArrowRight
            className="size-3.5 shrink-0 text-orange-700 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(key, "dismissed");
            setVisible(false);
          }}
          className="text-muted-ink hover:text-ink absolute right-2 grid size-9 place-items-center rounded-full transition-colors hover:bg-white sm:right-4"
          aria-label="Dismiss announcement"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
