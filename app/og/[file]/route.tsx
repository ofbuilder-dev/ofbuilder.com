// Static Open Graph images, exported as real .png files (/og/<name>.png) so GitHub Pages
// serves them with an image/png content type.
import { apps, getApp, getSuite, suites } from "@/lib/apps";
import { renderOg } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ file: "home.png" }, ...apps.map((a) => ({ file: `${a.slug}.png` })), ...suites.map((s) => ({ file: `suite-${s.id}.png` }))];
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const name = (await params).file.replace(/\.png$/, "");

  if (name.startsWith("suite-")) {
    const suite = getSuite(name.slice(6))!;
    return renderOg({ kicker: "App suite", title: suite.name, subtitle: suite.tagline, from: suite.color, to: suite.color });
  }

  const app = getApp(name);
  if (app) {
    return renderOg({
      kicker: getSuite(app.suiteId)?.name ?? "OfBuilder app",
      title: app.shortName,
      subtitle: app.tagline,
      icon: app.icon,
      from: app.theme.primary,
      to: app.theme.secondary,
      dark: app.theme.dark,
    });
  }

  return renderOg({
    kicker: "Indie app studio",
    title: "Apps that help you learn, pass, sleep & grow.",
    subtitle: "Citizenship & driving theory tests, CompTIA prep, kids apps, Islamic apps and everyday tools.",
    from: "#ff6b6b",
    to: "#8b5cf6",
  });
}
