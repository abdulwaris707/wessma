import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Spotlight } from "@/components/aceternity/spotlight";
import { CTAButton } from "@/components/shared/cta-button";

export const metadata = { title: "Page not found", robots: { index: false } };

const links = [
  { label: "Services", href: "/services", text: "What we build and grow" },
  { label: "Work", href: "/work", text: "Case studies and results" },
  { label: "Careers", href: "/careers", text: "Opportunities to contribute" },
  { label: "Contact", href: "/contact", text: "Talk to our team" },
];

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-36 pb-20">
      <GridPattern className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <Spotlight className="-top-40 left-0 md:left-60" fill="#F97316" />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-orange-500/[0.08] blur-[120px]"
      />
      <div className="container-page flex flex-col items-center text-center">
        <div className="relative">
          <p
            aria-hidden
            className="text-gradient-brand font-display text-[clamp(8rem,5rem+18vw,18rem)] leading-none font-bold tracking-[-0.08em] select-none"
          >
            4<span className="inline-block w-[0.72em]" />4
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-float">
              <div className="border-line grid size-[clamp(5.5rem,3rem+9vw,11rem)] place-items-center rounded-[28%] border bg-white shadow-[var(--shadow-float)]">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={403}
                  height={440}
                  priority
                  className="h-3/5 w-auto animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="text-h1 mt-4 max-w-2xl font-bold tracking-[-0.04em]">
          This page took a <em className="font-serif font-normal text-orange-700">wrong turn</em>.
        </h1>
        <p className="text-lead text-body mt-5 max-w-lg">
          The link may be broken or the page may have moved. Let&apos;s get you back to something
          useful.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <CTAButton href="/" magnetic>
            Back to home
          </CTAButton>
          <CTAButton href="/contact" variant="secondary" arrow={false}>
            Report a problem
          </CTAButton>
        </div>
        <ul className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group border-line flex h-full flex-col rounded-2xl border bg-white/80 p-4 text-left backdrop-blur transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="text-ink flex items-center justify-between font-semibold">
                  {l.label}{" "}
                  <ArrowUpRight
                    className="text-muted-ink size-4 transition-colors group-hover:text-orange-600"
                    aria-hidden
                  />
                </span>
                <span className="text-muted-ink mt-1 text-sm">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
