import { promises as fs } from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "noticias");

export async function getArticleBody(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}
