"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

/** Animated check + message shown after a successful submission. */
export function SuccessState({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center py-10 text-center"
      role="status"
    >
      <div className="relative grid size-24 place-items-center">
        <motion.span
          className="absolute inset-0 rounded-full bg-orange-500/15"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1.25, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        <svg viewBox="0 0 52 52" className="relative size-16" aria-hidden>
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            fill="#F97316"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
            style={{ originX: "50%", originY: "50%" }}
          />
          <motion.path
            d="M15 27l7 7 15-16"
            fill="none"
            stroke="#0A1F44"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          />
        </svg>
      </div>
      <h3 className="text-h3 mt-6 font-bold">{title}</h3>
      <p className="text-body mt-3 max-w-md">{text}</p>
      {children && <div className="mt-8">{children}</div>}
    </motion.div>
  );
}
