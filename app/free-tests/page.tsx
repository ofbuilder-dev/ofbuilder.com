import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import { getApp, suites } from "@/lib/apps";
import { guides } from "@/lib/guides";
import { loadPractice, practiceSlugs } from "@/lib/questions";

export const metadata: Metadata = {
  title: { absolute: "Free Practice Tests 2026: Citizenship, Driving Theory & CompTIA" },
  description: "Free online mock tests and practice questions for citizenship tests, UK driving theory tests and CompTIA exams. Instant score, explanations, no sign-up.",
  alternates: { canonical: "/free-tests/" },
};

// Hub of every free web test, grouped by suite.
export default function FreeTestsPage() {
  const slugs = practiceSlugs();
  const groups = suites
    .map((s) => ({ suite: s, items: slugs.map((slug) => getApp(slug)!).filter((a) => a.suiteId === s.id) }))
    .filter((g) => g.items.length);

  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-16 pt-40">
        <Blobs opacity={0.35} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#10b981]">Free tests</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold sm:text-7xl">
            Practise for free. <span className="text-rainbow">Pass for real.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[#3d3d52]">
            {slugs.length} exams, each with a free mock test, a readiness check and practice by topic. Right in your browser, no sign-up.
          </p>
        </Reveal>
      </section>

      <main className="mx-auto max-w-6xl space-y-16 px-5 pb-12">
        {groups.map(({ suite, items }) => (
          <section key={suite.id}>
            <h2 className="font-display flex items-center gap-3 text-3xl font-extrabold">
              <span>{suite.emoji}</span> {suite.name}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((app, i) => {
                const d = loadPractice(app.slug);
                const n = Math.min(d.exam.questions, d.mockPool.length);
                return (
                  <Reveal key={app.slug} delay={i * 0.04}>
                    <div className="flex h-full flex-col rounded-[1.75rem] bg-white p-6 ring-1 ring-black/5 transition-shadow hover:shadow-xl">
                      <div className="flex items-center gap-4">
                        <AppIcon src={app.icon} name={app.shortName} size={56} />
                        <div className="min-w-0">
                          <h3 className="font-bold leading-snug">{d.examName}</h3>
                          <p className="text-sm text-[#6b6b80]">
                            {n} questions{d.exam.minutes ? ` · ${d.exam.minutes} min` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-bold">
                        <Link href={`/${app.slug}/mock-test/`} className="col-span-2 rounded-xl px-4 py-3 text-center text-white" style={{ background: app.theme.primary }}>
                          ⏱️ Free mock test
                        </Link>
                        <Link href={`/${app.slug}/readiness/`} className="rounded-xl px-3 py-2.5 text-center" style={{ background: app.theme.soft }}>
                          📊 Am I ready?
                        </Link>
                        <Link href={`/${app.slug}/practice/`} className="rounded-xl px-3 py-2.5 text-center" style={{ background: app.theme.soft }}>
                          🎯 Practice
                        </Link>
                      </div>
                      {guides[app.slug] && (
                        <Link href={`/${app.slug}/guide/`} className="mt-4 text-sm font-semibold" style={{ color: app.theme.primary }}>
                          📘 Exam guide & study plan →
                        </Link>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
