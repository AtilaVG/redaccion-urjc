"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NewsCard } from "@/components/news/news-card";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/animations/reveal";
import { categories, getLatest, type CategorySlug } from "@/lib/news";
import { cn } from "@/lib/utils";

type Filter = "all" | CategorySlug;

export function NewsGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const all = getLatest();
  const filtered =
    filter === "all" ? all : all.filter((a) => a.category === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "Todo" },
    ...categories.map((c) => ({ key: c.slug as Filter, label: c.name })),
  ];

  return (
    <section
      id="noticias"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker="Tablón"
          title="Las últimas del campus"
          description="Filtra por sección y sumérgete en la actualidad universitaria."
        />
      </div>

      {/* Filter pills */}
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
                  layoutId="filter-pill"
                  className="from-violet to-cyan absolute inset-0 -z-10 rounded-full bg-gradient-to-r"
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
          {filtered.map((article, i) => (
            <motion.div
              key={article.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
            >
              <NewsCard article={article} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
