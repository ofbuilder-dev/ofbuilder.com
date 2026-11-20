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
import ToolFaq from "@/components/tools/ToolFaq";

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

        <section className="mt-14">
          <h2 className="font-display text-3xl font-extrabold">For parents</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["🔤", "Letters and sounds", "Letter Safari says a letter out loud and asks your child to find the picture that starts with it, building early phonics."],
              ["🔢", "Counting", "Counting Garden shows a group of pictures to count, then asks for the right number, linking counting to written numbers."],
              ["🎨", "Colours", "Colour Pop names a colour and your child pops the matching balloon, practising listening and colour names together."],
            ].map(([e, t, b]) => (
              <div key={t} className="rounded-[1.75rem] bg-white p-6 ring-1 ring-black/5">
                <span className="text-3xl">{e}</span>
                <h3 className="mt-3 text-lg font-bold">{t}</h3>
                <p className="mt-1.5 text-[#3d3d52]">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[1.75rem] bg-[#fdf2f8] p-6 text-[#3d3d52]">
            <h3 className="text-lg font-bold text-[#0f0f1a]">Tips for playing together</h3>
            <ul className="mt-2 space-y-1.5">
              <li>• Keep sessions short: a few minutes is plenty for young children.</li>
              <li>• Sit with them, say the letters, numbers and colours out loud and celebrate every try.</li>
              <li>• Take it off the screen too: count apples in the kitchen or spot colours on a walk.</li>
            </ul>
          </div>
        </section>

        <ToolFaq
          items={[
            { q: "What age are these games for?", a: "They're made for children aged about 2 to 6. The youngest will enjoy tapping and listening with a grown-up, while older children can play on their own." },
            { q: "Are the games really free?", a: "Yes. They're free to play in the browser, with no ads, no sign-up and nothing to buy." },
            { q: "Do the games ask for any personal details?", a: "No. There are no accounts and nothing to fill in, and the games never ask for your child's name or any personal details. They simply run in your browser." },
            { q: "Do they work on phones and tablets?", a: "Yes. They're designed for touch screens with big buttons, and also work on a computer with a mouse. Turn the sound on, because the games speak the letters, numbers and colours." },
            { q: "Where can my child play more?", a: "The free BrightKids app on Google Play has more learning games for letters, phonics, numbers, shapes and colours." },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
}
