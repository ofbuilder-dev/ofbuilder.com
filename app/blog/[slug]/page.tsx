import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getAllPosts, getPost } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n");

  return (
    <div className="relative">
      <Navbar />
      <article className="mx-auto max-w-3xl px-5 py-24 pt-32">
        <Link
          href="/blog"
          className="text-sm text-[var(--text-dim)] hover:text-white transition-colors"
        >
          ← Back to blog
        </Link>

        <div className="mt-8">
          <span className="inline-flex w-fit rounded-full bg-[var(--brand)]/10 px-2.5 py-1 text-xs font-medium text-[var(--brand)]">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-faint)]">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mt-10 space-y-5 text-[var(--text-dim)] leading-relaxed">
          {paragraphs.map((para, i) => (
            <p key={i}>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
          ))}
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
