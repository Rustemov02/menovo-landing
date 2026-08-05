import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:slug((?!admin|login|_next|api|favicon.ico).*)",
        destination: "https://admin.menovo.rest/:slug*",
      },
    ];
  },
};

export default nextConfig;
