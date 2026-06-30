import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { PublicationCard } from "@/components/collections/publication-card";
import {
  collections,
  getByCollection,
  getCollection,
  type CollectionSlug,
} from "@/lib/collections";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const items = getByCollection(slug as CollectionSlug);
  const col = getCollection(slug as CollectionSlug);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Colección"
          title={col.name}
          description={col.description}
          back={{ href: "/colecciones", label: "Todas las colecciones" }}
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          {items.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <PublicationCard
                  key={p.slug}
                  publication={p}
                  priority={i < 3}
                />
              ))}
            </div>
          ) : (
            <p className="glass text-muted-foreground rounded-2xl p-10 text-center">
              Aún no hay obras publicadas en esta colección. ¡Vuelve pronto!
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
