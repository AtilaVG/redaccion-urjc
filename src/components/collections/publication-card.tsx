"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Publication, getCollection } from "@/lib/collections";
import { formatDate, cn } from "@/lib/utils";

const accentBadge = {
  garnet: "violet",
  gold: "cyan",
  red: "crimson",
  amber: "default",
} as const;

export function PublicationCard({
  publication,
  priority = false,
  className,
}: {
  publication: Publication;
  priority?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const collection = getCollection(publication.collection);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
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
          href={`/publicaciones/${publication.slug}`}
          onMouseMove={onMove}
          onMouseLeave={reset}
          data-cursor="hover"
          className="glass relative flex h-full flex-col overflow-hidden rounded-xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_var(--garnet)]"
        >
          <motion.div
            aria-hidden
            style={{
              background: `radial-gradient(180px circle at ${glareX} ${glareY}, color-mix(in oklab, var(--gold) 26%, transparent), transparent 60%)`,
            }}
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={publication.cover}
              alt={publication.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="from-void via-void/30 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge variant={accentBadge[collection.accent]}>
                {collection.name}
              </Badge>
              {publication.isNew && <Badge variant="live">Novedad</Badge>}
            </div>
            <span className="glass-strong absolute top-4 right-4 rounded-full px-2.5 py-1 text-[11px] font-medium">
              {publication.type}
            </span>
          </div>

          <div
            className="flex flex-1 flex-col p-5"
            style={{ transform: "translateZ(40px)" }}
          >
            <h3 className="group-hover:text-gradient font-display text-lg leading-snug font-semibold text-balance transition-colors">
              {publication.title}
            </h3>
            <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
              {publication.excerpt}
            </p>

            <div className="text-muted-foreground border-border/60 mt-5 flex items-center justify-between border-t pt-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5" />
                <span className="line-clamp-1">
                  {publication.authors.join(", ")}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                {publication.pages && (
                  <>
                    <FileText className="size-3" />
                    {publication.pages} p.
                  </>
                )}
              </span>
            </div>
            <span className="text-muted-foreground mt-1 text-[11px]">
              {formatDate(publication.date)}
            </span>
          </div>

          <span className="glass-strong absolute top-1/2 right-4 z-20 flex size-9 translate-y-2 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="text-foreground size-4" />
          </span>
        </Link>
      </motion.div>
    </motion.article>
  );
}
