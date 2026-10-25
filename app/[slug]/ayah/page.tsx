import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNav from "@/components/app/AppNav";
import InstallBar from "@/components/app/InstallBar";
import DailyAyah from "@/components/extras/DailyAyah";
import Logo from "@/components/site/Logo";
import PlayBadge from "@/components/ui/PlayBadge";
import { getApp } from "@/lib/apps";
import { ayat } from "@/lib/ayat";
import { trackedPlayUrl } from "@/lib/questions";
import { ogImage } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => [{ slug: "ilmai" }];

export const metadata: Metadata = {
  title: { absolute: "Ayah of the Day: a Daily Quran Verse to Reflect On" },
  description: "A short, uplifting Quran verse every day with its English meaning. Share it with family and friends, or read it in Arabic on quran.com.",
  alternates: { canonical: "/ilmai/ayah/" },
  openGraph: { title: "Ayah of the Day", url: "/ilmai/ayah/", images: ogImage("ilmai", "IlmAI") },
};

export default async function AyahPage({ params }: { params: Promise<{ slug: string }> }) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  const playUrl = trackedPlayUrl(app.playUrl, "daily_ayah");

  return (
    <div className="relative min-h-screen bg-[#f0fdfa]">
      <AppNav name={app.shortName} icon={app.icon} color={app.theme.primary} playUrl={playUrl} base={`/${app.slug}/`} />
      <main className="mx-auto max-w-3xl px-5 pb-16 pt-32">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0f766e]">Noor · daily reflection</p>
          <h1 className="font-display mt-2 text-4xl font-extrabold sm:text-6xl">Ayah of the Day</h1>
          <p className="mt-3 text-lg text-[#3d3d52]">A new verse every day. Come back tomorrow for the next one.</p>
        </div>
        <div className="mt-10">
          <DailyAyah ayat={ayat} />
        </div>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-[2rem] bg-white p-8 text-center ring-1 ring-black/5">
          <h2 className="font-display text-2xl font-extrabold">Have a question about Islam?</h2>
          <p className="max-w-md text-[#3d3d52]">{app.shortName} answers with references, so you can learn with confidence.</p>
          <PlayBadge href={playUrl} />
        </div>
      </main>
      <footer className="border-t bg-white px-5 py-8">
        <div className="mx-auto flex max-w-6xl justify-center text-sm text-[#6b6b80]">
          <Link href="/" className="flex items-center gap-2">
            <span>Made with ♥ by</span> <Logo size={24} />
          </Link>
        </div>
      </footer>
      <InstallBar name={app.shortName} icon={app.icon} color={app.theme.primary} playUrl={playUrl} />
    </div>
  );
}
