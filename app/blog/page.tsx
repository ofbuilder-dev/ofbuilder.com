import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative">
      <Navbar />
      <section className="mx-auto max-w-6xl px-5 py-24 pt-32">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[var(--brand)]">Blog</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            App updates, AI news & dev tips
          </h1>
          <p className="mt-3 text-[var(--text-dim)]">
            Twice-daily posts from the OfBuilder studio.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[var(--panel)] p-6 transition-colors hover:border-white/20 hover:bg-white/5"
            >
              <span className="inline-flex w-fit rounded-full bg-[var(--brand)]/10 px-2.5 py-1 text-xs font-medium text-[var(--brand)]">
                {post.category}
              </span>
              <h2 className="mt-3 text-base font-semibold leading-snug group-hover:text-[var(--brand)] transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-dim)]">
                {post.excerpt}
              </p>
              <p className="mt-4 text-xs text-[var(--text-faint)]">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
