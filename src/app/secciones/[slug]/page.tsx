import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NewsCard } from "@/components/news/news-card";
import {
  categories,
  getByCategory,
  getCategory,
  type CategorySlug,
} from "@/lib/news";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = getByCategory(slug as CategorySlug);
  const cat = getCategory(slug as CategorySlug);

  return (
    <>
      <Navbar />
      <main className="bg-void relative min-h-screen">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute top-0 left-1/2 h-[40vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--violet),transparent_70%)] opacity-20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-24">
          <Link
            href="/#secciones"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" /> Todas las secciones
          </Link>
          <span className="text-cyan font-mono text-xs tracking-[0.3em] uppercase">
            Sección
          </span>
          <h1 className="font-display mt-3 text-5xl font-bold sm:text-6xl">
            {cat.name}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-pretty">
            {cat.description}
          </p>

          {items.length > 0 ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a, i) => (
                <NewsCard key={a.slug} article={a} priority={i < 3} />
              ))}
            </div>
          ) : (
            <p className="glass text-muted-foreground mt-14 rounded-2xl p-10 text-center">
              Aún no hay reportajes en esta sección. ¡Vuelve pronto!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
