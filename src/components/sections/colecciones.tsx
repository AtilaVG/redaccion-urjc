"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "./section-heading";
import {
  CollectionIcon,
  accentVar,
} from "@/components/collections/collection-icon";
import { collections, countByCollection } from "@/lib/collections";

export function Colecciones() {
  return (
    <section
      id="colecciones"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <SectionHeading
        kicker="Colecciones"
        title="Ocho universos del conocimiento URJC"
        description="Explora la producción académica de la universidad organizada por tipo de publicación."
        className="mb-14"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((c, i) => (
          <Reveal key={c.slug} i={i % 4}>
            <Link
              href={`/colecciones/${c.slug}`}
              data-cursor="hover"
              className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1"
              style={
                {
                  "--accent": `var(${accentVar[c.accent]})`,
                } as React.CSSProperties
              }
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  background: `radial-gradient(circle, var(${accentVar[c.accent]}), transparent 70%)`,
                }}
              />
              <span className="group-hover:border-garnet/40 pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500" />

              <div className="relative flex items-center justify-between">
                <span className="glass-strong flex size-12 items-center justify-center rounded-xl text-[var(--accent)]">
                  <CollectionIcon iconKey={c.iconKey} className="size-5" />
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {String(countByCollection(c.slug)).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold">
                {c.name}
              </h3>
              <p className="text-muted-foreground mt-2 flex-1 text-sm">
                {c.short}
              </p>
              <span className="group-hover:text-gradient mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors">
                Explorar
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
