import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/blog";
import { formatDate, cn } from "@/lib/utils";

/** Blog post card (grid + related posts). */
export function PostCard({
  post,
  featured = false,
  className,
}: {
  post: PostMeta;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group border-line hover:border-navy-800/15 flex h-full flex-col overflow-hidden rounded-[28px] border bg-white transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        featured && "lg:grid lg:grid-cols-2",
        className,
      )}
    >
      <div
        className={cn(
          "bg-surface-subtle relative overflow-hidden",
          featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[420px]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={
            featured
              ? "(min-width:1024px) 600px, 100vw"
              : "(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="text-navy-950 absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
          {post.category}
        </span>
      </div>
      <div
        className={cn("flex flex-1 flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-12")}
      >
        {featured && <p className="eyebrow mb-4">Featured article</p>}
        <h3
          className={cn(
            "font-display text-navy-950 group-hover:text-navy-800 font-bold tracking-[-0.03em] transition-colors",
            featured ? "text-h2" : "text-xl leading-snug",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "text-body mt-3 leading-relaxed",
            !featured && "line-clamp-2 text-[0.9375rem]",
          )}
        >
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <div className="flex items-center gap-3">
            <Image
              src={post.author.avatar}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full object-cover object-top"
            />
            <div className="text-sm">
              <p className="text-ink font-semibold">{post.author.name}</p>
              <p className="text-muted-ink flex items-center gap-1.5 text-xs">
                {formatDate(post.date)} · <Clock className="size-3" aria-hidden />{" "}
                {post.readingTime} min read
              </p>
            </div>
          </div>
          <span className="bg-surface-alt text-navy-800 group-hover:text-navy-950 grid size-10 shrink-0 place-items-center rounded-full transition-colors group-hover:bg-orange-500">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
