import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { EntryGrid } from "@/components/content/entry-grid";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Presentaciones",
  description:
    "Presentaciones de OfiLibre sobre ciencia abierta, cultura libre, datos abiertos y software libre, descargables en PDF y ODP.",
};

export default function PresPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="OfiLibre"
          title="Presentaciones"
          description="Transparencias sobre ciencia abierta, cultura libre, datos abiertos y software libre, descargables en PDF y ODP."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <EntryGrid entries={getEntries("pres")} hrefBase="/pres" />
        </section>
      </main>
      <Footer />
    </>
  );
}
