import { getCategories, getPostMetas } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { BlurFade } from "@/components/magicui/blur-fade";
import { PostCard } from "@/components/blog/post-card";
import { BlogIndex } from "@/components/blog/blog-index";
import { NewsletterForm } from "@/components/shared/newsletter-form";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical writing on product, engineering, SEO, AI automation, social and paid ads from the Wessmaa team.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPostMetas();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
        eyebrow="Insights"
        title={
          <>
            Notes on building and <em>growing</em>.
          </>
        }
        subtitle="Field-tested playbooks on product, engineering, SEO, automation and ads — written by the people doing the work."
      >
        <div className="mx-auto max-w-md">
          <NewsletterForm tone="light" />
        </div>
      </PageHero>
      <section className="bg-white pb-16">
        <div className="container-page">
          <BlurFade>
            <PostCard post={featured} featured />
          </BlurFade>
        </div>
      </section>
      <section className="bg-surface-alt py-16 lg:py-24">
        <div className="container-page">
          <BlogIndex posts={rest} categories={getCategories()} />
        </div>
      </section>
    </>
  );
}
