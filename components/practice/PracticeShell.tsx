import Link from "next/link";
import AppNav from "@/components/app/AppNav";
import JsonLd from "@/components/site/JsonLd";
import Logo from "@/components/site/Logo";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import PlayBadge from "@/components/ui/PlayBadge";
import type { App } from "@/lib/apps";
import { breadcrumbLd } from "@/lib/seo";

const TABS = [
  ["practice", "Practice by topic"],
  ["mock-test", "Free mock test"],
  ["questions", "Sample questions"],
] as const;

// Shared frame for an app's free practice pages: app nav, title, tab switcher, content and an app CTA.
export default function PracticeShell({
  app,
  active,
  eyebrow,
  title,
  intro,
  playUrl,
  premiumCount,
  isSample,
  children,
}: {
  app: App;
  active: (typeof TABS)[number][0];
  eyebrow: string;
  title: string;
  intro: string;
  playUrl: string;
  premiumCount: number;
  isSample: boolean;
  children: React.ReactNode;
}) {
  const { primary, soft } = app.theme;
  const base = `/${app.slug}/`;
  const tabLabel = TABS.find(([k]) => k === active)![1];

  return (
    <div className="relative min-h-screen">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: app.shortName, path: base },
          { name: tabLabel, path: `${base}${active}/` },
        ])}
      />
      <AppNav name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} base={base} practiceHref={`${base}practice/`} />

      <section className="relative overflow-hidden px-5 pb-10 pt-36" style={{ background: soft }}>
        <Blobs colors={[primary, app.theme.secondary, primary, "#ffffff"]} opacity={0.25} fade />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: primary }}>
            {eyebrow}
          </p>
          <h1 className="font-display mt-3 text-4xl font-extrabold leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#3d3d52]">{intro}</p>
          {isSample && (
            <p className="mt-4 inline-block rounded-xl bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
              Preview: these are sample questions. Real questions are coming soon.
            </p>
          )}
          <nav className="no-scrollbar mt-8 flex gap-2 overflow-x-auto" aria-label="Practice sections">
            {TABS.map(([k, l]) => {
              const on = k === active;
              return (
                <Link
                  key={k}
                  href={`${base}${k}/`}
                  aria-current={on ? "page" : undefined}
                  className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${on ? "text-white shadow-lg" : "bg-white text-[#3d3d52] ring-1 ring-black/10 hover:bg-black/5"}`}
                  style={on ? { background: primary } : undefined}
                >
                  {l}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-5 py-12">{children}</main>

      <section className="px-5 pb-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2rem] p-8 text-center text-white sm:flex-row sm:text-left" style={{ background: `linear-gradient(135deg, ${primary}, ${app.theme.secondary})` }}>
          <AppIcon src={app.icon} name={app.shortName} size={80} />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Want the full question bank?</h2>
            <p className="mt-1 text-white/85">
              {premiumCount > 0 ? `${premiumCount}+ more questions, ` : ""}unlimited mock tests, mistakes review and a readiness score in the {app.shortName} app.
            </p>
          </div>
          <PlayBadge href={playUrl} dark={false} />
        </div>
        <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-[#6b6b80]">{app.disclaimer}</p>
      </section>

      <footer className="border-t px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-[#6b6b80] sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <span>Made with ♥ by</span> <Logo size={24} />
          </Link>
          <div className="flex flex-wrap gap-5">
            <Link href={base} className="hover:text-[#0f0f1a]">
              About {app.shortName}
            </Link>
            <Link href="/apps/" className="hover:text-[#0f0f1a]">
              All apps
            </Link>
            <a href={app.privacyUrl} className="hover:text-[#0f0f1a]">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
