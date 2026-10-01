import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** Wessmaa logo — uses the brand mark image with a wordmark. */
export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-2.5 rounded-lg", className)}
    >
      <span
        className={cn(
          "inline-grid place-items-center",
          tone === "light" && "size-11 rounded-xl bg-white shadow-[var(--shadow-soft)]",
        )}
      >
        <Image
          src="/logo-mark.png"
          alt=""
          width={403}
          height={440}
          priority
          className={cn(
            "w-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:rotate-[-8deg]",
            tone === "light" ? "h-7" : "h-9",
          )}
        />
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-display text-[1.375rem] font-bold tracking-[-0.04em]",
            tone === "dark" ? "text-navy-950" : "text-white",
          )}
        >
          wessmaa
        </span>
      )}
    </Link>
  );
}
