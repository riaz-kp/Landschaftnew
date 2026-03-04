import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Try covering both top-level and experimental for maximum compatibility
  // @ts-ignore
  serverActions: {
    bodySizeLimit: '10mb',
  },

  experimental: {
    // @ts-ignore
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
