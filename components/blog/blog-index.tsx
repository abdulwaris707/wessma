"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { PostCard } from "./post-card";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PER_PAGE = 6;

/** Client-side search, category filter and pagination for the blog. */
export function BlogIndex({ posts, categories }: { posts: PostMeta[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!term || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(term)),
    );
  }, [posts, q, cat]);
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1"
        >
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setPage(1);
              }}
              className="relative inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium"
            >
              {cat === c ? (
                <motion.span
                  layoutId="blog-cat"
                  className="bg-navy-950 absolute inset-0 rounded-full"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              ) : (
                <span className="border-line absolute inset-0 rounded-full border bg-white" />
              )}
              <span className={cn("relative", cat === c ? "text-white" : "text-body")}>{c}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search articles</span>
          <Search
            className="text-muted-ink pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
            aria-hidden
          />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search articles"
            className="border-line text-ink placeholder:text-muted-ink h-12 w-full rounded-full border bg-white pr-4 pl-11 text-[0.9375rem] transition-[border-color,box-shadow] outline-none focus-visible:border-orange-500 focus-visible:shadow-[0_0_0_4px_rgb(249_115_22/0.12)]"
          />
        </label>
      </div>

      <p className="text-muted-ink mt-6 text-sm" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      <motion.div layout className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <PostCard post={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="border-line mt-2 rounded-3xl border border-dashed p-12 text-center">
          <p className="font-display text-ink text-lg font-semibold">
            No articles found for “{q}”.
          </p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setCat("All");
            }}
            className="text-navy-800 mt-3 min-h-11 text-sm font-semibold hover:text-orange-700"
          >
            Clear search
          </button>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
            className="border-line text-ink grid size-11 place-items-center rounded-full border bg-white disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className={cn(
                "grid size-11 place-items-center rounded-full text-sm font-semibold",
                n === current
                  ? "bg-navy-950 text-white"
                  : "border-line text-ink hover:border-navy-800/30 border bg-white",
              )}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={current === pages}
            onClick={() => setPage(current + 1)}
            className="border-line text-ink grid size-11 place-items-center rounded-full border bg-white disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
