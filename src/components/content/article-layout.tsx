import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ReadingProgress } from "@/components/news/reading-progress";
import type { ContentEntry } from "@/lib/content";
import { formatDate } from "@/lib/utils";

/**
 * Artículo de sección migrada de OfiLibre: cabecera con portada, metadatos,
 * un hueco opcional para extras (botones de slides, ficha técnica...) y el
 * cuerpo MDX.
 */
export function ArticleLayout({
  entry,
  body,
  backHref,
  backLabel,
  children,
}: {
  entry: ContentEntry;
  body: string;
  backHref: string;
  backLabel: string;
  children?: ReactNode;
}) {
  return (
    <>
      <ReadingProgress />
      <Navbar />
      <article className="relative">
        <header className="bg-void relative flex min-h-[45vh] items-end overflow-hidden">
          <Image
            src={entry.cover}
            alt={entry.title}
            fill
            priority
            sizes="100vw"
            className="object-contain object-right p-10 opacity-30"
          />
          <div className="from-void via-void/80 to-void/40 absolute inset-0 bg-gradient-to-t" />
          <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent" />
          <div className="grid-lines absolute inset-0 opacity-30" />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-32 pb-14">
            <Link
              href={backHref}
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" /> {backLabel}
            </Link>
            <Badge variant="gold" className="mb-4">
              {entry.tag}
            </Badge>
            <h1 className="font-display text-3xl leading-[1.08] font-bold text-balance text-white sm:text-5xl">
              {entry.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/70">
              <span>{entry.author}</span>
              {entry.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" /> {formatDate(entry.date)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {entry.readingTime} min
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-16">
          {children}
          <div className="text-lg">
            <MDXRemote source={body} components={mdxComponents} />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
