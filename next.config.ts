import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 3600, // 1 hour
    remotePatterns: [
      {
        hostname: 'media.istockphoto.com'
      }
    ]
  }
};

export default nextConfig;
