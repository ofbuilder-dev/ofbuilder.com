import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { getAllPosts, getPost } from "@/lib/blog";
import { ogImage } from "@/lib/seo";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { type: "article", title: post.title, description: post.description ?? post.excerpt, publishedTime: post.date, images: ogImage("home", post.title) },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n");

  return (
    <div className="relative">
      <Nav />
      <article className="mx-auto max-w-3xl px-5 pb-12 pt-36">
        <Link href="/blog/" className="text-sm font-semibold text-[#6b6b80] transition-colors hover:text-[#0f0f1a]">
          ← Back to blog
        </Link>
        <div className="mt-8">
          <span className="inline-flex rounded-full bg-[#8b5cf6]/10 px-3 py-1 text-xs font-bold text-[#8b5cf6]">{post.category}</span>
          <h1 className="font-display mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-[#6b6b80]">
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-[#3d3d52]">
          {paragraphs.map((para, i) => (
            <p key={i}>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
          ))}
        </div>
      </article>
      <Footer />
    </div>
  );
}
