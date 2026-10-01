import type { ReactNode } from "react";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

/**
 * Aceternity — Infinite Moving Cards.
 * Built on the Magic UI Marquee with edge fade masks.
 */
export function InfiniteMovingCards({
  children,
  reverse,
  className,
  duration = "60s",
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  duration?: string;
}) {
  return (
    <div
      className={cn(
        "relative [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
        className,
      )}
    >
      <Marquee
        reverse={reverse}
        repeat={2}
        className="[--gap:1.25rem]"
        style={{ ["--duration" as string]: duration }}
      >
        {children}
      </Marquee>
    </div>
  );
}
