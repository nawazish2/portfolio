import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local SVG banner
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
