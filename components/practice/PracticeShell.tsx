import Link from "next/link";
import AppNav from "@/components/app/AppNav";
import InstallBar from "@/components/app/InstallBar";
import JsonLd from "@/components/site/JsonLd";
import Logo from "@/components/site/Logo";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import PlayBadge from "@/components/ui/PlayBadge";
import type { App } from "@/lib/apps";
import { guides } from "@/lib/guides";
import { breadcrumbLd } from "@/lib/seo";

// Mock test first: it's the most popular way to check readiness.
const TABS = [
  ["mock-test", "Mock test", "⏱️"],
  ["readiness", "Am I ready?", "📊"],
  ["practice", "Practice", "🎯"],
  ["questions", "Questions", "📖"],
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
  const hasGuide = app.slug in guides;
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
      <AppNav name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} base={base} practiceHref={`${base}mock-test/`} />

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
          <nav className="mt-8 grid max-w-2xl grid-cols-4 gap-1 rounded-2xl bg-white/80 p-1.5 shadow-[0_12px_30px_-16px_rgba(15,15,26,0.35)] ring-1 ring-black/5 backdrop-blur" aria-label="Practice sections">
            {TABS.map(([k, l, icon]) => {
              const on = k === active;
              return (
                <Link
                  key={k}
                  href={`${base}${k}/`}
                  aria-current={on ? "page" : undefined}
                  className={`relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2.5 text-center text-[11px] font-bold leading-tight transition-all sm:flex-row sm:gap-2 sm:text-sm ${on ? "text-white shadow-md" : "text-[#3d3d52] hover:bg-black/5"}`}
                  style={on ? { background: primary } : undefined}
                >
                  <span className="text-base leading-none sm:text-lg">{icon}</span>
                  {l}
                  {k === "mock-test" && !on && (
                    <span className="absolute -right-1 -top-2 rounded-full px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white shadow" style={{ background: primary }}>
                      Popular
                    </span>
                  )}
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
            {hasGuide && (
              <Link href={`${base}guide/`} className="hover:text-[#0f0f1a]">
                Exam guide
              </Link>
            )}
            <Link href="/free-tests/" className="hover:text-[#0f0f1a]">
              Free tests
            </Link>
            <a href={app.privacyUrl} className="hover:text-[#0f0f1a]">
              Privacy
            </a>
          </div>
        </div>
      </footer>
      <InstallBar name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} />
    </div>
  );
}
