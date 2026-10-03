import type { NextConfig } from "next";

/**
 * The site is deployed as a fully static export in /out. This makes it ready
 * for Hostinger shared hosting without a Node.js runtime.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
