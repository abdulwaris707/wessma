import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

/** Max-width 1280px page container with fluid gutters. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}

/** Section wrapper with consistent vertical rhythm. */
export function Section({
  children,
  className,
  id,
  tone = "white",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "alt" | "navy";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn(
        "section-y relative",
        tone === "alt" && "bg-surface-alt",
        tone === "navy" && "bg-navy-950 text-white",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
