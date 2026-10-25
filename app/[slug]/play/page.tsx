import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppNav from "@/components/app/AppNav";
import InstallBar from "@/components/app/InstallBar";
import LetterSafari from "@/components/extras/LetterSafari";
import Logo from "@/components/site/Logo";
import Blobs from "@/components/ui/Blobs";
import { getApp } from "@/lib/apps";
import { trackedPlayUrl } from "@/lib/questions";
import { ogImage } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => [{ slug: "brightkids" }];

export const metadata: Metadata = {
  title: { absolute: "Free ABC Game for Kids: Letter Safari (Play Online)" },
  description: "A free alphabet game for toddlers and preschoolers. Hear a letter, tap the picture that starts with it and collect stars. No download, no ads.",
  alternates: { canonical: "/brightkids/play/" },
  openGraph: { title: "Letter Safari: a free ABC game for kids", url: "/brightkids/play/", images: ogImage("brightkids", "BrightKids") },
};

export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const app = getApp((await params).slug);
  if (!app) notFound();
  const playUrl = trackedPlayUrl(app.playUrl, "kids_game");

  return (
    <div className="relative min-h-screen" style={{ background: app.theme.soft }}>
      <AppNav name={app.shortName} icon={app.icon} color={app.theme.primary} playUrl={playUrl} base={`/${app.slug}/`} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32">
        <Blobs colors={["#ec4899", "#f59e0b", "#4cc9f0", "#8b5cf6"]} opacity={0.25} fade />
        <div className="relative mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ec4899]">Free kids game</p>
            <h1 className="font-display mt-2 text-4xl font-extrabold sm:text-6xl">Letter Safari 🦁</h1>
            <p className="mt-3 text-lg text-[#3d3d52]">Hear the letter, then tap the picture that starts with it. Turn the sound on!</p>
          </div>
          <div className="mt-8">
            <LetterSafari playUrl={playUrl} />
          </div>
          <p className="mt-6 text-center text-sm text-[#6b6b80]">
            For ages 2 to 6. No ads, no sign-up. Made by the team behind{" "}
            <Link href={`/${app.slug}/`} className="font-semibold underline">
              {app.shortName}
            </Link>
            .
          </p>
        </div>
      </section>
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
