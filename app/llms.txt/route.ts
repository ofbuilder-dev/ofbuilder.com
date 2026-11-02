// /llms.txt: a plain-text map of the site for AI assistants and search tools (llmstxt.org format).
import { apps, suites, appsInSuite } from "@/lib/apps";
import { practiceSlugs } from "@/lib/questions";
import { getAllPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${siteUrl}${p}`;
  const lines: string[] = [
    "# OfBuilder",
    "",
    `> OfBuilder is an independent studio that makes ${apps.length} Android apps on Google Play, grouped into ${suites.length} suites: citizenship test prep, UK driving theory, CompTIA IT certifications, kids learning, Islamic apps, and everyday apps for brain training, sleep and money. The website also has free browser-based mock tests and tools.`,
    "",
    "## Main pages",
    `- [Home](${u("/")}): overview of the studio and all apps`,
    `- [All apps](${u("/apps/")}): every app with a short description`,
    `- [Free practice tests](${u("/free-tests/")}): free mock tests, readiness checks and practice questions`,
    `- [Tests by country](${u("/tests/")}): practice tests grouped by country`,
    `- [Free tools](${u("/tools/")}): subnet calculator, ports and acronyms, prayer times, sleep calculator and more`,
    `- [Kids games](${u("/kids/")}): free learning games for young children`,
    `- [Blog](${u("/blog/")}): exam guides and study tips`,
    `- [Privacy policies](${u("/privacy/")})`,
    `- [Contact](${u("/contact/")})`,
    "",
  ];
  for (const s of suites) {
    lines.push(`## ${s.name}`, "", s.description, "");
    for (const a of appsInSuite(s.id)) lines.push(`- [${a.name}](${u(`/${a.slug}/`)}): ${a.tagline}`);
    lines.push("");
  }
  lines.push("## Free mock tests", "");
  for (const slug of practiceSlugs()) {
    const a = apps.find((x) => x.slug === slug);
    if (a) lines.push(`- [${a.shortName} mock test](${u(`/${slug}/mock-test/`)})`);
  }
  lines.push("", "## Recent articles", "");
  for (const p of getAllPosts().filter((p) => !p.noindex).slice(0, 20)) lines.push(`- [${p.title}](${u(`/blog/${p.slug}/`)})`);
  lines.push("");
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
