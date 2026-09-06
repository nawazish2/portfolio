import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nawazishkhan.in" }],
        destination: "https://nawazishkhan.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

