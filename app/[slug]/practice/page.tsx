import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PracticeShell from "@/components/practice/PracticeShell";
import TopicPractice from "@/components/practice/TopicPractice";
import { getApp } from "@/lib/apps";
import { loadPractice, practiceSlugs, trackedPlayUrl } from "@/lib/questions";
import { metaDescription, ogImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug)!;
  const d = loadPractice(slug);
  const title = `Free ${d.examName} Practice Questions 2026 by Topic`;
  const description = metaDescription(`Practise for the ${d.examName} free: ${d.topics.length} topics with instant answers and explanations. No sign-up. Get ${d.premiumCount}+ more in the ${app.shortName} app.`);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${slug}/practice/` },
    robots: d.isSample ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: `/${slug}/practice/`, images: ogImage(slug, app.name) },
  };
}

export default async function PracticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const d = loadPractice(slug);
  const playUrl = trackedPlayUrl(app.playUrl, "practice");

  return (
    <PracticeShell
      app={app}
      active="practice"
      eyebrow="Free practice"
      title={`${d.examName} practice questions`}
      intro={`Pick a topic and answer ${d.topics[0]?.free ?? 6} free questions. You'll see the right answer and an explanation straight away.`}
      playUrl={playUrl}
      premiumCount={d.premiumCount}
      isSample={d.isSample}
    >
      <TopicPractice topics={d.topics} byTopic={d.byTopic} color={app.theme.primary} appName={app.shortName} appIcon={app.icon} rating={app.rating} playUrl={playUrl} premiumCount={d.premiumCount} slug={slug} />
    </PracticeShell>
  );
}
