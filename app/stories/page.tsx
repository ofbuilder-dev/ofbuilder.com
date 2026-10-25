import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import StoryForm from "@/components/site/StoryForm";
import AppIcon from "@/components/ui/AppIcon";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import { apps, getApp } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Passed with OfBuilder: success stories",
  description: "Real stories from people who passed their citizenship test, driving theory test or CompTIA exam with OfBuilder apps. Share yours.",
  alternates: { canonical: "/stories/" },
};

// Stories live in content/stories.json: [{ "name", "app": "<slug>", "text", "date" }]. Only add real, approved submissions.
type Story = { name: string; app: string; text: string; date?: string; country?: string };

function loadStories(): Story[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "stories.json"), "utf-8")) as Story[];
  } catch {
    return [];
  }
}

export default function StoriesPage() {
  const stories = loadStories();
  const examApps = apps.filter((a) => ["citizenship", "driving", "comptia"].includes(a.suiteId)).map((a) => ({ slug: a.slug, name: a.shortName }));

  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-12 pt-40">
        <Blobs opacity={0.35} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ff6b6b]">Success stories</p>
          <h1 className="font-display mt-3 text-5xl font-extrabold sm:text-7xl">
            Passed with <span className="text-rainbow">OfBuilder</span> 🎉
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">Passed your test with one of our apps? Tell us about it. Your story could help someone else feel ready.</p>
        </Reveal>
      </section>

      <main className="mx-auto max-w-6xl px-5 pb-12">
        {stories.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {stories.map((s, i) => {
              const app = getApp(s.app);
              return (
                <figure key={i} className="mb-4 break-inside-avoid rounded-[1.75rem] bg-white p-6 ring-1 ring-black/5">
                  <blockquote className="text-lg leading-relaxed">“{s.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    {app && <AppIcon src={app.icon} name={app.shortName} size={40} />}
                    <span>
                      <span className="block font-bold">{s.name}</span>
                      {app && (
                        <Link href={`/${app.slug}/`} className="text-sm text-[#6b6b80] hover:underline">
                          Passed with {app.shortName}
                          {s.country ? ` · ${s.country}` : ""}
                        </Link>
                      )}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border-2 border-dashed border-black/10 p-10 text-center">
            <p className="text-5xl">🏆</p>
            <h2 className="font-display mt-4 text-3xl font-extrabold">Be the first on the wall</h2>
            <p className="mx-auto mt-2 max-w-md text-[#3d3d52]">We&apos;re collecting our first success stories. Share yours below and it could appear here.</p>
          </div>
        )}

        <section id="share" className="mt-16 scroll-mt-28">
          <StoryForm apps={examApps} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
