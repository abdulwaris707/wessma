import { Check, Minus } from "lucide-react";
import { faqCategories, pricingComparison } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { PricingTiers } from "@/components/sections/pricing-tiers";
import { SectionHeading } from "@/components/shared/section-heading";
import { EngagementModels } from "@/components/sections/home/engagement-models";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { CTAButton } from "@/components/shared/cta-button";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for websites, software, apps and growth retainers. Starter, Growth and Enterprise plans from Wessmaa.",
  path: "/pricing",
});

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto size-5 text-orange-500" aria-label="Included" />;
  if (v === false)
    return <Minus className="mx-auto size-4 text-slate-300" aria-label="Not included" />;
  return <span className="text-ink text-sm font-medium">{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Pricing", href: "/pricing" }]}
        eyebrow="Pricing"
        title={
          <>
            Transparent pricing. <em>Serious</em> results.
          </>
        }
        subtitle="Choose a starting point — every proposal is tailored after a free discovery call, with a fixed scope and no hidden fees."
      />
      <section className="bg-white pb-24">
        <div className="container-page">
          <PricingTiers />
        </div>
      </section>

      {/* Comparison */}
      <section className="section-y bg-surface-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Compare plans"
            title={
              <>
                Every detail, <em>side</em> by side.
              </>
            }
          />
          <div
            className="border-line mt-12 overflow-x-auto rounded-3xl border bg-white shadow-[var(--shadow-soft)]"
            data-lenis-prevent
          >
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Plan comparison</caption>
              <thead>
                <tr className="border-line border-b">
                  <th scope="col" className="text-muted-ink w-2/5 p-5 text-sm font-semibold">
                    Features
                  </th>
                  {pricingComparison.columns.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className={`font-display p-5 text-center text-base font-bold ${c === "Growth" ? "text-navy-950 bg-orange-50/60" : "text-navy-950"}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              {pricingComparison.groups.map((g) => (
                <tbody key={g.label}>
                  <tr>
                    <th
                      colSpan={4}
                      scope="colgroup"
                      className="bg-surface-alt px-5 py-3 text-xs font-semibold tracking-[0.12em] text-orange-700 uppercase"
                    >
                      {g.label}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr
                      key={r.label}
                      className="border-line hover:bg-surface-alt/60 border-t transition-colors"
                    >
                      <th scope="row" className="text-ink p-5 text-[0.9375rem] font-medium">
                        {r.label}
                      </th>
                      {r.values.map((v, i) => (
                        <td
                          key={i}
                          className={`p-5 text-center ${i === 1 ? "bg-orange-50/40" : ""}`}
                        >
                          <Cell v={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <EngagementModels />

      {/* Custom quote */}
      <section className="bg-white pb-24">
        <div className="container-page">
          <div className="border-line bg-surface-alt relative isolate overflow-hidden rounded-[32px] border px-6 py-16 text-center sm:px-12">
            <BackgroundBeams />
            <p className="eyebrow">Custom quote</p>
            <h2 className="text-h2 mx-auto mt-4 max-w-2xl font-bold">
              Have something bigger in mind?
            </h2>
            <p className="text-body mx-auto mt-4 max-w-xl">
              Complex platforms, multi-market growth programmes or dedicated squads — get a tailored
              proposal within 48 hours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton href="/quote" magnetic>
                Get a custom quote
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" arrow={false}>
                Let&apos;s Talk
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={faqCategories.find((c) => c.id === "pricing")!.items} tone="alt" />
      <FinalCta tone="alt" />
    </>
  );
}
