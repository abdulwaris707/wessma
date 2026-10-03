import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Build per-page metadata with consistent Open Graph + Twitter cards. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — Software & Growth Studio`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "SoftwareCompany", "ProfessionalService"],
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon-512.png`,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: "PK",
  },
  sameAs: siteConfig.social.map((s) => s.href),
  areaServed: "Worldwide",
};

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
