import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "@/components/news/news-card";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ReadingProgress } from "@/components/news/reading-progress";
import { articles, getArticle, getCategory, getByCategory } from "@/lib/news";
import { getArticleBody } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.cover, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.cover],
    },
  };
}

const fallbackBody = `
Esta es una historia de la **Redacción URJC**. El contenido completo de este
reportaje estará disponible muy pronto mientras nuestro equipo termina la
verificación de fuentes.

## Un campus en movimiento

La Universidad Rey Juan Carlos es mucho más que aulas: es un ecosistema vivo de
ideas, proyectos y personas. En esta sección documentamos ese pulso.

> El periodismo universitario es el primer borrador de la historia del campus.

Mantente atento para la versión extendida de este artículo.
`;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const body = (await getArticleBody(slug)) ?? fallbackBody;
  const related = getByCategory(article.category)
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.cover,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <article className="relative">
        {/* Hero header */}
        <header className="bg-void relative flex min-h-[72vh] items-end overflow-hidden">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div className="from-void via-void/70 to-void/30 absolute inset-0 bg-gradient-to-t" />
          <div className="grid-lines absolute inset-0 opacity-40" />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-32 pb-16">
            <Link
              href="/#noticias"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" /> Volver a noticias
            </Link>
            <div className="mb-4 flex gap-2">
              <Badge variant="crimson">{category.name}</Badge>
              {article.breaking && <Badge variant="live">Última hora</Badge>}
            </div>
            <h1 className="font-display text-4xl leading-[1.05] font-bold text-balance text-white sm:text-5xl md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-pretty text-white/75">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/70">
              <span className="flex items-center gap-2.5">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={36}
                  height={36}
                  className="rounded-full ring-1 ring-white/20"
                />
                <span>
                  <span className="block font-medium text-white">
                    {article.author.name}
                  </span>
                  <span className="text-xs">{article.author.role}</span>
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" /> {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {article.readingTime} min de
                lectura
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="prose-invert text-lg">
            <MDXRemote source={body} components={mdxComponents} />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-24">
            <h2 className="font-display mb-8 text-2xl font-bold">
              Sigue leyendo en {category.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} />
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
