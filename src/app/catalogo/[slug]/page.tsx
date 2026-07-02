import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleLayout } from "@/components/content/article-layout";
import { getEntries, getEntry } from "@/lib/content";
import { getMdxBody } from "@/lib/mdx";

export function generateStaticParams() {
  return getEntries("catalogo").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("catalogo", slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.excerpt };
}

export default async function CatalogoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("catalogo", slug);
  if (!entry) notFound();

  const body = (await getMdxBody("catalogo", slug)) ?? "";
  const meta = entry.extra as {
    department?: string;
    degrees?: string;
    link?: string;
    license?: string;
  };

  return (
    <ArticleLayout
      entry={entry}
      body={body}
      backHref="/catalogo"
      backLabel="Volver al catálogo"
    >
      <div className="glass mb-10 grid gap-3 rounded-2xl p-6 text-sm">
        <p>
          <span className="text-muted-foreground">Autoría:</span> {entry.author}
        </p>
        {meta.department && (
          <p>
            <span className="text-muted-foreground">Departamento/Escuela:</span>{" "}
            {meta.department}
          </p>
        )}
        {meta.degrees && (
          <p>
            <span className="text-muted-foreground">Titulaciones:</span>{" "}
            {meta.degrees}
          </p>
        )}
        {meta.license && (
          <p>
            <span className="text-muted-foreground">Licencia:</span>{" "}
            {meta.license}
          </p>
        )}
        {meta.link && (
          <Button asChild variant="primary" className="mt-2 w-fit">
            <a href={meta.link} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" /> Acceder al material
            </a>
          </Button>
        )}
      </div>
    </ArticleLayout>
  );
}
