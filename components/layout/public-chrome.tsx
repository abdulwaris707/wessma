"use client";
import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement-bar";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { CookieConsent } from "./cookie-consent";
import { StickyMobileCta } from "./sticky-mobile-cta";

/** Keeps the administrative workspace separate from the public-site chrome. */
export function PublicChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <><AnnouncementBar /><Navbar /></>;
}

export function PublicFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  // Kept after main in the root layout so landmarks remain in document order.
  return <><Footer /><StickyMobileCta /><CookieConsent /></>;
}
