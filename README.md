# OfBuilder — Studio Portfolio

The marketing site for **OfBuilder**, an indie software studio. Showcases the
product portfolio and links each app to its Google Play listing and its planned
per-product subdomain landing page.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- TypeScript, fully static (`output: static`-friendly — all pages prerender)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Project structure

```
app/
  layout.tsx        # metadata, fonts
  page.tsx          # the one-page portfolio (hero, products, about, contact)
  globals.css       # design system + gold/black brand theme
  icon.svg          # favicon (crown-B mark)
components/
  Navbar.tsx        # sticky nav (client component, mobile menu)
  Logo.tsx          # gold crown-B brand mark (SVG)
  ProjectCard.tsx   # per-product card
lib/
  projects.ts       # SINGLE SOURCE OF TRUTH for all products + links
```

## Adding / editing a product

Everything lives in [`lib/projects.ts`](lib/projects.ts). Each product has a
`status` of `live` (shows the Google Play button) or `soon` (shows "In the
works"). The `subdomain` field is the "Learn more" landing-page URL.

## Subdomain landing pages (planned)

Each product is intended to get its own subdomain landing page
(`dreamnest.ofbuilder.com`, etc.). When ready, those can be added either as:

- separate sites, or
- routes in this app served per-subdomain via Next.js middleware (rewrite the
  `Host` header to `/p/[slug]`).

The `subdomain` URLs in `lib/projects.ts` already point at the target hosts.

## Brand

- Palette: gold (`#e8b923` → `#f5d76e`) on near-black (`#07070b`)
- Logo: crown over a serif **B** — see `components/Logo.tsx` / `app/icon.svg`
- Facebook: https://www.facebook.com/ofbuilder/
- Google Play: https://play.google.com/store/apps/dev?id=8090522541816028633
```
