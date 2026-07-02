import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { EntryGrid } from "@/components/content/entry-grid";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fichas de software libre",
  description:
    "Fichas de aplicaciones de software libre recomendadas por OfiLibre: qué son, dónde descargarlas y cómo aprender a usarlas.",
};

export default function FichasPage() {
  const entries = [...getEntries("fichas")].sort((a, b) =>
    a.title.localeCompare(b.title, "es"),
  );
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="OfiLibre"
          title="Fichas de software libre"
          description="Aplicaciones libres recomendadas: qué son, dónde descargarlas y cómo aprender a usarlas."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <EntryGrid entries={entries} hrefBase="/fichas" showMeta={false} />
        </section>
      </main>
      <Footer />
    </>
  );
}
