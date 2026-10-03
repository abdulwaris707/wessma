import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { WorkGrid } from "@/components/sections/work-grid";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Case studies from Wessmaa: fintech, healthcare, e-commerce, edtech, logistics and real estate products — with the results to prove it.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Work", href: "/work" }]}
        eyebrow="Our work"
        title={
          <>
            Products that <em>moved</em> the numbers.
          </>
        }
        subtitle="A selection of platforms, apps and growth programmes we have designed, built and scaled for ambitious companies."
      />
      <section className="bg-white pb-24">
        <div className="container-page">
          <WorkGrid />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
