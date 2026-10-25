import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import AppIcon from "@/components/ui/AppIcon";
import { getApp } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog", description: "Exam guides, study tips, app updates and dev notes from the OfBuilder studio.", alternates: { canonical: "/blog/" } };

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const TINTS = ["#ff6b6b", "#f59e0b", "#10b981", "#4cc9f0", "#8b5cf6"];

export default function BlogPage() {
  const [featured, ...rest] = getAllPosts();
  const featuredApp = featured?.app ? getApp(featured.app) : undefined;

  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-12 pt-40">
        <Blobs opacity={0.3} fade />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#10b981]">Blog</p>
          <h1 className="font-display mt-3 text-6xl font-extrabold sm:text-8xl">Notes from the studio.</h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">Exam guides, study tips, app updates and notes from a small studio.</p>
        </Reveal>
      </section>

      {featured && (
        <section className="mx-auto max-w-6xl px-5">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}/`}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl transition-transform hover:-translate-y-1 sm:p-12 lg:flex-row lg:items-end lg:justify-between"
              style={{ background: `linear-gradient(135deg, ${featuredApp?.theme.primary ?? "#8b5cf6"}, #0f0f1a 85%)` }}
            >
              <div aria-hidden className="dot-grid absolute inset-0 opacity-20" />
              <div className="relative max-w-2xl">
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-white/25">Latest · {featured.category}</span>
                <h2 className="font-display mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">{featured.title}</h2>
                <p className="mt-4 text-lg text-white/75">{featured.excerpt}</p>
                <p className="mt-6 text-sm font-semibold text-white/60">{fmt(featured.date)}</p>
              </div>
              <div className="relative flex items-center gap-4">
                {featuredApp && <AppIcon src={featuredApp.icon} name={featuredApp.shortName} size={88} />}
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-xl text-[#0f0f1a] transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      <section className="mx-auto mt-5 grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => {
          const tint = TINTS[i % TINTS.length];
          const app = post.app ? getApp(post.app) : undefined;
          return (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <Link href={`/blog/${post.slug}/`} className="group flex h-full flex-col rounded-[2rem] bg-white p-7 ring-1 ring-black/5 transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center justify-between gap-3">
                  <span className="w-fit rounded-full px-3 py-1 text-xs font-bold" style={{ background: tint + "1f", color: tint }}>
                    {post.category}
                  </span>
                  {app && <AppIcon src={app.icon} name={app.shortName} size={36} />}
                </div>
                <h2 className="mt-4 text-lg font-bold leading-snug transition-colors group-hover:text-[var(--hover)]" style={{ ["--hover" as string]: tint }}>
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b6b80]">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs font-semibold text-[#6b6b80]">
                  {fmt(post.date)}
                  <span className="transition-transform group-hover:translate-x-1" style={{ color: tint }}>
                    Read →
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
      <Footer />
    </div>
  );
}
