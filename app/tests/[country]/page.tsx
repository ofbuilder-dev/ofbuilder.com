import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Faq from "@/components/app/Faq";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/site/JsonLd";
import TestCard from "@/components/tests/TestCard";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import { getApp } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";
import { countries, getCountry } from "@/lib/countries";
import { guides } from "@/lib/guides";
import { hasPractice } from "@/lib/questions";
import { abs, breadcrumbLd, faqLd, ogImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const c = getCountry((await params).country)!;
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: { canonical: `/tests/${c.id}/` },
    openGraph: { title: c.title, description: c.description, url: `/tests/${c.id}/`, images: ogImage(c.apps[0], c.title) },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const c = getCountry((await params).country);
  if (!c) notFound();
  const apps = c.apps.map((s) => getApp(s)).filter((a) => a && hasPractice(a.slug)) as NonNullable<ReturnType<typeof getApp>>[];
  const posts = getAllPosts()
    .filter((p) => p.app && c.apps.includes(p.app))
    .slice(0, 4);
  const others = countries.filter((o) => o.id !== c.id);

  return (
    <div className="relative">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Tests by country", path: "/tests/" },
            { name: c.name, path: `/tests/${c.id}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: c.title,
            itemListElement: apps.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.name, url: abs(`/${a.slug}/mock-test/`) })),
          },
          faqLd(c.faq),
        ]}
      />
      <Nav />
      <section className="relative overflow-hidden px-5 pb-14 pt-40">
        <Blobs colors={[c.color, "#ffb347", "#4cc9f0", "#8b5cf6"]} opacity={0.3} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <Link href="/tests/" className="text-sm font-semibold text-[#6b6b80] hover:text-[#0f0f1a]">
            ← All countries
          </Link>
          <p className="mt-6 text-6xl">{c.flag}</p>
          <h1 className="font-display mt-4 text-5xl font-extrabold leading-[1.02] sm:text-7xl">
            Free tests for {["uk", "usa", "netherlands"].includes(c.id) && "the "}
            <span style={{ color: c.color }}>{c.name}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[#3d3d52]">{c.intro}</p>
          {c.localPage && (
            <Link href={c.localPage.href} className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold ring-1 ring-black/10 transition-transform hover:-translate-y-0.5">
              {c.localPage.label}
            </Link>
          )}
        </Reveal>
      </section>

      <main className="mx-auto max-w-6xl space-y-20 px-5 pb-12">
        <section>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {apps.length === 1 ? "Your free test" : `${apps.length} free tests`}
          </h2>
          <div className={`mt-6 grid gap-4 ${apps.length === 1 ? "max-w-md" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {apps.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.04}>
                <TestCard app={a} />
              </Reveal>
            ))}
          </div>
        </section>

        {apps.some((a) => guides[a.slug]) && (
          <section>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Exam guides</h2>
            <p className="mt-2 text-[#3d3d52]">Format, booking, what to bring and a free 7, 14 or 30-day study plan.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {apps
                .filter((a) => guides[a.slug])
                .map((a) => (
                  <Link key={a.slug} href={`/${a.slug}/guide/`} className="group flex items-center justify-between gap-4 rounded-2xl p-5 font-bold transition-transform hover:-translate-y-0.5" style={{ background: a.theme.soft }}>
                    <span>📘 {guides[a.slug].examName} guide</span>
                    <span className="transition-transform group-hover:translate-x-1" style={{ color: a.theme.primary }}>
                      →
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        )}

        {posts.length > 0 && (
          <section>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Helpful reads</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="group rounded-[1.5rem] bg-white p-6 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: c.color }}>
                    {p.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-1 text-sm text-[#6b6b80]">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Questions, answered.</h2>
          <Faq items={c.faq} color={c.color} />
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold">Other countries</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.id} href={`/tests/${o.id}/`} className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold ring-1 ring-black/10 transition-colors hover:bg-black/5">
                {o.flag} {o.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
