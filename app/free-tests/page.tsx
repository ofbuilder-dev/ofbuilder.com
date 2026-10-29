import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import TestCard from "@/components/tests/TestCard";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import { getApp, suites } from "@/lib/apps";
import { countries } from "@/lib/countries";
import { practiceSlugs } from "@/lib/questions";

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
          <div className="mt-8 flex flex-wrap gap-2">
            {countries.map((c) => (
              <Link key={c.id} href={`/tests/${c.id}/`} className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold ring-1 ring-black/10 backdrop-blur transition-colors hover:bg-white">
                {c.flag} {c.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <main className="mx-auto max-w-6xl space-y-16 px-5 pb-12">
        {groups.map(({ suite, items }) => (
          <section key={suite.id}>
            <h2 className="font-display flex items-center gap-3 text-3xl font-extrabold">
              <span>{suite.emoji}</span> {suite.name}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((app, i) => (
                <Reveal key={app.slug} delay={i * 0.04}>
                  <TestCard app={app} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
