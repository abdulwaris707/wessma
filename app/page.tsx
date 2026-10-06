import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/hero";
import { MissionPillars } from "@/components/sections/home/mission-pillars";
import { ServicesBento } from "@/components/sections/home/services-bento";
import { WhyWessmaa } from "@/components/sections/home/why-wessmaa";
import { Process } from "@/components/sections/home/process";
import { FeaturedCaseStudies } from "@/components/sections/home/case-studies";
import { Industries } from "@/components/sections/home/industries";
import { EngagementModels } from "@/components/sections/home/engagement-models";
import { FinalCta } from "@/components/sections/final-cta";


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
      <MissionPillars />
      <ServicesBento />
      <FeaturedCaseStudies />
      <Process eyebrow="The WESSMAA Digital Growth Journey" />
      <WhyWessmaa />
      <TechStack />
      <Industries />
      <EngagementModels />
      <FinalCta tone="alt" />
    </>
  );
}

