import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { BrandIcon } from "@/components/shared/brand-icon";
import { BorderBeam } from "@/components/magicui/border-beam";
import { CTAButton } from "@/components/shared/cta-button";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to Wessmaa about your website, software, app or growth project. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  const c = siteConfig.contact;
  const details = [
    { icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { icon: Phone, label: "Phone", value: c.phone, href: c.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: c.whatsapp },
    {
      icon: MapPin,
      label: "Studio",
      value: `${c.address.street}, ${c.address.city}, ${c.address.region}`,
      href: "https://www.openstreetmap.org/?mlat=34.1688&mlon=73.2215#map=14/34.1688/73.2215",
    },
  ];
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <em>what&apos;s next</em>.
          </>
        }
        subtitle="Tell us where you want to be in 12 months. We will come back with a plan, a team and a realistic estimate."
      />
      <section className="bg-white pb-24">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="border-line relative overflow-hidden rounded-[28px] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10 lg:col-span-7">
            <BorderBeam size={240} duration={12} />
            <ContactForm />
          </div>
          <div className="grid gap-6 lg:col-span-5">
            <div className="bg-navy-950 rounded-[28px] p-8 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-orange-400">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-orange-500" />
                </span>
                Response-time promise
              </span>
              <p className="font-display mt-5 text-2xl font-bold tracking-tight">
                {c.responseTime}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/70">
                <Clock className="size-4" aria-hidden /> {c.hours}
              </p>
              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm text-white/70">Prefer to talk live?</p>
                <div className="mt-3">
                  <CTAButton href="/book" size="default">
                    Book a 30-min call
                  </CTAButton>
                </div>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {details.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group border-line bg-surface-alt flex items-center gap-4 rounded-2xl border p-4 transition-colors hover:border-orange-500/40 hover:bg-orange-50/50"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-orange-600 shadow-[var(--shadow-soft)]">
                      <d.icon className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="text-muted-ink block text-xs">{d.label}</span>
                      <span className="text-ink group-hover:text-navy-800 block truncate font-semibold">
                        {d.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {siteConfig.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="border-line text-navy-800 grid size-11 place-items-center rounded-full border bg-white transition-colors hover:border-orange-500 hover:text-orange-700"
                >
                  <BrandIcon name={s.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container-page mt-6">
          <div className="border-line bg-surface-subtle overflow-hidden rounded-[28px] border">
            <iframe
              title="Wessmaa studio location map"
              src={c.mapEmbed}
              loading="lazy"
              className="h-[380px] w-full contrast-[1.05] grayscale-[0.4]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
