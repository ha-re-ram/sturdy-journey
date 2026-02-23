import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // Required for GitHub Pages / Static Hosting
  images: {
    unoptimized: true, // Required for static export
  },
};


export default nextConfig;
