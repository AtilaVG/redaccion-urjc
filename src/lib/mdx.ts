import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export async function getMdxBody(
  dir: string,
  slug: string,
): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "content", dir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf-8");
    // Los posts migrados llevan frontmatter; se entrega solo el cuerpo.
    return matter(raw).content;
  } catch {
    return null;
  }
}
