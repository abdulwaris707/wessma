import { faqCategories } from "@/content/company";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { FaqBrowser } from "@/components/sections/faq-browser";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers about working with Wessmaa: pricing, process, timelines, ownership, technology and support.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqCategories.flatMap((c) => c.items))} />
      <PageHero
        breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
        eyebrow="Help centre"
        title={
          <>
            Everything you need <em>to know</em>.
          </>
        }
        subtitle="Straight answers about pricing, process, ownership and support. Still curious? Our team is one message away."
      />
      <section className="bg-surface-alt py-16 lg:py-24">
        <div className="container-page">
          <FaqBrowser categories={faqCategories} />
        </div>
      </section>
      <FinalCta
        tone="alt"
        title="Still have questions?"
        text="Talk to a senior strategist — we reply to every enquiry within one business day."
      />
    </>
  );
}
