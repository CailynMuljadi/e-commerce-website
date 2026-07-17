import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i02.appmifile.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // If your API uses other image URLs down the line, add their hostnames here!
    ],
  },
};

export default nextConfig;
