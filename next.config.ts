import type { NextConfig } from "next";

/**
 * Server-capable output is required for the Neon database, authenticated
 * admin dashboard, and API route handlers deployed on Vercel.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
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
