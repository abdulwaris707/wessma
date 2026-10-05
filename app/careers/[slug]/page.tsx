import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Banknote, Briefcase, Check, Clock, MapPin } from "lucide-react";
import { benefits, getJob, jobs } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Icon } from "@/components/shared/icon";
import { CTAButton } from "@/components/shared/cta-button";
import { ApplicationForm } from "@/components/forms/application-form";

export const dynamicParams = false;
export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) return {};
  return buildMetadata({
    title: `${j.title} — Careers`,
    description: j.summary,
    path: `/careers/${j.slug}`,
  });
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const meta = [
    { icon: MapPin, k: "Location", v: job.location },
    { icon: Briefcase, k: "Type", v: job.type },
    { icon: Clock, k: "Experience", v: job.experience },
    { icon: Banknote, k: "Salary", v: job.salary },
  ];
  const blocks = [
    { t: "What you'll do", items: job.responsibilities },
    { t: "What you'll bring", items: job.requirements },
    { t: "Nice to have", items: job.niceToHave },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.summary,
          employmentType: job.type.toUpperCase().replace("-", "_"),
          hiringOrganization: {
            "@type": "Organization",
            name: siteConfig.name,
            sameAs: siteConfig.url,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Islamabad",
              addressCountry: "PK",
            },
          },
          datePosted: "2026-09-01",
        }}
      />
      <PageHero
        breadcrumbs={[
          { label: "Careers", href: "/careers" },
          { label: job.title, href: `/careers/${job.slug}` },
        ]}
        eyebrow={job.department}
        title={job.title}
        subtitle={job.summary}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <CTAButton href="#apply">Apply now</CTAButton>
          <Link
            href="/careers#open-roles"
            className="text-navy-800 inline-flex min-h-12 items-center gap-2 px-3 text-sm font-semibold hover:text-orange-700"
          >
            <ArrowLeft className="size-4" aria-hidden /> All roles
          </Link>
        </div>
      </PageHero>

      <section className="bg-white pb-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="grid gap-12 lg:col-span-8">
            {blocks.map((b) => (
              <div key={b.t}>
                <h2 className="text-h3 font-bold">{b.t}</h2>
                <ul className="mt-6 grid gap-3">
                  {b.items.map((i) => (
                    <li key={i} className="text-body flex gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-700">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="text-h3 font-bold">Benefits</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div
                    key={b.title}
                    className="border-line bg-surface-alt flex items-center gap-3 rounded-2xl border p-4"
                  >
                    <Icon name={b.icon} className="size-5 text-orange-500" />
                    <span className="text-ink text-sm font-medium">{b.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="border-line bg-surface-alt sticky top-28 rounded-3xl border p-7">
              <dl className="grid gap-5">
                {meta.map((m) => (
                  <div key={m.k} className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-orange-600 shadow-[var(--shadow-soft)]">
                      <m.icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <dt className="text-muted-ink text-xs">{m.k}</dt>
                      <dd className="text-ink font-semibold">{m.v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <div className="border-line mt-7 border-t pt-7">
                <CTAButton href="#apply" size="default" className="w-full [&>span]:w-full">
                  Apply for this role
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="apply" className="section-y bg-surface-alt scroll-mt-24">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">Apply</p>
          <h2 className="text-h2 mt-4 font-bold">Apply for {job.title}</h2>
          <div className="border-line mt-10 rounded-[28px] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10">
            <ApplicationForm defaultRole={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}
