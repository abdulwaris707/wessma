"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { ctas } from "@/config/site";
import { EASE } from "@/lib/motion";

/** Sticky "Let's Talk" pill on mobile for key pages, after the hero. */
const HIDE_ON = ["/contact", "/quote", "/careers/"];

export function StickyMobileCta() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));
  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-4 bottom-4 z-40 sm:hidden"
        >
          <Link
            href={ctas.talk.href}
            className="text-navy-950 flex h-13 items-center justify-center gap-2 rounded-full bg-orange-500 font-semibold shadow-[var(--shadow-glow-orange)]"
          >
            <MessageCircle className="size-4" aria-hidden />
            {ctas.talk.label}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
