import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PracticeShell from "@/components/practice/PracticeShell";
import Quiz from "@/components/practice/Quiz";
import { getApp } from "@/lib/apps";
import { loadPractice, practiceSlugs, trackedPlayUrl } from "@/lib/questions";
import { ogImage } from "@/lib/seo";

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
    alternates: { canonical: `/${slug}/mock-test/` },
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
      title={`${d.examName} mock test`}
      intro={`${n} questions${d.exam.minutes ? ` in ${d.exam.minutes} minutes` : ""} with a pass mark of ${d.exam.passMark}, using ${format}. You get your score and every explanation at the end.${d.exam.note ? ` ${d.exam.note}` : ""}`}
      playUrl={playUrl}
      premiumCount={d.premiumCount}
      isSample={d.isSample}
    >
      <Quiz
        mode="mock"
        questions={d.mockPool}
        count={n}
        minutes={d.exam.minutes}
        passMark={d.exam.passMark}
        title={`${d.examName} mock test`}
        color={app.theme.primary}
        appName={app.shortName}
        playUrl={playUrl}
        premiumCount={d.premiumCount}
        storageKey={`ofb-mock-${slug}`}
      />
    </PracticeShell>
  );
}
