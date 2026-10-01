import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=true produces a fully static build in /out (used for static
 * hosting / previews). On Vercel, leave it unset to get the full Next.js
 * runtime with on-demand image optimization.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
