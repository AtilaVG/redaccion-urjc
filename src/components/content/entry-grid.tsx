import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ContentEntry } from "@/lib/content";
import { formatDate } from "@/lib/utils";

/** Rejilla de tarjetas para los listados de secciones migradas de OfiLibre. */
export function EntryGrid({
  entries,
  hrefBase,
  showMeta = true,
}: {
  entries: ContentEntry[];
  hrefBase: string;
  showMeta?: boolean;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry, i) => (
        <Link
          key={entry.slug}
          href={`${hrefBase}/${entry.slug}`}
          data-cursor="hover"
          className="group glass flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_var(--garnet)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={entry.cover}
              alt={entry.title}
              fill
              priority={i < 3}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            />
            <Badge variant="gold" className="absolute top-4 left-4">
              {entry.tag}
            </Badge>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h2 className="group-hover:text-gradient font-display text-lg leading-snug font-semibold text-balance transition-colors">
              {entry.title}
            </h2>
            {entry.excerpt && (
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                {entry.excerpt}
              </p>
            )}
            {showMeta && (
              <div className="text-muted-foreground border-border/60 mt-5 flex items-center justify-between border-t pt-4 text-[11px]">
                <span>
                  {entry.date ? formatDate(entry.date) : entry.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" /> {entry.readingTime} min
                </span>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
