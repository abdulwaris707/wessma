import { CookieSettingsButton } from "./cookie-settings-button";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footer, siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/logo";
import { BrandIcon } from "@/components/shared/brand-icon";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { BackToTop } from "@/components/shared/back-to-top";

/** Deep-navy footer: mission, newsletter, link columns, contact, socials. */
export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-navy-950 relative overflow-hidden text-white">
      <div
        aria-hidden
        className="bg-navy-600/20 absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <div className="container-page relative">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">{footer.mission}</p>
            <div className="mt-8 max-w-md">
              <p className="font-display mb-3 text-base font-semibold text-white">
                Get one practical growth email a month
              </p>
              <NewsletterForm tone="dark" />
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 grid gap-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-9 items-center text-sm text-white/65 transition-colors duration-200 hover:text-orange-400"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 gap-6 border-b border-white/10 py-8 text-sm text-white/70 md:grid-cols-3">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-3 transition-colors hover:text-white"
          >
            <Mail className="size-4 text-orange-400" aria-hidden /> {contact.email}
          </a>
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-3 transition-colors hover:text-white"
          >
            <Phone className="size-4 text-orange-400" aria-hidden /> {contact.phone}
          </a>
          <p className="inline-flex items-center gap-3">
            <MapPin className="size-4 shrink-0 text-orange-400" aria-hidden />
            {contact.address.city}, {contact.address.region}, {contact.address.country}
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
            <span>
              © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
            </span>
            <CookieSettingsButton className="min-h-11 underline-offset-4 transition-colors hover:text-orange-400 hover:underline" />
          </p>
          <div className="flex items-center gap-1">
            {siteConfig.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-11 place-items-center rounded-full text-white/70 transition-[color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-orange-400"
              >
                <BrandIcon name={s.icon} className="size-[18px]" />
              </a>
            ))}
          </div>
          <BackToTop />
        </div>

        {/* Giant wordmark */}
        <div aria-hidden className="pointer-events-none -mb-[3vw] overflow-hidden select-none">
          <p className="font-display bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0))] bg-clip-text text-center text-[20vw] leading-[0.8] font-bold tracking-[-0.06em] text-transparent lg:text-[16rem]">
            wessmaa
          </p>
        </div>
      </div>
    </footer>
  );
}
