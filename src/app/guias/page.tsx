import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { EntryGrid } from "@/components/content/entry-grid";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guías",
  description:
    "Guías prácticas de OfiLibre sobre cultura libre, publicación en abierto, datos abiertos y software libre.",
};

export default function GuiasPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="OfiLibre"
          title="Guías"
          description="Guías prácticas sobre cultura libre, publicación en abierto, datos abiertos y software libre."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <EntryGrid entries={getEntries("guias")} hrefBase="/guias" />
        </section>
      </main>
      <Footer />
    </>
  );
}
