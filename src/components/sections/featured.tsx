"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "./section-heading";
import { getFeatured, getCategory } from "@/lib/news";
import { formatDate } from "@/lib/utils";

export function Featured() {
  const [lead, ...rest] = getFeatured();
  if (!lead) return null;
  const leadCat = getCategory(lead.category);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        kicker="Portada"
        title="Lo que está marcando el campus"
        description="Reportajes destacados seleccionados por nuestra redacción jefa."
        className="mb-14"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lead story */}
        <Reveal>
          <Link
            href={`/noticias/${lead.slug}`}
            data-cursor="hover"
            className="group glass relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl p-7"
          >
            <Image
              src={lead.cover}
              alt={lead.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="from-void via-void/70 to-void/10 absolute inset-0 bg-gradient-to-t" />
            <div className="relative z-10">
              <div className="mb-4 flex gap-2">
                <Badge variant="crimson">{leadCat.name}</Badge>
                {lead.breaking && <Badge variant="live">Última hora</Badge>}
              </div>
              <h3 className="font-display max-w-xl text-3xl leading-tight font-bold text-balance text-white sm:text-4xl">
                {lead.title}
              </h3>
              <p className="mt-3 max-w-lg text-pretty text-white/70">
                {lead.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Image
                    src={lead.author.avatar}
                    alt={lead.author.name}
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                  {lead.author.name}
                </span>
                <span>{formatDate(lead.date)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" /> {lead.readingTime} min
                </span>
              </div>
            </div>
            <span className="glass-strong absolute top-6 right-6 z-10 flex size-11 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-5" />
            </span>
          </Link>
        </Reveal>

        {/* Secondary stories */}
        <div className="flex flex-col gap-6">
          {rest.map((article, i) => {
            const cat = getCategory(article.category);
            return (
              <Reveal key={article.slug} i={i + 1}>
                <Link
                  href={`/noticias/${article.slug}`}
                  data-cursor="hover"
                  className="group glass hover:bg-foreground/5 grid grid-cols-[140px_1fr] gap-4 overflow-hidden rounded-2xl p-3 transition-colors sm:grid-cols-[180px_1fr]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      sizes="180px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center pr-3">
                    <Badge variant="violet" className="w-fit">
                      {cat.name}
                    </Badge>
                    <h4 className="font-display group-hover:text-gradient mt-2 text-lg leading-snug font-semibold text-balance transition-colors">
                      {article.title}
                    </h4>
                    <span className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
                      <Clock className="size-3" /> {article.readingTime} min ·{" "}
                      {formatDate(article.date)}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
