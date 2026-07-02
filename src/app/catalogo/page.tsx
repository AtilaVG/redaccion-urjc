import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { EntryGrid } from "@/components/content/entry-grid";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Catálogo de materiales libres",
  description:
    "Catálogo de materiales docentes libres elaborados por profesorado de la URJC y publicados con licencias abiertas.",
};

export default function CatalogoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="OfiLibre"
          title="Catálogo de materiales libres"
          description="Materiales docentes elaborados por profesorado de la URJC y publicados con licencias abiertas."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <EntryGrid entries={getEntries("catalogo")} hrefBase="/catalogo" />
        </section>
      </main>
      <Footer />
    </>
  );
}
