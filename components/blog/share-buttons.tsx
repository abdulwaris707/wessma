"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BrandIcon } from "@/components/shared/brand-icon";

/** Share to X, LinkedIn, Facebook, or copy the link. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    {
      name: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    {
      name: "facebook",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };
  const cls =
    "grid size-11 place-items-center rounded-full border border-line bg-white text-navy-800 transition-colors hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700";
  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={l.label}
          className={cls}
        >
          <BrandIcon name={l.name} className="size-4" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={cls}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
