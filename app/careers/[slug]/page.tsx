import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Banknote, Briefcase, Check, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { CTAButton } from "@/components/shared/cta-button";
import { ApplicationForm } from "@/components/forms/application-form";
import { getPublishedJob } from "@/lib/db";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const job = await getPublishedJob((await params).slug);
  return job ? buildMetadata({ title: `${job.title} — Careers`, description: job.shortDescription, path: `/careers/${job.slug}` }) : {};
}
export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const job = await getPublishedJob((await params).slug); if (!job) notFound();
  const meta = [{ icon: MapPin, k: "Location", v: job.location }, { icon: Briefcase, k: "Type", v: job.employmentType }, ...(job.salaryOrCompensation ? [{ icon: Banknote, k: "Salary", v: job.salaryOrCompensation }] : [])];
  const blocks = [{ title: "About the role", items: [job.fullDescription] }, { title: "What you'll do", items: job.responsibilities }, { title: "What you'll bring", items: job.requirements }].filter((block) => block.items.length);
  const external = /^https?:\/\//.test(job.applicationEmailOrLink); const applyHref = external ? job.applicationEmailOrLink : job.applicationEmailOrLink.includes("@") ? `mailto:${job.applicationEmailOrLink}` : "#apply";
  return <><JsonLd data={{ "@context":"https://schema.org", "@type":"JobPosting", title:job.title, description:job.shortDescription, employmentType:job.employmentType.toUpperCase().replace("-","_"), hiringOrganization:{"@type":"Organization",name:siteConfig.name,sameAs:siteConfig.url}, jobLocation:{"@type":"Place",address:{"@type":"PostalAddress",addressLocality:job.location,addressCountry:"PK"}}, datePosted:job.createdAt }} /><PageHero breadcrumbs={[{label:"Careers",href:"/careers"},{label:job.title,href:`/careers/${job.slug}`}]} eyebrow={job.department} title={job.title} subtitle={job.shortDescription}><div className="flex flex-wrap justify-center gap-3"><CTAButton href={applyHref}>Apply now</CTAButton><Link href="/careers#open-roles" className="text-navy-800 inline-flex min-h-12 items-center gap-2 px-3 text-sm font-semibold hover:text-orange-700"><ArrowLeft className="size-4" aria-hidden /> All roles</Link></div></PageHero><section className="bg-white pb-24"><div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12"><div className="grid gap-12 lg:col-span-8">{blocks.map((block) => <div key={block.title}><h2 className="text-h3 font-bold">{block.title}</h2><ul className="mt-6 grid gap-3">{block.items.map((item) => <li key={item} className="text-body flex gap-3"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-700"><Check className="size-3.5" aria-hidden /></span><span className="whitespace-pre-wrap">{item}</span></li>)}</ul></div>)}{job.benefits.length > 0 && <div><h2 className="text-h3 font-bold">Benefits</h2><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">{job.benefits.map((benefit) => <div key={benefit} className="border-line bg-surface-alt rounded-2xl border p-4 text-sm font-medium text-ink">{benefit}</div>)}</div></div>}</div><aside className="lg:col-span-4"><div className="border-line bg-surface-alt sticky top-28 rounded-3xl border p-7"><dl className="grid gap-5">{meta.map((m) => <div key={m.k} className="flex gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-orange-600 shadow-[var(--shadow-soft)]"><m.icon className="size-4" aria-hidden /></span><div><dt className="text-muted-ink text-xs">{m.k}</dt><dd className="text-ink font-semibold">{m.v}</dd></div></div>)}</dl><div className="border-line mt-7 border-t pt-7"><CTAButton href={applyHref} className="w-full [&>span]:w-full">Apply for this role</CTAButton></div></div></aside></div></section>{!external && !job.applicationEmailOrLink.includes("@") && <section id="apply" className="section-y bg-surface-alt scroll-mt-24"><div className="container-page max-w-4xl"><p className="eyebrow">Apply</p><h2 className="text-h2 mt-4 font-bold">Apply for {job.title}</h2><div className="border-line mt-10 rounded-[28px] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10"><ApplicationForm defaultRole={job.title} /></div></div></section>}</>;
}
