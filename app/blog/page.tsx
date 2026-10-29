import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";

export const metadata: Metadata = { title: "Blog", description: "Exam guides, study tips, app updates and dev notes from the OfBuilder studio.", alternates: { canonical: "/blog/" } };

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
