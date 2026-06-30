"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  GraduationCap,
  FlaskConical,
  Palette,
  Trophy,
  Cpu,
  MessageSquareQuote,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "./section-heading";
import { categories, getByCategory, type CategorySlug } from "@/lib/news";

const icons: Record<CategorySlug, LucideIcon> = {
  campus: GraduationCap,
  investigacion: FlaskConical,
  cultura: Palette,
  deportes: Trophy,
  tecnologia: Cpu,
  opinion: MessageSquareQuote,
};

const accentGlow: Record<string, string> = {
  cyan: "group-hover:shadow-[0_30px_80px_-30px_var(--cyan)] group-hover:border-cyan/40",
  violet:
    "group-hover:shadow-[0_30px_80px_-30px_var(--violet)] group-hover:border-violet/40",
  crimson:
    "group-hover:shadow-[0_30px_80px_-30px_var(--crimson)] group-hover:border-crimson/40",
  amber:
    "group-hover:shadow-[0_30px_80px_-30px_var(--amber)] group-hover:border-amber/40",
};

export function Categories() {
  return (
    <section
      id="secciones"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <SectionHeading
        kicker="Secciones"
        title="Explora cada universo de la redacción"
        description="Seis frentes informativos, una misma obsesión: contar la URJC como nadie."
        className="mb-14"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => {
          const Icon = icons[cat.slug];
          const count = getByCategory(cat.slug).length;
          return (
            <Reveal key={cat.slug} i={i}>
              <Link
                href={`/secciones/${cat.slug}`}
                data-cursor="hover"
                className={`group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${accentGlow[cat.accent]}`}
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(circle, var(--${cat.accent}), transparent 70%)`,
                    opacity: 0.12,
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="glass-strong flex size-12 items-center justify-center rounded-xl">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-muted-foreground font-mono text-xs">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold">
                  {cat.name}
                </h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm">
                  {cat.description}
                </p>
                <span className="text-foreground/80 group-hover:text-gradient mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors">
                  Ver sección
                  <motion.span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
