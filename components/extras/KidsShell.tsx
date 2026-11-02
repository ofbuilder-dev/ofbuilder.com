import Link from "next/link";
import AppNav from "@/components/app/AppNav";
import InstallBar from "@/components/app/InstallBar";
import JsonLd from "@/components/site/JsonLd";
import Logo from "@/components/site/Logo";
import Blobs from "@/components/ui/Blobs";
import { getApp } from "@/lib/apps";
import { trackedPlayUrl } from "@/lib/questions";
import { breadcrumbLd } from "@/lib/seo";

export const KIDS_GAMES = [
  { href: "/brightkids/play/", emoji: "🦁", title: "Letter Safari", body: "Hear a letter, tap the picture that starts with it.", color: "#ec4899" },
  { href: "/kids/counting/", emoji: "🍎", title: "Counting Garden", body: "Count the pictures and tap the right number.", color: "#10b981" },
  { href: "/kids/colours/", emoji: "🎈", title: "Colour Pop", body: "Hear a colour and pop the matching balloon.", color: "#a855f7" },
];

// Frame for a kids game page: BrightKids nav, title, the game, links to the other games.
export default function KidsShell({ path, title, intro, emoji, children }: { path: string; title: string; intro: string; emoji: string; children: (playUrl: string) => React.ReactNode }) {
  const app = getApp("brightkids")!;
  const playUrl = trackedPlayUrl(app.playUrl, "kids_game");
  const others = KIDS_GAMES.filter((g) => g.href !== path);
  return (
    <div className="relative min-h-screen" style={{ background: app.theme.soft }}>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Kids games", path: "/kids/" },
          { name: title, path },
        ])}
      />
      <AppNav name={app.shortName} icon={app.icon} color={app.theme.primary} playUrl={playUrl} base={`/${app.slug}/`} />
      <section className="relative overflow-hidden px-5 pb-16 pt-32">
        <Blobs colors={["#ec4899", "#f59e0b", "#4cc9f0", "#8b5cf6"]} opacity={0.25} fade />
        <div className="relative mx-auto max-w-2xl">
          <div className="text-center">
            <Link href="/kids/" className="text-sm font-bold uppercase tracking-[0.2em] text-[#be185d]">
              Free kids games
            </Link>
            <h1 className="font-display mt-2 text-4xl font-extrabold sm:text-6xl">
              {title} {emoji}
            </h1>
            <p className="mt-3 text-lg text-[#3d3d52]">{intro}</p>
          </div>
          <div className="mt-8">{children(playUrl)}</div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {others.map((g) => (
              <Link key={g.href} href={g.href} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5 transition-transform hover:-translate-y-0.5">
                <span className="grid h-12 w-12 place-items-center rounded-xl text-2xl" style={{ background: g.color + "1f" }}>
                  {g.emoji}
                </span>
                <span>
                  <span className="block font-bold">{g.title}</span>
                  <span className="text-sm text-[#6b6b80]">Play next →</span>
                </span>
              </Link>
            ))}
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
