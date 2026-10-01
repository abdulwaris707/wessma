import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { cn } from "@/lib/utils";

/**
 * CTAButton — the one place CTAs are composed.
 * variant="primary": orange Shimmer Button + magnetic hover + arrow slide.
 */
type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "inverse" | "inverse-outline";
  size?: "sm" | "default" | "lg";
  magnetic?: boolean;
  arrow?: boolean;
  className?: string;
};

function Arrow() {
  return (
    <span aria-hidden className="relative inline-flex size-4 overflow-hidden">
      <ArrowRight className="absolute size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-4 group-hover/shimmer:translate-x-4" />
      <ArrowRight className="absolute size-4 -translate-x-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0 group-hover/shimmer:translate-x-0" />
    </span>
  );
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  magnetic = false,
  arrow = true,
  className,
}: CTAButtonProps) {
  const inner =
    variant === "primary" ? (
      <Link href={href} className={cn("rounded-full", className)}>
        <ShimmerButton size={size}>
          {children}
          {arrow && <Arrow />}
        </ShimmerButton>
      </Link>
    ) : (
      <Button
        asChild
        size={size}
        variant={variant === "secondary" ? "outline" : variant === "dark" ? "default" : variant}
        className={className}
      >
        <Link href={href}>
          {children}
          {arrow && <Arrow />}
        </Link>
      </Button>
    );
  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
