import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/shared/json-ld";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { Toc } from "@/components/blog/toc";
import { ShareButtons } from "@/components/blog/share-buttons";
import { PostCard } from "@/components/blog/post-card";
import { mdxComponents } from "@/components/blog/mdx-components";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const base = buildMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    image: p.cover,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: p.date,
      authors: [p.author.name],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const all = getAllPosts();
  const related = [
    ...all.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...all.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: `${siteConfig.url}${post.cover}`,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon-512.png` },
          },
          mainEntityOfPage: url,
        }}
      />
      <header className="relative isolate overflow-hidden pt-36 pb-12 sm:pt-40 lg:pt-44">
        <GridPattern className="[mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]" />
        <div
          aria-hidden
          className="absolute -top-32 right-[-8%] -z-10 size-[30rem] rounded-full bg-orange-500/[0.09] blur-[120px]"
        />
        <div className="container-page max-w-4xl">
          <BlurFade>
            <Link
              href="/blog"
              className="text-navy-800 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-orange-700"
            >
              <ArrowLeft className="size-4" aria-hidden /> All articles
            </Link>
          </BlurFade>
          <BlurFade delay={0.05}>
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="text-h1 mt-4 font-bold tracking-[-0.04em]">{post.title}</h1>
            <p className="text-lead text-body mt-5">{post.excerpt}</p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <div className="border-line mt-8 flex flex-wrap items-center justify-between gap-6 border-t pt-6">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover object-top"
                />
                <div>
                  <p className="text-ink font-semibold">{post.author.name}</p>
                  <p className="text-muted-ink flex items-center gap-1.5 text-sm">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
                    <Clock className="size-3.5" aria-hidden /> {post.readingTime} min read
                  </p>
                </div>
              </div>
              <ShareButtons url={url} title={post.title} />
            </div>
          </BlurFade>
        </div>
      </header>

      <div className="container-page max-w-6xl">
        <BlurFade
          delay={0.15}
          className="border-line bg-surface-subtle relative aspect-[16/8] overflow-hidden rounded-[28px] border"
        >
          <Image
            src={post.cover}
            alt=""
            fill
            priority
            sizes="(min-width:1152px) 1152px, 100vw"
            className="object-cover"
          />
        </BlurFade>
      </div>

      <section className="py-16 lg:py-20">
        <div className="container-page grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
          <article className="prose-wessmaa max-w-[70ch] min-w-0">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
            />

            {/* Author box */}
            <div className="not-prose border-line bg-surface-alt mt-16 flex flex-col gap-5 rounded-3xl border p-7 sm:flex-row sm:items-center">
              <Image
                src={post.author.avatar}
                alt=""
                width={80}
                height={80}
                className="size-20 shrink-0 rounded-2xl object-cover object-top"
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-orange-700 uppercase">
                  Written by
                </p>
                <p className="font-display text-navy-950 mt-1 text-lg font-bold">
                  {post.author.name}
                </p>
                <p className="text-muted-ink text-sm">{post.author.role}</p>
                <p className="text-body mt-2 text-[0.9375rem] leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-28 grid gap-8">
              <Toc headings={post.headings} />
              <div className="border-line border-t pt-6">
                <p className="text-muted-ink mb-3 text-xs font-semibold tracking-[0.12em] uppercase">
                  Share
                </p>
                <ShareButtons url={url} title={post.title} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white pb-20">
        <div className="container-page max-w-6xl">
          <div className="bg-navy-950 relative isolate overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="absolute -top-24 -right-20 -z-10 size-80 rounded-full bg-orange-500/25 blur-3xl"
            />
            <div
              aria-hidden
              className="bg-navy-600/40 absolute -bottom-32 -left-20 -z-10 size-80 rounded-full blur-3xl"
            />
            <p className="eyebrow !text-orange-400">Newsletter</p>
            <h2 className="text-h2 mx-auto mt-4 max-w-xl font-bold !text-white">
              One practical growth email a month.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/70">
              Playbooks like this one, straight to your inbox. No spam, unsubscribe anytime.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <NewsletterForm tone="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-surface-alt py-20">
        <div className="container-page">
          <h2 className="text-h2 font-bold">Keep reading</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
