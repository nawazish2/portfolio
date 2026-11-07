// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/**
 * `astro dev` runs as plain Astro. The Cloudflare adapter starts a local
 * Worker runtime (Miniflare) that cannot forward requests under Bun, so it is
 * only used for `astro build`, which is what gets deployed.
 */
const isDev = process.argv.includes("dev");

export default defineConfig({
  site: "https://nawazishkhan.in",
  // Every page is static HTML built ahead of time; only /api/contact runs on the Worker.
  output: "static",
  // /contact, not /contact/ — matches the canonical URLs the Next.js site used.
  trailingSlash: "never",
  adapter: isDev
    ? undefined
    : cloudflare({
        // Images are resized and converted to AVIF/WebP at build time.
        imageService: { build: "compile", runtime: "passthrough" },
        // The OG image endpoint uses satori + sharp at build time.
        prerenderEnvironment: "node",
      }),
  session: false,
  devToolbar: { enabled: false },
  env: {
    // Read by /api/contact. On Cloudflare they come from Worker secrets/vars;
    // locally from .env.
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
      RESEND_FROM_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
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
