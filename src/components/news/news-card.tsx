"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Article, getCategory } from "@/lib/news";
import { formatDate, cn } from "@/lib/utils";

const accentMap = {
  cyan: "cyan",
  violet: "violet",
  crimson: "crimson",
  amber: "default",
} as const;

export function NewsCard({
  article,
  priority = false,
  className,
}: {
  article: Article;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const category = getCategory(article.category);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      style={{ perspective: 1000 }}
      className={cn("group h-full", className)}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Link
          ref={ref}
          href={`/noticias/${article.slug}`}
          onMouseMove={onMove}
          onMouseLeave={reset}
          data-cursor="hover"
          className="glass relative flex h-full flex-col overflow-hidden rounded-xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_var(--violet)]"
        >
          {/* Glare */}
          <motion.div
            aria-hidden
            style={{
              background: `radial-gradient(180px circle at ${glareX} ${glareY}, color-mix(in oklab, var(--cyan) 28%, transparent), transparent 60%)`,
            }}
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {/* Cover */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.cover}
              alt={article.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="from-void via-void/30 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant={accentMap[category.accent]}>
                {category.name}
              </Badge>
              {article.breaking && <Badge variant="live">Última hora</Badge>}
            </div>
          </div>

          {/* Body */}
          <div
            className="flex flex-1 flex-col p-5"
            style={{ transform: "translateZ(40px)" }}
          >
            <h3 className="font-display text-foreground group-hover:text-gradient text-lg leading-snug font-semibold text-balance transition-colors">
              {article.title}
            </h3>
            <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
              {article.excerpt}
            </p>

            <div className="border-border/60 mt-5 flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={28}
                  height={28}
                  className="ring-border rounded-full ring-1"
                />
                <div className="leading-tight">
                  <p className="text-foreground text-xs font-medium">
                    {article.author.name}
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    {formatDate(article.date)}
                  </p>
                </div>
              </div>
              <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                <Clock className="size-3" />
                {article.readingTime} min
              </span>
            </div>
          </div>

          <span className="glass-strong absolute top-4 right-4 z-20 flex size-9 translate-y-2 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="text-foreground size-4" />
          </span>
        </Link>
      </motion.div>
    </motion.article>
  );
}
