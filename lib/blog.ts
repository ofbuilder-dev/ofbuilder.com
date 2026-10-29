import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description?: string;
  category: string;
  tags?: string[];
  date: string;
  body: string;
  app?: string; // app slug for the call-to-action card at the end of the post
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    return JSON.parse(raw) as BlogPost;
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

// Pagination: page 1 shows the featured post plus FIRST_PAGE more; later pages show PER_PAGE each.
const FIRST_PAGE = 12;
const PER_PAGE = 12;

export function blogPageCount(total: number) {
  return 1 + Math.ceil(Math.max(0, total - 1 - FIRST_PAGE) / PER_PAGE);
}

export function blogPagePosts(all: BlogPost[], page: number) {
  if (page === 1) return all.slice(1, 1 + FIRST_PAGE);
  const start = 1 + FIRST_PAGE + (page - 2) * PER_PAGE;
  return all.slice(start, start + PER_PAGE);
}

export const blogPageHref = (page: number) => (page === 1 ? "/blog/" : `/blog/page/${page}/`);
