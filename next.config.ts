import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "realto.mediaclocksoft.com.au" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
