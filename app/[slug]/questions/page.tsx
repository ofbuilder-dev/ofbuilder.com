import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PracticeShell from "@/components/practice/PracticeShell";
import JsonLd from "@/components/site/JsonLd";
import { getApp } from "@/lib/apps";
import { loadPractice, practiceSlugs, trackedPlayUrl } from "@/lib/questions";
import { faqLd, ogImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug)!;
  const d = loadPractice(slug);
  const title = `${d.examName} Questions and Answers 2026 (Free)`;
  const description = `Free ${d.examName} sample questions with answers and explanations, grouped by topic. Then test yourself with a free mock test.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${slug}/questions/` },
    robots: d.isSample ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: `/${slug}/questions/`, images: ogImage(slug, app.name) },
  };
}

// Server-rendered list of the free questions so search engines can read them; answers sit behind <details>.
export default async function QuestionsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const d = loadPractice(slug);
  const playUrl = trackedPlayUrl(app.playUrl, "questions");
  const color = app.theme.primary;
  const all = d.topics.flatMap((t) => d.byTopic[t.slug] ?? []);

  return (
    <PracticeShell
      app={app}
      active="questions"
      eyebrow="Questions and answers"
      title={`${d.examName} sample questions`}
      intro="Real-style questions grouped by topic. Tap a question to see the answer and explanation."
      playUrl={playUrl}
      premiumCount={d.premiumCount}
      isSample={d.isSample}
    >
      {!d.isSample && <JsonLd data={faqLd(all.map((q) => ({ q: q.question, a: `${q.options[q.correct]}. ${q.explanation}`.trim() })))} />}
      <div className="space-y-12">
        {d.topics.map((t) => (
          <section key={t.slug}>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t.label}</h2>
            <div className="mt-5 space-y-3">
              {(d.byTopic[t.slug] ?? []).map((q) => (
                <details key={q.id} className="group rounded-2xl bg-white p-5 ring-1 ring-black/5 open:shadow-lg">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                    {q.question}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white transition-transform group-open:rotate-45" style={{ background: color }}>
                      +
                    </span>
                  </summary>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {q.options.map((o, i) => (
                      <li key={i} className={i === q.correct ? "font-bold text-emerald-700" : "text-[#6b6b80]"}>
                        {i === q.correct ? "✓" : "•"} {o}
                      </li>
                    ))}
                  </ul>
                  {q.explanation && <p className="mt-3 text-sm leading-relaxed text-[#3d3d52]">{q.explanation}</p>}
                </details>
              ))}
            </div>
          </section>
        ))}
        <div className="flex flex-wrap gap-3">
          <Link href={`/${slug}/mock-test/`} className="inline-flex h-14 items-center rounded-full px-7 font-bold text-white shadow-lg" style={{ background: color }}>
            Take the free mock test →
          </Link>
          <Link href={`/${slug}/practice/`} className="inline-flex h-14 items-center rounded-full bg-white px-7 font-bold ring-1 ring-black/10">
            Practise by topic
          </Link>
        </div>
      </div>
    </PracticeShell>
  );
}
