import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/article-layout";
import { getEntries, getEntry } from "@/lib/content";
import { getMdxBody } from "@/lib/mdx";

export function generateStaticParams() {
  return getEntries("guias").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("guias", slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.excerpt };
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("guias", slug);
  if (!entry) notFound();

  const body = (await getMdxBody("guias", slug)) ?? "";

  return (
    <ArticleLayout
      entry={entry}
      body={body}
      backHref="/guias"
      backLabel="Volver a guías"
    />
  );
}
