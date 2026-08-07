# Nawazish Khan — Portfolio

Personal portfolio for [nawazish.site](https://nawazish.site).

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- Motion
- Vercel

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Content

Edit:

- `content/site.ts` — identity, links, about, stack
- `content/projects.ts` — selected work

## Contact

Optional env vars for the contact form:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=knawazish153@gmail.com
RESEND_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

Without `RESEND_API_KEY`, the form returns a configuration error and the mailto fallback remains available.
