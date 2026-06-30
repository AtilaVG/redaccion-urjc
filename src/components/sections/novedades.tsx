"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PublicationCard } from "@/components/collections/publication-card";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { collections, getLatest, type CollectionSlug } from "@/lib/collections";
import { cn } from "@/lib/utils";

type Filter = "all" | CollectionSlug;

export function Novedades() {
  const [filter, setFilter] = useState<Filter>("all");
  const all = getLatest();
  const filtered =
    filter === "all" ? all : all.filter((p) => p.collection === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Todas" },
    ...collections.map((c) => ({ key: c.slug as Filter, label: c.name })),
  ];

  return (
    <section
      id="novedades"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker="Novedades"
          title="Lo último publicado en abierto"
          description="Filtra por colección y descubre las incorporaciones más recientes al catálogo."
        />
        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex"
        >
          <Link href="/colecciones">
            Ver todas las colecciones <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <Reveal className="mt-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              data-cursor="hover"
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                filter === f.key
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="novedades-pill"
                  className="from-garnet to-red absolute inset-0 -z-10 rounded-full bg-gradient-to-r"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((publication, i) => (
            <motion.div
              key={publication.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            >
              <PublicationCard publication={publication} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
