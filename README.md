# Nawazish Khan — Portfolio

Personal portfolio - [nawazishkhan.in](https://nawazishkhan.in).

## Stack

- [Astro](https://astro.build): every page is static HTML built ahead of time
- TypeScript
- Tailwind CSS 4
- Cloudflare Workers: static assets, plus one Worker route for the contact form

One simple page: intro, projects, open source, contact. The only JavaScript is a small script for the contact form (under 1.5 KB gzipped). There is no framework runtime in the browser.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

## Build & deploy

```bash
pnpm build        # static site -> dist/client, Worker -> dist/server
pnpm preview      # build, then run the real Worker locally with wrangler
pnpm deploy       # build, then wrangler deploy
pnpm typecheck
```

Open-source star counts are fetched **at build time**. Rebuild and deploy to refresh them. Set `GITHUB_TOKEN` in the build environment to avoid GitHub API rate limits.

## Content

Edit:

- `src/content/site.ts` — name, intro, links, and `featuredProjects` (which projects show, in order)
- `src/content/projects.ts` — project details (images live in `src/assets/projects/`)
- `src/content/opensource.ts` — merged upstream PRs

Images in `src/assets` are resized and converted to AVIF/WebP at build time.
The share image (`/og.png`) is also rendered at build time from `src/pages/og.png.ts`.

## Contact form

The form posts to `/api/contact` (`src/pages/api/contact.ts`), which sends mail through Resend.
Set these on the Worker (`RESEND_API_KEY` as a secret):

```bash
wrangler secret put RESEND_API_KEY
# optional vars:
CONTACT_TO_EMAIL=knawazish153@gmail.com
RESEND_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

For local `pnpm preview`, put them in `.dev.vars`.
Without `RESEND_API_KEY` the form returns a configuration error and the mailto fallback remains available.
