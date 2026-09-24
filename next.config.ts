import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "realto.mediaclocksoft.com.au" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // ponytail: /public filenames aren't content-hashed, so `immutable` means a
  // changed asset must be RENAMED to reach users who already cached it
  async headers() {
    return [
      {
        source: "/:path*.:ext(svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
