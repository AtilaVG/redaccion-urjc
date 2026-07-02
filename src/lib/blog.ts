import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { withBasePath } from "@/lib/utils";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string; // ISO
  tag: string;
  tags: string[];
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function toIsoDate(value: unknown): string {
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(+d) ? String(value) : d.toISOString().slice(0, 10);
}

function loadPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"),
      );
      return {
        slug,
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ""),
        cover: withBasePath(String(data.cover ?? "/og.svg")),
        author: String(data.author ?? "OfiLibre URJC"),
        date: toIsoDate(data.date),
        tag: String(data.tag ?? "OfiLibre"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingTime: Number(data.readingTime ?? 5),
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

// Se carga una vez por proceso; en el export estático esto ocurre en build.
export const posts: BlogPost[] = loadPosts();

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getLatestPosts(limit?: number) {
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}
