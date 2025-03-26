import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TS errors during build
  },
  experimental: {
    typedRoutes: false, // Disable experimental typed routes
  },
};

export default nextConfig;
