import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNav from "@/components/app/AppNav";
import Faq from "@/components/app/Faq";
import StudyPlan from "@/components/guide/StudyPlan";
import InstallBar from "@/components/app/InstallBar";
import JsonLd from "@/components/site/JsonLd";
import Logo from "@/components/site/Logo";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import PlayBadge from "@/components/ui/PlayBadge";
import { getApp } from "@/lib/apps";
import { guideSlugs, guides, studyPlan } from "@/lib/guides";
import { hasPractice, loadPractice, trackedPlayUrl } from "@/lib/questions";
import { abs, breadcrumbLd, faqLd, ogImage, siteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guides[slug];
  const app = getApp(slug)!;
  return {
    title: { absolute: g.title },
    description: g.description,
    alternates: { canonical: `/${slug}/guide/` },
    openGraph: { type: "article", title: g.title, description: g.description, url: `/${slug}/guide/`, images: ogImage(slug, app.name) },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  const g = guides[slug];
  if (!app || !g) notFound();
  const { primary, secondary, soft } = app.theme;
  const base = `/${slug}/`;
  const practice = hasPractice(slug) ? loadPractice(slug) : null;
  const playUrl = trackedPlayUrl(app.playUrl, "guide");
  const topics = practice?.topics.map((t) => t.label) ?? ["Topic study", "Practice questions", "Weak areas"];
  const plans = { "7": studyPlan(topics, 7), "14": studyPlan(topics, 14), "30": studyPlan(topics, 30) };

  return (
    <div className="relative min-h-screen">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: app.shortName, path: base },
            { name: "Exam guide", path: `${base}guide/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.description,
            url: abs(`${base}guide/`),
            image: `${siteUrl}/og/${slug}.png`,
            dateModified: "2026-10-25",
            author: { "@id": `${siteUrl}/#organization` },
            publisher: { "@id": `${siteUrl}/#organization` },
          },
          faqLd(g.faq),
        ]}
      />
      <AppNav name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} base={base} practiceHref={practice ? `${base}mock-test/` : undefined} />

      <section className="relative overflow-hidden px-5 pb-14 pt-36" style={{ background: soft }}>
        <Blobs colors={[primary, secondary, primary, "#ffffff"]} opacity={0.25} fade />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: primary }}>
            Exam guide · updated 2026
          </p>
          <h1 className="font-display mt-3 text-4xl font-extrabold leading-tight sm:text-6xl">{g.title.split(":")[0]}: the complete guide</h1>
          <p className="mt-5 max-w-2xl text-lg text-[#3d3d52]">{g.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {practice && (
              <Link href={`${base}mock-test/`} className="inline-flex h-14 items-center rounded-full px-7 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: primary }}>
                Take a free mock test →
              </Link>
            )}
            <a href="#study-plan" className="inline-flex h-14 items-center rounded-full bg-white px-7 font-bold ring-1 ring-black/10">
              Get a study plan
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl space-y-14 px-5 py-14">
        {/* Facts */}
        <section>
          <h2 className="font-display text-3xl font-extrabold">The {g.examName} at a glance</h2>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {g.facts.map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b80]">{k}</dt>
                <dd className="mt-1 text-lg font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-[#6b6b80]">
            Rules and fees can change. Always check{" "}
            <a href={g.official.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: primary }}>
              {g.official.label}
            </a>{" "}
            before you book.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl font-extrabold">Who needs to take it?</h2>
          <p className="mt-3 text-lg leading-relaxed text-[#3d3d52]">{g.who}</p>
        </section>

        {/* Steps */}
        <section>
          <h2 className="font-display text-3xl font-extrabold">How it works, step by step</h2>
          <ol className="mt-6 space-y-3">
            {g.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <span className="font-display grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white" style={{ background: primary }}>
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-1 text-[#3d3d52]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {[
            ["🎒 On the day", g.onTheDay],
            ["💡 Tips to pass", g.tips],
          ].map(([h, list]) => (
            <div key={h as string} className="rounded-[2rem] p-6 sm:p-8" style={{ background: soft }}>
              <h2 className="font-display text-2xl font-extrabold">{h as string}</h2>
              <ul className="mt-4 space-y-2.5">
                {(list as string[]).map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-black text-white" style={{ background: primary }}>
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <StudyPlan plans={plans} color={primary} examName={g.examName} slug={slug} />

        {practice && (
          <section className="rounded-[2rem] p-8 text-white sm:p-10" style={{ background: `linear-gradient(135deg, ${primary}, #0f0f1a)` }}>
            <h2 className="font-display text-3xl font-extrabold">Test yourself for free</h2>
            <p className="mt-2 text-white/80">No download, no sign-up. See how close you are to passing.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["⏱️", "Mock test", "mock-test"],
                ["📊", "Am I ready?", "readiness"],
                ["🎯", "Practice by topic", "practice"],
              ].map(([e, l, h]) => (
                <Link key={h} href={`${base}${h}/`} className="rounded-2xl bg-white/10 p-5 font-bold ring-1 ring-white/20 transition-colors hover:bg-white/20">
                  <span className="text-2xl">{e}</span>
                  <span className="mt-2 block">{l} →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-display text-3xl font-extrabold">Frequently asked questions</h2>
          <div className="mt-6">
            <Faq items={g.faq} color={primary} />
          </div>
        </section>
      </main>

      <section className="px-5 pb-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2rem] p-8 text-center text-white sm:flex-row sm:text-left" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
          <AppIcon src={app.icon} name={app.shortName} size={80} />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Study anywhere with {app.shortName}</h2>
            <p className="mt-1 text-white/85">The full question bank, unlimited mock tests and progress tracking, offline.</p>
          </div>
          <PlayBadge href={playUrl} dark={false} />
        </div>
        {app.disclaimer && <p className="mx-auto mt-6 max-w-4xl text-center text-xs text-[#6b6b80]">{app.disclaimer}</p>}
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
            <Link href="/free-tests/" className="hover:text-[#0f0f1a]">
              Free tests
            </Link>
            <Link href="/apps/" className="hover:text-[#0f0f1a]">
              All apps
            </Link>
          </div>
        </div>
      </footer>
      <InstallBar name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} />
    </div>
  );
}
