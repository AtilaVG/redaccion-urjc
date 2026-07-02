import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FileText, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleLayout } from "@/components/content/article-layout";
import { getEntries, getEntry } from "@/lib/content";
import { getMdxBody } from "@/lib/mdx";
import { withBasePath } from "@/lib/utils";

export function generateStaticParams() {
  return getEntries("pres").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("pres", slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.excerpt };
}

export default async function PresDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("pres", slug);
  if (!entry) notFound();

  const body = (await getMdxBody("pres", slug)) ?? "";
  const slides = entry.extra.slides as
    { pdf?: string; odp?: string } | undefined;

  return (
    <ArticleLayout
      entry={entry}
      body={body}
      backHref="/pres"
      backLabel="Volver a presentaciones"
    >
      {slides && (slides.pdf || slides.odp) && (
        <div className="mb-10 flex flex-wrap gap-3">
          {slides.pdf && (
            <Button asChild variant="primary">
              <a
                href={withBasePath(slides.pdf)}
                target="_blank"
                rel="noreferrer"
              >
                <FileText className="size-4" /> Descargar PDF
              </a>
            </Button>
          )}
          {slides.odp && (
            <Button asChild variant="outline">
              <a
                href={withBasePath(slides.odp)}
                target="_blank"
                rel="noreferrer"
              >
                <Presentation className="size-4" /> ODP (LibreOffice)
              </a>
            </Button>
          )}
        </div>
      )}
    </ArticleLayout>
  );
}
