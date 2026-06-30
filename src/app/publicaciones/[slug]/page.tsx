import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Users,
  Download,
  Link2,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicationCard } from "@/components/collections/publication-card";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ReadingProgress } from "@/components/news/reading-progress";
import {
  publications,
  getPublication,
  getCollection,
  getByCollection,
} from "@/lib/collections";
import { getMdxBody } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) return {};
  return {
    title: pub.title,
    description: pub.excerpt,
    openGraph: {
      title: pub.title,
      description: pub.excerpt,
      type: "article",
      publishedTime: pub.date,
      images: [{ url: pub.cover, width: 1200, height: 630 }],
    },
  };
}

const fallbackBody = `
## Resumen

Esta obra forma parte del catálogo en acceso abierto de **Ediciones URJC**. El
texto completo y los materiales complementarios estarán disponibles próximamente
en este espacio.

## Acceso abierto

Todas nuestras publicaciones se distribuyen bajo licencias Creative Commons, lo
que permite compartir y reutilizar el conocimiento citando adecuadamente la
fuente.

> El acceso abierto multiplica el alcance y el impacto de la investigación.
`;

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) notFound();

  const collection = getCollection(pub.collection);
  const body = (await getMdxBody("publicaciones", slug)) ?? fallbackBody;
  const related = getByCollection(pub.collection)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    description: pub.excerpt,
    image: pub.cover,
    datePublished: pub.date,
    author: pub.authors.map((name) => ({ "@type": "Person", name })),
    publisher: { "@type": "Organization", name: siteConfig.name },
    ...(pub.doi ? { identifier: `https://doi.org/${pub.doi}` } : {}),
  };

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <article className="relative">
        <header className="bg-void relative flex min-h-[70vh] items-end overflow-hidden">
          <Image
            src={pub.cover}
            alt={pub.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="from-void via-void/75 to-void/30 absolute inset-0 bg-gradient-to-t" />
          <div className="grid-lines absolute inset-0 opacity-30" />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-32 pb-16">
            <Link
              href={`/colecciones/${collection.slug}`}
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" /> {collection.name}
            </Link>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="violet">{collection.name}</Badge>
              <Badge variant="glass">{pub.type}</Badge>
              {pub.isNew && <Badge variant="live">Novedad</Badge>}
            </div>
            <h1 className="font-display text-3xl leading-[1.08] font-bold text-balance text-white sm:text-5xl">
              {pub.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-pretty text-white/75">
              {pub.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <Users className="size-4" /> {pub.authors.join(", ")}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" /> {formatDate(pub.date)}
              </span>
              {pub.pages && (
                <span className="flex items-center gap-1.5">
                  <FileText className="size-4" /> {pub.pages} páginas
                </span>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="md">
                <Download className="size-4" /> Descargar PDF
              </Button>
              {pub.doi && (
                <Button variant="glass" size="md" asChild>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Link2 className="size-4" /> {pub.doi}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-lg">
            <MDXRemote source={body} components={mdxComponents} />
          </div>
        </div>

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-24">
            <h2 className="font-display mb-8 text-2xl font-bold">
              Más en {collection.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PublicationCard key={p.slug} publication={p} />
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
