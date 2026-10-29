import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { apps, suites } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";
import { abs } from "@/lib/seo";
import { countries } from "@/lib/countries";
import { guideSlugs } from "@/lib/guides";
import { localParams } from "@/lib/i18n";
import { loadPractice, practiceSlugs } from "@/lib/questions";

export const dynamic = "force-static";

// Static legal pages shipped from public/ (privacy/<app>/, terms/<app>/, delete-account/<app>/).
function publicPages(dir: string) {
  const root = path.join(process.cwd(), "public", dir);
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((d) => fs.existsSync(path.join(root, d, "index.html")))
    .map((d) => `/${dir}/${d}/`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (p: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified: Date = now) => ({
    url: abs(p),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    entry("/apps/", 0.9, "weekly"),
    ...apps.map((a) => entry(`/${a.slug}/`, 0.9, "monthly")),
    ...suites.map((s) => entry(`/suites/${s.id}/`, 0.8, "monthly")),
    // Free practice pages, once a real (non-sample) question bank is in place.
    ...practiceSlugs()
      .filter((slug) => !loadPractice(slug).isSample)
      .flatMap((slug) => ["mock-test", "readiness", "practice", "questions"].map((p) => entry(`/${slug}/${p}/`, 0.85, "weekly"))),
    entry("/free-tests/", 0.9, "weekly"),
    entry("/tests/", 0.85, "monthly"),
    ...countries.map((c) => entry(`/tests/${c.id}/`, 0.85, "weekly")),
    ...guideSlugs().map((slug) => entry(`/${slug}/guide/`, 0.85, "monthly")),
    ...localParams().map(({ slug, lang }) => entry(`/${slug}/${lang}/`, 0.8, "monthly")),
    entry("/brightkids/play/", 0.7, "monthly"),
    entry("/ilmai/ayah/", 0.7, "daily"),
    entry("/stories/", 0.5, "weekly"),
    entry("/blog/", 0.7, "daily"),
    ...getAllPosts().map((p) => entry(`/blog/${p.slug}/`, 0.6, "yearly", new Date(p.date))),
    entry("/contact/", 0.5, "yearly"),
    entry("/privacy/", 0.3, "yearly"),
    ...[...publicPages("privacy"), ...publicPages("terms"), ...publicPages("delete-account")].map((p) => entry(p, 0.2, "yearly")),
  ];
}
