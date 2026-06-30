import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import {
  CollectionIcon,
  accentVar,
} from "@/components/collections/collection-icon";
import { collections, countByCollection } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Colecciones",
  description:
    "Explora las colecciones académicas de Ediciones URJC: investigación, innovación docente, actas, tesis, materiales, divulgación, arte y cultura e institucional.",
};

export default function ColeccionesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Catálogo"
          title="Colecciones"
          description="Toda la producción académica de la Universidad Rey Juan Carlos, organizada por tipo de publicación."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/colecciones/${c.slug}`}
                data-cursor="hover"
                className="group glass relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(circle, var(${accentVar[c.accent]}), transparent 70%)`,
                  }}
                />
                <div className="flex items-center justify-between">
                  <span
                    className="glass-strong flex size-12 items-center justify-center rounded-xl"
                    style={{ color: `var(${accentVar[c.accent]})` }}
                  >
                    <CollectionIcon iconKey={c.iconKey} className="size-5" />
                  </span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {String(countByCollection(c.slug)).padStart(2, "0")} obras
                  </span>
                </div>
                <h2 className="group-hover:text-gradient font-display mt-5 text-xl font-semibold transition-colors">
                  {c.name}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  {c.description}
                </p>
                <span className="group-hover:text-foreground text-muted-foreground mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors">
                  Ver colección{" "}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
