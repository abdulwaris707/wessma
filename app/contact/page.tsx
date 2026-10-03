import { CheckCircle2, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { BlurFade } from "@/components/magicui/blur-fade";

export const metadata = buildMetadata({
  title: "Let's Talk",
  description: "Tell Wessmaa about your goals and we will help you find the right next step.",
  path: "/contact",
});

const expectations = [
  "Share the goals, context and challenges that matter most.",
  "We will review your request carefully before recommending a next step.",
  "Start with a clear, practical conversation — no pressure or obligation.",
];

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Let's Talk", href: "/contact" }]}
        eyebrow="Let's Talk"
        title={
          <>
            Have a project <em>in mind?</em>
          </>
        }
        subtitle="Tell us a little about your goals. We’ll review your request and get back to you with the right next step."
      />

      <section className="bg-white pb-24">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <BlurFade className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">How it works</p>
              <h2 className="text-h2 mt-4 max-w-xl font-bold">
                A thoughtful start to the right work.
              </h2>
              <p className="text-body mt-5 max-w-lg leading-relaxed">
                A little context helps us understand where you are today and what would make the
                biggest difference next.
              </p>
              <ul className="mt-8 grid gap-4">
                {expectations.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-600" aria-hidden />
                    <span className="text-body leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-line mt-10 grid gap-3 border-t pt-6 text-sm">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-body inline-flex items-center gap-3 transition-colors hover:text-orange-700"
                >
                  <Mail className="size-4 text-orange-600" aria-hidden /> {contact.email}
                </a>
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-body inline-flex items-start gap-3 transition-colors hover:text-orange-700"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-orange-600" aria-hidden />
                  <span>
                    {contact.address.street}, {contact.address.city}
                  </span>
                </a>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.08} className="lg:col-span-7">
            <div className="border-line relative rounded-[28px] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10">
              <div
                aria-hidden
                className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
              />
              <p className="text-ink font-display text-xl font-bold tracking-tight">
                Tell us about your project
              </p>
              <p className="text-body mt-2 text-sm">
                The more detail you share, the more useful our next step can be.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
