import type { Metadata } from "next";
import Link from "next/link";
import AppIcon from "@/components/ui/AppIcon";
import { getApp } from "@/lib/apps";
import { guides } from "@/lib/guides";
import { hasPractice } from "@/lib/questions";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { getPost, readAllPosts } from "@/lib/blog";
import { ogImage } from "@/lib/seo";

export async function generateStaticParams() {
  return readAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  if (post.redirect) return { title: "Moved", robots: { index: false, follow: true }, alternates: { canonical: post.redirect } };
  return {
    // Long titles skip the "· OfBuilder" suffix so they fit in search results.
    title: post.title.length > 48 ? { absolute: post.title } : post.title,
    description: post.description ?? post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: { type: "article", title: post.title, description: post.description ?? post.excerpt, publishedTime: post.date, images: ogImage("home", post.title) },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  // Merged post: forward to the page that replaced it.
  if (post.redirect)
    return (
      <>
        <meta httpEquiv="refresh" content={`0; url=${post.redirect}`} />
        <link rel="canonical" href={`https://ofbuilder.com${post.redirect}`} />
        <p style={{ padding: 40, fontFamily: "sans-serif" }}>
          This post has moved. <a href={post.redirect}>Continue →</a>
        </p>
      </>
    );

  const paragraphs = post.body.split("\n\n");
  const app = post.app ? getApp(post.app) : undefined;

  return (
    <div className="relative">
      <Nav />
      <article className="mx-auto max-w-3xl px-5 pb-12 pt-36 [overflow-wrap:anywhere]">
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
          {paragraphs.map((para, i) =>
            /^# /.test(para) ? null : /^#{2,3} /.test(para) ? (
              <h2 key={i} className="font-display pt-4 text-3xl font-extrabold text-[#0f0f1a]">
                {para.replace(/^#+ /, "")}
              </h2>
            ) : para.startsWith("- ") ? (
              <ul key={i} className="list-disc space-y-1.5 pl-6">
                {para.split("\n").map((li, j) => (
                  <li key={j}>{li.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
            ),
          )}
        </div>
        {app && (
          <div className="mt-12 rounded-[2rem] p-8 text-white" style={{ background: `linear-gradient(135deg, ${app.theme.primary}, #0f0f1a)` }}>
            <div className="flex items-center gap-4">
              <AppIcon src={app.icon} name={app.shortName} size={64} />
              <div>
                <p className="font-display text-2xl font-extrabold">{hasPractice(app.slug) ? "Test yourself for free" : `Try ${app.shortName}`}</p>
                <p className="text-white/75">{app.tagline}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {hasPractice(app.slug) && (
                <Link href={`/${app.slug}/mock-test/`} className="rounded-full bg-white px-6 py-3 font-bold text-[#0f0f1a]">
                  Free mock test →
                </Link>
              )}
              {guides[app.slug] && (
                <Link href={`/${app.slug}/guide/`} className="rounded-full px-6 py-3 font-bold ring-1 ring-white/30">
                  Exam guide
                </Link>
              )}
              <Link href={`/${app.slug}/`} className="rounded-full px-6 py-3 font-bold ring-1 ring-white/30">
                About the app
              </Link>
            </div>
          </div>
        )}
      </article>
      <Footer />
    </div>
  );
}
