import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PracticeShell from "@/components/practice/PracticeShell";
import Quiz from "@/components/practice/Quiz";
import { getApp } from "@/lib/apps";
import { loadPractice, practiceSlugs, trackedPlayUrl } from "@/lib/questions";
import { localesFor } from "@/lib/i18n";
import { ogImage } from "@/lib/seo";
import Link from "next/link";

const LANG_LABEL: Record<string, string> = { de: "🇩🇪 Auf Deutsch", da: "🇩🇰 På dansk", nl: "🇳🇱 In het Nederlands" };

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug)!;
  const d = loadPractice(slug);
  const n = Math.min(d.exam.questions, d.mockPool.length);
  const title = `Free ${d.examName} Mock Test 2026: ${n} Questions`;
  const description = `Take a free ${d.examName} mock test: ${n} questions${d.exam.minutes ? `, ${d.exam.minutes}-minute timer` : ""}, pass mark ${d.exam.passMark}. Instant score and explanations. No sign-up.`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/${slug}/mock-test/`,
      ...(localesFor(slug).length
        ? { languages: { en: `/${slug}/mock-test/`, ...Object.fromEntries(localesFor(slug).map((l) => [l, `/${slug}/${l}/mock-test/`])), "x-default": `/${slug}/mock-test/` } }
        : {}),
    },
    robots: d.isSample ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: `/${slug}/mock-test/`, images: ogImage(slug, app.name) },
  };
}

export default async function MockTestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const d = loadPractice(slug);
  const playUrl = trackedPlayUrl(app.playUrl, "mock_test");
  const n = Math.min(d.exam.questions, d.mockPool.length);
  const format = d.exam.official ? "the same format as the real test" : "a practice format (not the official exam format)";

  return (
    <PracticeShell
      app={app}
      active="mock-test"
      eyebrow="Free mock test"
      title={d.examName.charAt(0).toUpperCase() + d.examName.slice(1)}
      intro={`${n} questions${d.exam.minutes ? ` in ${d.exam.minutes} minutes` : ""} with a pass mark of ${d.exam.passMark}, using ${format}. You get your score and every explanation at the end.${d.exam.note ? ` ${d.exam.note}` : ""}`}
      playUrl={playUrl}
      premiumCount={d.premiumCount}
      isSample={d.isSample}
    >
      {localesFor(slug).length > 0 && (
        <div className="mb-4 flex justify-center gap-2">
          {localesFor(slug).map((l) => (
            <Link key={l} href={`/${slug}/${l}/mock-test/`} hrefLang={l} className="rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-black/10 transition-colors hover:bg-black/5">
              {LANG_LABEL[l] ?? l}
            </Link>
          ))}
        </div>
      )}
      <Quiz
        mode="mock"
        questions={d.mockPool}
        count={n}
        minutes={d.exam.minutes}
        passMark={d.exam.passMark}
        title="Ready for your mock test?"
        color={app.theme.primary}
        appName={app.shortName}
        appIcon={app.icon}
        rating={app.rating}
        playUrl={playUrl}
        premiumCount={d.premiumCount}
        storageKey={`ofb-mock-${slug}`}
        slug={slug}
        examName={d.examName}
        sharePath={`/${slug}/mock-test/`}
      />
    </PracticeShell>
  );
}
