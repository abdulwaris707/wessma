import Link from "next/link";
import type { ComponentProps } from "react";
import { Lightbulb } from "lucide-react";

/** Custom renderers for MDX content. */
export const mdxComponents = {
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noreferrer" {...props} />
    ),
  Callout: ({
    title = "Key takeaway",
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) => (
    <aside className="not-prose my-8 flex gap-4 rounded-2xl border border-orange-500/20 bg-orange-50 p-5">
      <Lightbulb className="mt-0.5 size-5 shrink-0 text-orange-700" aria-hidden />
      <div>
        <p className="font-display text-navy-950 font-bold">{title}</p>
        <div className="text-body mt-1 text-[0.9375rem] leading-relaxed">{children}</div>
      </div>
    </aside>
  ),
};
