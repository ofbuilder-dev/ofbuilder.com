import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Blobs from "@/components/ui/Blobs";
import Reveal from "@/components/ui/Reveal";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog", description: "App updates, AI news and dev notes from the OfBuilder studio." };

const TINTS = ["#ff6b6b", "#f59e0b", "#10b981", "#4cc9f0", "#8b5cf6"];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-12 pt-40">
        <Blobs opacity={0.3} />
        <Reveal className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#10b981]">Blog</p>
          <h1 className="font-display mt-3 text-6xl font-extrabold sm:text-8xl">Notes from the studio.</h1>
          <p className="mt-5 max-w-xl text-lg text-[#3d3d52]">App updates, AI news and dev tips.</p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => {
          const tint = TINTS[i % TINTS.length];
          return (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <Link href={`/blog/${post.slug}/`} className="group flex h-full flex-col rounded-[2rem] bg-white p-7 ring-1 ring-black/5 transition-all hover:-translate-y-2 hover:shadow-2xl">
                <span className="w-fit rounded-full px-3 py-1 text-xs font-bold" style={{ background: tint + "1f", color: tint }}>
                  {post.category}
                </span>
                <h2 className="mt-4 text-lg font-bold leading-snug transition-colors group-hover:text-[var(--hover)]" style={{ ["--hover" as string]: tint }}>
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b6b80]">{post.excerpt}</p>
                <p className="mt-5 text-xs font-semibold text-[#6b6b80]">
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </Link>
            </Reveal>
          );
        })}
      </section>
      <Footer />
    </div>
  );
}
