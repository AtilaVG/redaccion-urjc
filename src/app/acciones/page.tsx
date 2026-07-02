import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { EntryGrid } from "@/components/content/entry-grid";
import { getTopLevelEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Acciones",
  description:
    "Acciones de OfiLibre: jornadas, cafés, asignaturas en abierto, normativa y Consejo de Publicación Abierta.",
};

export default function AccionesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="OfiLibre"
          title="Acciones"
          description="Jornadas, cafés, asignaturas en abierto, normativa y el Consejo de Publicación Abierta."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <EntryGrid
            entries={getTopLevelEntries("acciones")}
            hrefBase="/acciones"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
