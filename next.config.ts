import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Try covering both top-level and experimental for maximum compatibility
  // @ts-ignore
  serverActions: {
    bodySizeLimit: '2mb',
  },

  experimental: {
    // @ts-ignore
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
