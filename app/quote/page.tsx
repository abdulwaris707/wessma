import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { QuoteEstimator } from "@/components/forms/quote-estimator";

export const metadata = buildMetadata({
  title: "Get a Quote",
  description:
    "Estimate the cost of your website, app, software or growth programme in under two minutes.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Get a quote", href: "/quote" }]}
        eyebrow="Project estimator"
        title={
          <>
            Get a ballpark in <em>two</em> minutes.
          </>
        }
        subtitle="Answer six quick questions and watch your estimate update live. No email needed until the end."
      />
      <section className="bg-white pb-24">
        <div className="container-page">
          <QuoteEstimator />
        </div>
      </section>
    </>
  );
}
