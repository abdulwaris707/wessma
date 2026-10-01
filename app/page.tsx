import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/hero";
import { LogoCloud } from "@/components/sections/home/logo-cloud";
import { Stats } from "@/components/sections/home/stats";
import { Acronym } from "@/components/sections/home/acronym";
import { ServicesBento } from "@/components/sections/home/services-bento";
import { WhyWessmaa } from "@/components/sections/home/why-wessmaa";
import { Process } from "@/components/sections/home/process";
import { FeaturedCaseStudies } from "@/components/sections/home/case-studies";
import { Industries } from "@/components/sections/home/industries";
import { Testimonials } from "@/components/sections/home/testimonials";
import { EngagementModels } from "@/components/sections/home/engagement-models";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { homeFaqs } from "@/content/company";

// Heavier animated section is code-split
const TechStack = dynamic(() =>
  import("@/components/sections/home/tech-stack").then((m) => m.TechStack),
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <Stats />
      <ServicesBento />
      <Acronym />
      <WhyWessmaa />
      <Process />
      <FeaturedCaseStudies />
      <TechStack />
      <Industries />
      <Testimonials />
      <EngagementModels />
      <FaqSection items={homeFaqs} tone="alt" />
      <FinalCta tone="alt" />
    </>
  );
}
