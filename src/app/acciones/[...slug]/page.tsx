import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleLayout } from "@/components/content/article-layout";
import { getEntries, getEntry } from "@/lib/content";
import { getMdxBody } from "@/lib/mdx";

// Catch-all: las actas del Consejo de Publicación Abierta viven anidadas en
// /acciones/reuniones-consejo-publicacion-abierta/<fecha>.
export function generateStaticParams() {
  return getEntries("acciones").map((e) => ({ slug: e.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("acciones", slug.join("/"));
  if (!entry) return {};
  return { title: entry.title, description: entry.excerpt };
}

export default async function AccionPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const joined = slug.join("/");
  const entry = getEntry("acciones", joined);
  if (!entry) notFound();

  const body = (await getMdxBody("acciones", joined)) ?? "";

  return (
    <ArticleLayout
      entry={entry}
      body={body}
      backHref="/acciones"
      backLabel="Volver a acciones"
    />
  );
}
