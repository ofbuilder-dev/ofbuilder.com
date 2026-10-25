import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PracticeShell from "@/components/practice/PracticeShell";
import Quiz from "@/components/practice/Quiz";
import { getApp } from "@/lib/apps";
import { loadPractice, practiceSlugs, trackedPlayUrl } from "@/lib/questions";
import { ogImage } from "@/lib/seo";

export const dynamicParams = false;

const COUNT = 10;

export function generateStaticParams() {
  return practiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug)!;
  const d = loadPractice(slug);
  const title = `Am I Ready for the ${d.examName}? Free ${COUNT}-Question Check`;
  const description = `Answer ${COUNT} quick questions across every topic and get a free readiness score for the ${d.examName}, plus the topics to practise next.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${slug}/readiness/` },
    robots: d.isSample ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: `/${slug}/readiness/`, images: ogImage(slug, app.name) },
  };
}

export default async function ReadinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const d = loadPractice(slug);
  const playUrl = trackedPlayUrl(app.playUrl, "readiness");
  const topicLabels = Object.fromEntries(d.topics.map((t) => [t.slug, t.label]));

  return (
    <PracticeShell
      app={app}
      active="readiness"
      eyebrow="Readiness check"
      title={`Am I ready for the ${d.examName}?`}
      intro={`${COUNT} quick questions spread across every topic. You get a readiness score and the topics to practise next. Takes about 3 minutes.`}
      playUrl={playUrl}
      premiumCount={d.premiumCount}
      isSample={d.isSample}
    >
      <Quiz
        mode="ready"
        questions={d.mockPool}
        count={Math.min(COUNT, d.mockPool.length)}
        title="Readiness check"
        color={app.theme.primary}
        appName={app.shortName}
        appIcon={app.icon}
        rating={app.rating}
        playUrl={playUrl}
        premiumCount={d.premiumCount}
        storageKey={`ofb-ready-${slug}`}
        slug={slug}
        examName={d.examName}
        sharePath={`/${slug}/readiness/`}
        topicLabels={topicLabels}
      />
    </PracticeShell>
  );
}
