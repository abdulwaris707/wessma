"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { ctas, mainNav, megaMenuFeature, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "@/components/shared/logo";
import { Icon } from "@/components/shared/icon";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandIcon } from "@/components/shared/brand-icon";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style sticky navbar with a compact glass state after scrolling.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.header
      initial={false}
      className="sticky top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 rounded-2xl border px-4 transition-[background-color,border-color,box-shadow] duration-500 sm:px-5",
          scrolled
            ? "glass border-line/80 shadow-[var(--shadow-lift)]"
            : "border-transparent bg-transparent",
        )}
      >
        <Logo />

        {/* Desktop navigation */}
        <NavigationMenu.Root className="relative hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-0.5">
            {mainNav.map((item) =>
              "mega" in item && item.mega ? (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Trigger
                    className={cn(
                      "group hover:text-navy-950 data-[state=open]:bg-surface-subtle data-[state=open]:text-navy-950 inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition-colors",
                      isActive(item.href) ? "text-navy-950" : "text-body",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-0 left-0 w-[min(92vw,960px)] data-[motion=from-end]:animate-[fade-in_200ms_ease-out] data-[motion=from-start]:animate-[fade-in_200ms_ease-out]">
                    <MegaMenu />
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link asChild active={isActive(item.href)}>
                    <Link
                      href={item.href}
                      className={cn(
                        "hover:bg-surface-subtle hover:text-navy-950 relative inline-flex h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors",
                        isActive(item.href) ? "text-navy-950" : "text-body",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-orange-500"
                        />
                      )}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>
          <div className="absolute top-full left-1/2 flex -translate-x-[38%] justify-center pt-3">
            <NavigationMenu.Viewport className="border-line relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-3xl border bg-white shadow-[var(--shadow-float)] transition-[width,height] duration-300 data-[state=closed]:animate-[fade-in_150ms_ease-in_reverse] data-[state=open]:animate-[sheet-in_300ms_cubic-bezier(0.22,1,0.36,1)]" />
          </div>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <Link
            href={ctas.quote.href}
            className="text-navy-800 hidden h-10 items-center rounded-full px-3.5 text-sm font-medium transition-colors hover:text-orange-700 xl:inline-flex"
          >
            {ctas.quote.label}
          </Link>
          <Link href={ctas.book.href} className="hidden rounded-full sm:inline-flex">
            <ShimmerButton size="sm" className="px-5">
              {ctas.book.label}
            </ShimmerButton>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

function MegaMenu() {
  const build = services.filter((s) => s.group === "Build");
  const grow = services.filter((s) => s.group === "Grow");
  return (
    <div className="grid grid-cols-[1fr_1fr_280px] gap-2 p-3">
      {[
        { label: "Build", items: build },
        { label: "Grow", items: grow },
      ].map((col) => (
        <div key={col.label} className="p-2">
          <p className="eyebrow mb-2 px-3">{col.label}</p>
          <ul className="grid gap-0.5">
            {col.items.map((s) => (
              <li key={s.slug}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group hover:bg-surface-alt flex gap-3 rounded-xl p-3 transition-colors"
                  >
                    <span className="border-line text-navy-800 grid size-9 shrink-0 place-items-center rounded-lg border bg-white shadow-[var(--shadow-soft)] transition-colors duration-300 group-hover:border-orange-500/30 group-hover:text-orange-700">
                      <Icon name={s.icon} className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="text-ink flex items-center gap-1.5 text-sm font-semibold">
                        {s.title}
                        {s.letter && (
                          <span className="font-display rounded bg-orange-50 px-1 text-[0.625rem] font-bold text-orange-700">
                            {s.letter}
                          </span>
                        )}
                      </span>
                      <span className="text-muted-ink mt-0.5 line-clamp-1 text-[0.8125rem] leading-snug">
                        {s.short}
                      </span>
                    </span>
                  </Link>
                </NavigationMenu.Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <NavigationMenu.Link asChild>
        <Link
          href={megaMenuFeature.href}
          className="group bg-navy-950 relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 text-white"
        >
          <div
            aria-hidden
            className="absolute -top-16 -right-16 size-56 rounded-full bg-orange-500/30 blur-3xl transition-transform duration-700 group-hover:scale-125"
          />
          <div
            aria-hidden
            className="bg-navy-600/40 absolute -bottom-20 -left-10 size-56 rounded-full blur-3xl"
          />
          <div className="relative">
            <p className="eyebrow !text-orange-400">{megaMenuFeature.eyebrow}</p>
            <div className="font-display mt-4 flex gap-1 text-2xl font-bold tracking-tight">
              {"WESSMAA".split("").map((l, i) => (
                <span key={i} className={i % 2 === 0 ? "text-white" : "text-orange-400"}>
                  {l}
                </span>
              ))}
            </div>
            <p className="font-display mt-2 text-lg leading-snug font-semibold">
              {megaMenuFeature.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{megaMenuFeature.text}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400">
              {megaMenuFeature.cta}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </div>
        </Link>
      </NavigationMenu.Link>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="text-navy-950 hover:text-orange-700 grid size-11 place-items-center rounded-full transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent aria-describedby="mobile-menu-desc">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription id="mobile-menu-desc" className="sr-only">
          Site navigation
        </SheetDescription>
        <div className="flex h-[76px] items-center justify-between px-5">
          <span onClick={() => setOpen(false)}>
            <Logo />
          </span>
          <SheetClose
            className="text-navy-950 hover:text-orange-700 grid size-11 place-items-center transition-colors"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </SheetClose>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 pb-6" data-lenis-prevent>
          <ul className="divide-line border-line divide-y border-y">
            {mainNav.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: EASE }}
              >
                {"mega" in item && item.mega ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      className={cn(
                        "font-display text-navy-950 relative flex min-h-14 w-full items-center justify-between py-3 text-base font-semibold tracking-tight transition-colors",
                        (isActive(item.href) || servicesOpen) && "text-orange-700",
                      )}
                    >
                      <span className="flex items-center gap-2.5">{item.label}<span className="h-px w-5 bg-orange-500/60" /></span>
                      <ChevronDown className={cn("size-4 transition-transform duration-300", servicesOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="grid grid-cols-1 gap-0 overflow-hidden border-l border-orange-500/30 pl-4 pb-3 sm:grid-cols-2"
                        >
                          {services.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                onClick={() => setOpen(false)}
                                className="text-body hover:text-orange-700 flex min-h-10 items-center gap-3 px-1 py-2 text-sm transition-colors"
                              >
                                <Icon name={s.icon} className="size-4 text-orange-700" />
                                {s.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group font-display text-navy-950 relative flex min-h-14 items-center justify-between py-3 text-base font-semibold tracking-tight transition-colors hover:text-orange-700",
                      isActive(item.href)
                        ? "text-orange-700"
                        : "",
                    )}
                  >
                    <span className="flex items-center gap-2.5">{item.label}{isActive(item.href) && <span className="h-px w-5 bg-orange-500/60" />}</span>
                    <ArrowRight className="size-4 text-orange-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <Link href={ctas.book.href} onClick={() => setOpen(false)} className="rounded-full">
              <ShimmerButton size="lg" className="w-full">
                {ctas.book.label}
              </ShimmerButton>
            </Link>
            <Link
              href={ctas.quote.href}
              onClick={() => setOpen(false)}
              className="border-navy-800/25 text-navy-800 inline-flex h-13 items-center justify-center rounded-full border text-[0.9375rem] font-medium"
            >
              {ctas.quote.label}
            </Link>
          </div>
          <div className="text-muted-ink mt-8 flex items-center justify-between text-sm">
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-navy-950">
              {siteConfig.contact.email}
            </a>
            <div className="flex gap-1">
              {siteConfig.social.slice(0, 3).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-navy-950 hover:bg-surface-subtle grid size-11 place-items-center rounded-full"
                >
                  <BrandIcon name={s.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
