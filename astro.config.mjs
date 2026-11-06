// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://nawazishkhan.in",
  // Every page is static HTML built ahead of time; only /api/contact runs on the Worker.
  output: "static",
  // /contact, not /contact/ — matches the canonical URLs the Next.js site used.
  trailingSlash: "never",
  adapter: cloudflare({
    // Images are resized and converted to AVIF/WebP at build time.
    imageService: { build: "compile", runtime: "passthrough" },
    // The OG image endpoint uses satori + sharp, which need Node at build time.
    prerenderEnvironment: "node",
  }),
  session: false,
  integrations: [sitemap()],
  build: {
    // Small enough to inline: saves a render-blocking request.
    inlineStylesheets: "always",
    format: "file",
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
