import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNav from "@/components/app/AppNav";
import InstallBar from "@/components/app/InstallBar";
import Quiz from "@/components/practice/Quiz";
import JsonLd from "@/components/site/JsonLd";
import Logo from "@/components/site/Logo";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import PlayBadge from "@/components/ui/PlayBadge";
import { getApp } from "@/lib/apps";
import { local, localParams } from "@/lib/i18n";
import { hasPractice, loadPractice, trackedPlayUrl } from "@/lib/questions";
import { quizText, type Lang } from "@/lib/quizText";
import { breadcrumbLd, ogImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return localParams().filter(({ slug }) => hasPractice(slug));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
  const { slug, lang } = await params;
  const m = local[slug][lang].mock;
  const d = loadPractice(slug);
  const path = `/${slug}/${lang}/mock-test/`;
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: path, languages: { en: `/${slug}/mock-test/`, [lang]: path, "x-default": `/${slug}/mock-test/` } },
    robots: d.isSample ? { index: false, follow: true } : undefined,
    openGraph: { title: m.title, description: m.description, url: path, locale: lang, images: ogImage(slug, m.h1) },
  };
}

// The free mock test with every label in the local language. Questions come from the same free bank.
export default async function LocalMockTest({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params;
  const app = getApp(slug);
  const page = local[slug]?.[lang];
  if (!app || !page) notFound();
  const m = page.mock;
  const d = loadPractice(slug);
  const T = quizText[lang as Lang];
  const { primary, secondary, soft } = app.theme;
  const playUrl = trackedPlayUrl(app.playUrl, `mock_test_${lang}`);
  const n = Math.min(d.exam.questions, d.mockPool.length);
  const path = `/${slug}/${lang}/mock-test/`;

  return (
    <div lang={lang} className="relative min-h-screen">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: app.shortName, path: `/${slug}/${lang}/` },
          { name: m.eyebrow, path },
        ])}
      />
      <AppNav name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} base={`/${slug}/${lang}/`} sections={[]} ctaLabel={m.getApp} />

      <section className="relative overflow-hidden px-5 pb-12 pt-36" style={{ background: soft }}>
        <Blobs colors={[primary, secondary, primary, "#ffffff"]} opacity={0.25} fade />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: primary }}>
            {m.eyebrow}
          </p>
          <h1 className="font-display mt-3 text-4xl font-extrabold leading-[1.05] sm:text-6xl">{m.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#3d3d52]">{m.intro}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm font-semibold">
            <Link href={`/${slug}/${lang}/`} className="rounded-full bg-white/80 px-4 py-2 ring-1 ring-black/10">
              {m.back}
            </Link>
            <Link href={`/${slug}/mock-test/`} hrefLang="en" className="rounded-full bg-white/80 px-4 py-2 ring-1 ring-black/10">
              🇬🇧 {m.english}
            </Link>
          </div>
        </div>
      </section>

      <main className="px-5 py-12">
        <div className="mx-auto max-w-3xl">
          <Quiz
            mode="mock"
            lang={lang as Lang}
            questions={d.mockPool}
            count={n}
            minutes={d.exam.minutes}
            passMark={d.exam.passMark}
            title={m.h1}
            color={primary}
            appName={app.shortName}
            appIcon={app.icon}
            rating={app.rating}
            playUrl={playUrl}
            premiumCount={d.premiumCount}
            storageKey={`ofb-mock-${slug}`}
            slug={slug}
            examName={m.examName}
            sharePath={path}
          />
        </div>
      </main>

      <section className="px-5 pb-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[2rem] p-8 text-center text-white sm:flex-row sm:text-left" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
          <AppIcon src={app.icon} name={app.shortName} size={80} />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{m.ctaTitle}</h2>
            <p className="mt-1 text-white/85">{m.ctaBody}</p>
          </div>
          <PlayBadge href={playUrl} dark={false} label={T.badge} />
        </div>
        {app.disclaimer && <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-[#6b6b80]">{app.disclaimer}</p>}
      </section>

      <footer className="border-t px-5 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center text-sm text-[#6b6b80]">
          <Link href="/" className="flex items-center gap-2">
            <span>♥</span> <Logo size={24} />
          </Link>
        </div>
      </footer>
      <InstallBar name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} />
    </div>
  );
}
