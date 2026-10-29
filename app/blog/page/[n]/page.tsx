import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/components/blog/BlogIndex";
import { blogPageCount, getAllPosts } from "@/lib/blog";

export const dynamicParams = false;

// /blog/page/2/, /blog/page/3/ … (page 1 is /blog/).
export function generateStaticParams() {
  const pages = blogPageCount(getAllPosts().length);
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const n = Number((await params).n);
  return {
    title: `Blog: page ${n}`,
    description: `Exam guides, study tips and app updates from OfBuilder, page ${n} of ${blogPageCount(getAllPosts().length)}.`,
    alternates: { canonical: `/blog/page/${n}/` },
  };
}

export default async function BlogPaged({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  if (!Number.isInteger(n) || n < 2 || n > blogPageCount(getAllPosts().length)) notFound();
  return <BlogIndex page={n} />;
}
