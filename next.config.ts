import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Product images are capped at 5 MB in the action; multipart form data adds overhead.
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
