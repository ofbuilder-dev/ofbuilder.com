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

## Free web practice (exam apps)

Exam apps can offer free topic practice, a free mock test and a sample-questions page on the website
(`/<slug>/practice/`, `/<slug>/mock-test/`, `/<slug>/questions/`).

- Question banks live in `content/questions/<app-slug>.json`, in the same format the apps use
  (`id`, `ref`, `topic_id`, `topic_slug`, `question`, `variants`, `options`, `correct_index`,
  `explanation`, `source_chapter`, `is_premium`, …).
- Only questions with `"is_premium": false` are sent to the browser. Premium questions only count
  towards the "N+ more in the app" message.
- Topic practice shows up to 6 free questions per topic (`FREE_PER_TOPIC` in `lib/questions.ts`); the
  mock test draws from all free questions using the exam format in `PRACTICE` (`lib/questions.ts`).
- While a bank contains placeholder questions (any `ref` starting with `SAMPLE`), its practice pages are
  `noindex`, left out of the sitemap and show a "Preview" notice. Replace the file with the real bank
  and they go live in search automatically.
- To add another exam app, add its slug to `PRACTICE` and drop its JSON file into `content/questions/`.

## Brand

- Palette: cream (`#fffbf5`) + ink (`#0f0f1a`) with a rainbow accent (coral → amber → lime → sky → violet)
- Fonts: Bricolage Grotesque (display) + Inter (body)
- Logo: a "B" of two stacked blocks with a spark, on a coral→violet→blue tile — SVG/PNG files in `public/brand/`, component in `components/site/Logo.tsx`
- Facebook: https://www.facebook.com/ofbuilder/
- Google Play: https://play.google.com/store/apps/dev?id=8090522541816028633
```

## Real citizenship questions

On every deploy, `scripts/fetch_questions.mjs` downloads `seed_data/<country>/questions.json` from the
Supabase `Citizenship` bucket and publishes only a small free slice (6 per topic, topped up to fill one mock
test). Premium questions are never published. If a download fails, the existing file is kept.
