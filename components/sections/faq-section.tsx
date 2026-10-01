import type { FaqItem } from "@/content/company";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlurFade } from "@/components/magicui/blur-fade";
import { CTAButton } from "@/components/shared/cta-button";
import { JsonLd } from "@/components/shared/json-ld";
import { faqJsonLd } from "@/lib/seo";

/** FAQ section: sticky heading on desktop + shadcn Accordion. Emits FAQPage JSON-LD. */
export function FaqSection({
  items,
  title,
  tone = "white",
}: {
  items: FaqItem[];
  title?: React.ReactNode;
  tone?: "white" | "alt";
}) {
  return (
    <section className={`section-y relative ${tone === "alt" ? "bg-surface-alt" : "bg-white"}`}>
      <JsonLd data={faqJsonLd(items)} />
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={
                title ?? (
                  <>
                    Questions, <em>answered</em>.
                  </>
                )
              }
              subtitle="Can't find what you are looking for? Our team replies within one business day."
            />
            <BlurFade delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/contact" variant="secondary" size="default">
                Ask a question
              </CTAButton>
            </BlurFade>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible defaultValue="item-0" className="grid gap-3">
            {items.map((f, i) => (
              <BlurFade key={f.q} delay={i * 0.03}>
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              </BlurFade>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
