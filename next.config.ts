import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:slug*",
        destination: "https://admin.menovo.rest/:slug*",
      },
    ];
  },
};

export default nextConfig;
