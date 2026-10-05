import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { jobs } from "@/content/company";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/solutions",
    "/work",
    "/about",
    "/careers",
    "/contact",
    "/quote",
    "/faq",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];
  return [
    ...staticRoutes.map((r) => ({
      url: `${siteConfig.url}${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${siteConfig.url}/services/${s.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...caseStudies.map((c) => ({
      url: `${siteConfig.url}/work/${c.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...jobs.map((j) => ({
      url: `${siteConfig.url}/careers/${j.slug}`,
      lastModified: now,
      priority: 0.5,
    })),
  ];
}
