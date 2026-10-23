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
  page.tsx              # home: animated hero, suites, featured bento, studio
  [slug]/page.tsx       # one standalone mini-site per app  → ofbuilder.com/<slug>/
  suites/[id]/page.tsx  # suite landing pages              → ofbuilder.com/suites/<id>/
  apps/page.tsx         # filterable directory of every app
  contact/, privacy/, blog/
  products/[slug]/      # redirects from the old /products/<slug>/ URLs
components/
  site/                 # global nav, footer, logo
  home/                 # home hero, stacked suite cards, directory
  app/                  # per-app page: animated motifs, phone mockups, gallery, FAQ
  ui/                   # Reveal, CountUp, Tilt, Blobs, PlayBadge, AppIcon, Icon
lib/
  apps.ts               # SINGLE SOURCE OF TRUTH for suites + apps
public/icons/           # app icons (one PNG per app slug)
```

## Adding / editing an app

Everything lives in [`lib/apps.ts`](lib/apps.ts). Citizenship, driving theory
and CompTIA apps are built with the `citizenship()`, `driving()` and `cert()`
helpers; the rest are full objects. Each app has:

- `playUrl` — the exact Google Play link (falls back to the developer page)
- `theme` + `motif` — colours and the animated hero background
  (`sunrise`, `road`, `circuit`, `breath`, `stars`, `geometric`, `shapes`,
  `math`, `maze`, `orbit`, `donut`)
- `screens[]` — set `src: "/screens/<slug>-1.png"` to replace the illustrated
  mock screen with a real screenshot
- `reviews[]` — real reviews only; the section hides when empty

## Brand

- Palette: cream (`#fffbf5`) + ink (`#0f0f1a`) with a rainbow accent (coral → amber → lime → sky → violet)
- Fonts: Bricolage Grotesque (display) + Inter (body)
- Logo: a "B" of two stacked blocks with a spark, on a coral→violet→blue tile — SVG/PNG files in `public/brand/`, component in `components/site/Logo.tsx`
- Facebook: https://www.facebook.com/ofbuilder/
- Google Play: https://play.google.com/store/apps/dev?id=8090522541816028633
```
