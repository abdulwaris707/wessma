import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/hero";
import { Acronym } from "@/components/sections/home/acronym";
import { ServicesBento } from "@/components/sections/home/services-bento";
import { WhyWessmaa } from "@/components/sections/home/why-wessmaa";
import { Process } from "@/components/sections/home/process";
import { FeaturedCaseStudies } from "@/components/sections/home/case-studies";
import { Industries } from "@/components/sections/home/industries";
import { EngagementModels } from "@/components/sections/home/engagement-models";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { homeFaqs } from "@/content/company";

// Heavier animated section is code-split
const TechStack = dynamic(
  () => import("@/components/sections/home/tech-stack").then((m) => m.TechStack),
  {
    loading: () => (
      <section aria-label="Loading technology section" className="section-y bg-surface-alt">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="h-72 rounded-3xl bg-slate-200/60" />
          <div className="aspect-square rounded-3xl bg-slate-200/60" />
        </div>
      </section>
    ),
  },
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <Acronym />
      <WhyWessmaa />
      <Process />
      <FeaturedCaseStudies />
      <TechStack />
      <Industries />
      <EngagementModels />
      <FaqSection items={homeFaqs} tone="alt" />
      <FinalCta tone="alt" />
    </>
  );
}
