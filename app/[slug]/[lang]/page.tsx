import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNav from "@/components/app/AppNav";
import Faq from "@/components/app/Faq";
import InstallBar from "@/components/app/InstallBar";
import JsonLd from "@/components/site/JsonLd";
import Logo from "@/components/site/Logo";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import PlayBadge from "@/components/ui/PlayBadge";
import { getApp } from "@/lib/apps";
import { local, localParams } from "@/lib/i18n";
import { hasPractice, trackedPlayUrl } from "@/lib/questions";
import { faqLd, ogImage } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return localParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
  const { slug, lang } = await params;
  const t = local[slug][lang];
  const app = getApp(slug)!;
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: { canonical: `/${slug}/${lang}/`, languages: { en: `/${slug}/`, [lang]: `/${slug}/${lang}/`, "x-default": `/${slug}/` } },
    openGraph: { title: t.title, description: t.description, url: `/${slug}/${lang}/`, locale: lang, images: ogImage(slug, app.name) },
  };
}

export default async function LocalPage({ params }: { params: Promise<{ slug: string; lang: string }> }) {
  const { slug, lang } = await params;
  const app = getApp(slug);
  const t = local[slug]?.[lang];
  if (!app || !t) notFound();
  const { primary, secondary, soft } = app.theme;
  const base = `/${slug}/`;
  const practice = hasPractice(slug);
  const playUrl = trackedPlayUrl(app.playUrl, `local_${lang}`);

  return (
    <div lang={lang} className="relative min-h-screen">
      <JsonLd data={faqLd(t.faq)} />
      <AppNav name={app.shortName} icon={app.icon} color={primary} playUrl={playUrl} base={base} practiceHref={practice ? `${base}mock-test/` : undefined} />

      <section className="relative overflow-hidden px-5 pb-16 pt-36" style={{ background: soft }}>
        <Blobs colors={[primary, secondary, primary, "#ffffff"]} opacity={0.25} fade />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <AppIcon src={app.icon} name={app.shortName} size={72} />
            <Link href={base} hrefLang="en" className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold ring-1 ring-black/5">
              🇬🇧 {t.ui.english}
            </Link>
          </div>
          <h1 className="font-display mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">{t.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg text-[#3d3d52]">{t.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {practice && (
              <Link href={`${base}mock-test/`} className="inline-flex h-16 items-center rounded-2xl px-7 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: primary }}>
                {t.ui.mock} →
              </Link>
            )}
            <PlayBadge href={playUrl} />
          </div>
          {practice && <p className="mt-3 text-sm text-[#6b6b80]">{t.ui.note}</p>}
        </div>
      </section>

      <main className="mx-auto max-w-4xl space-y-14 px-5 py-14">
        <section>
          <h2 className="font-display text-3xl font-extrabold">{t.ui.factsTitle}</h2>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.facts.map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <dt className="text-xs font-bold uppercase tracking-wider text-[#6b6b80]">{k}</dt>
                <dd className="mt-1 text-lg font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="font-display text-3xl font-extrabold">{t.ui.featuresTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.features.map((f, i) => (
              <div key={f.title} className="rounded-[1.75rem] p-6" style={{ background: soft }}>
                <span className="font-display grid h-10 w-10 place-items-center rounded-full font-extrabold text-white" style={{ background: primary }}>
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-1 text-[#3d3d52]">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl font-extrabold">{t.ui.faqTitle}</h2>
          <div className="mt-6">
            <Faq items={t.faq} color={primary} />
          </div>
        </section>

        <div className="flex flex-col items-center gap-5 rounded-[2rem] p-8 text-center text-white sm:flex-row sm:text-left" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
          <AppIcon src={app.icon} name={app.shortName} size={72} />
          <p className="font-display flex-1 text-2xl font-extrabold">{t.ui.app}</p>
          <PlayBadge href={playUrl} dark={false} />
        </div>
        {app.disclaimer && <p className="text-center text-xs text-[#6b6b80]">{app.disclaimer}</p>}
      </main>

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
