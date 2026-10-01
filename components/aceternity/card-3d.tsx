"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";
import { useFinePointer } from "@/hooks/use-media";
import { cn } from "@/lib/utils";

/**
 * Aceternity — 3D Card Effect.
 * Subtle pointer-driven tilt; disabled on touch devices and for reduced motion.
 */
export function Card3D({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          if (!fine || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={fine ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined}
        className={cn("will-change-transform motion-reduce:!transform-none", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
