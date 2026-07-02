import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { withBasePath } from "@/lib/utils";

/** Secciones de contenido migradas del sitio Hugo de OfiLibre. */
export type ContentSection =
  "guias" | "acciones" | "pres" | "catalogo" | "fichas";

export interface ContentEntry {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string | null; // ISO
  tag: string;
  tags: string[];
  readingTime: number;
  /** Campos específicos de la sección (slides, licenses, tutorials, ...) */
  extra: Record<string, unknown>;
}

const COMMON_KEYS = new Set([
  "title",
  "excerpt",
  "cover",
  "author",
  "date",
  "tag",
  "tags",
  "readingTime",
]);

function toIsoDate(value: unknown): string | null {
  if (value == null || value === "") return null;
  const d = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(+d) ? null : d.toISOString().slice(0, 10);
}

function walkMdx(dir: string, prefix = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return walkMdx(path.join(dir, entry.name), `${prefix}${entry.name}/`);
    }
    return entry.name.endsWith(".mdx") && !entry.name.startsWith("_")
      ? [`${prefix}${entry.name}`]
      : [];
  });
}

const cache = new Map<ContentSection, ContentEntry[]>();

export function getEntries(section: ContentSection): ContentEntry[] {
  const cached = cache.get(section);
  if (cached) return cached;

  const dir = path.join(process.cwd(), "content", section);
  const entries = walkMdx(dir)
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
      const slug = file.replace(/\.mdx$/, "");
      const extra: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(data)) {
        if (!COMMON_KEYS.has(k)) extra[k] = v;
      }
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
        extra,
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) return +new Date(b.date) - +new Date(a.date);
      if (a.date !== b.date) return a.date ? -1 : 1;
      return a.title.localeCompare(b.title, "es");
    });

  cache.set(section, entries);
  return entries;
}

export function getEntry(section: ContentSection, slug: string) {
  return getEntries(section).find((e) => e.slug === slug);
}

/** Entradas de primer nivel (sin las anidadas, p.ej. actas de reuniones). */
export function getTopLevelEntries(section: ContentSection) {
  return getEntries(section).filter((e) => !e.slug.includes("/"));
}
