// Real screenshots and reviews, picked up automatically at build time when they exist:
//   public/screenshots/<app-slug>/01.png, 02.png ... (png, jpg or webp; sorted by file name)
//   content/reviews/<app-slug>.json  →  [{ "name": "Sara K.", "text": "...", "rating": 5 }]
import fs from "fs";
import path from "path";
import type { App, Review, Screen } from "./apps";

const IMG = /\.(png|jpe?g|webp)$/i;

export function screensFor(app: App): Screen[] {
  const dir = path.join(process.cwd(), "public", "screenshots", app.slug);
  if (!fs.existsSync(dir)) return app.screens;
  const files = fs.readdirSync(dir).filter((f) => IMG.test(f)).sort();
  if (!files.length) return app.screens;
  // Keep the illustrated captions where we have them; extra screenshots get a generic caption.
  return files.map((f, i) => ({ ...(app.screens[i] ?? { kind: "list", caption: app.shortName }), src: `/screenshots/${app.slug}/${f}` }));
}

export function reviewsFor(app: App): Review[] {
  const file = path.join(process.cwd(), "content", "reviews", `${app.slug}.json`);
  if (!fs.existsSync(file)) return app.reviews;
  try {
    const list = JSON.parse(fs.readFileSync(file, "utf-8")) as Review[];
    return list.filter((r) => r.name && r.text && r.rating);
  } catch {
    return app.reviews;
  }
}
