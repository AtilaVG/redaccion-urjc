"use client";

import { ArrowUpRight, BookOpen, Library } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "./section-heading";
import { siteConfig } from "@/lib/site";

const items = [
  {
    title: "Revistas",
    desc: "Más de 20 revistas científicas en acceso abierto sobre la plataforma OJS. Envía, consulta y descarga artículos revisados por pares.",
    href: siteConfig.external.revistas,
    host: "revistas.urjc.es",
    Icon: Library,
  },
  {
    title: "Monografías",
    desc: "Libros académicos, manuales y monografías colectivas en la plataforma OMP, con DOI y descarga libre en PDF y ePub.",
    href: siteConfig.external.monografias,
    host: "monografias.urjc.es",
    Icon: BookOpen,
  },
];

export function Catalogo() {
  return (
    <section
      id="catalogo"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <SectionHeading
        kicker="Catálogo"
        title="Dos plataformas, todo el conocimiento"
        description="Accede a las plataformas oficiales de publicación de la Universidad Rey Juan Carlos."
        align="center"
        className="mb-14 items-center"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.title} i={i}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group glass-strong border-conic relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10"
            >
              <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-[radial-gradient(circle,var(--garnet),transparent_70%)] opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40" />

              <div className="relative flex items-center justify-between">
                <span className="from-garnet to-red flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-[0_8px_30px_-8px_var(--garnet)]">
                  <item.Icon className="size-7" />
                </span>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-6 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <h3 className="font-display mt-6 text-3xl font-bold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-3 flex-1 text-pretty">
                {item.desc}
              </p>
              <span className="text-gold mt-6 inline-flex items-center gap-2 font-mono text-sm">
                {item.host}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
