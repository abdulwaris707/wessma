import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { MotionProvider, PageTransition } from "@/components/providers/page-transition";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/shared/json-ld";

/* Fonts — self-hosted via next/font (preloaded, zero layout shift) */
const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({}),
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={satoshi.variable}
    >
      <body>
        <a
          href="#main"
          className="bg-navy-950 fixed top-4 left-4 z-[100] -translate-y-24 rounded-full px-5 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <TooltipProvider delayDuration={150}>
            <SmoothScroll />
            <AnnouncementBar />
            <Navbar />
            <main id="main">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <StickyMobileCta />
            <CookieConsent />
            <Toaster />
          </TooltipProvider>
        </MotionProvider>
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
