import type { Metadata } from "next";
import { withOg } from "@/lib/seo";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { KIDS_GAMES } from "@/components/extras/KidsShell";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import PlayBadge from "@/components/ui/PlayBadge";
import Reveal from "@/components/ui/Reveal";
import { getApp } from "@/lib/apps";
import { trackedPlayUrl } from "@/lib/questions";

export const metadata: Metadata = withOg({
  title: { absolute: "Free Learning Games for Kids: ABCs, Counting & Colours" },
  description: "Free learning games for toddlers and preschoolers: an ABC game, a counting game and a colours game. Play in the browser, no ads and no sign-up.",
  alternates: { canonical: "/kids/" },
}, "brightkids");

export default function KidsPage() {
  const app = getApp("brightkids")!;
  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-12 pt-40">
        <Blobs colors={["#ec4899", "#f59e0b", "#4cc9f0", "#8b5cf6"]} opacity={0.3} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#be185d]">Kids corner</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold sm:text-7xl">
            Learn through <span className="text-rainbow">play.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">Free mini games for little ones aged 2 to 6. Big buttons, friendly sounds, no ads and no sign-up.</p>
        </Reveal>
      </section>
      <main className="mx-auto max-w-6xl px-5 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {KIDS_GAMES.map((g, i) => (
            <Reveal key={g.href} delay={i * 0.06}>
              <Link href={g.href} className="group flex h-full flex-col items-center rounded-[2rem] bg-white p-8 text-center ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
                <span className="grid h-24 w-24 place-items-center rounded-[1.75rem] text-6xl transition-transform group-hover:rotate-6 group-hover:scale-110" style={{ background: g.color + "1f" }}>
                  {g.emoji}
                </span>
                <h2 className="font-display mt-5 text-2xl font-extrabold">{g.title}</h2>
                <p className="mt-2 flex-1 text-[#3d3d52]">{g.body}</p>
                <span className="mt-6 rounded-full px-6 py-3 font-bold text-white" style={{ background: g.color }}>
                  Play ▶
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-5 rounded-[2rem] p-8 text-center sm:flex-row sm:text-left" style={{ background: app.theme.soft }}>
          <AppIcon src={app.icon} name={app.shortName} size={72} />
          <div className="flex-1">
            <h2 className="font-display text-2xl font-extrabold">More games in {app.shortName}</h2>
            <p className="mt-1 text-[#3d3d52]">{app.tagline}</p>
          </div>
          <PlayBadge href={trackedPlayUrl(app.playUrl, "kids_hub")} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
