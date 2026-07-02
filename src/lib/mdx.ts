import { promises as fs } from "fs";
import path from "path";

export async function getMdxBody(
  dir: "publicaciones" | "blog",
  slug: string,
): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), "content", dir, `${slug}.mdx`);
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}
