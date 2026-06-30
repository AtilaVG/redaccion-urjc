"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileUp, ScrollText, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

const steps = [
  {
    Icon: ScrollText,
    title: "Normas de envío",
    desc: "Prepara tu manuscrito según nuestras plantillas y requisitos.",
  },
  {
    Icon: BadgeCheck,
    title: "Normas de publicación",
    desc: "Conoce los criterios editoriales y el proceso de revisión por pares.",
  },
];

export function PublicaCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="border-conic glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-14">
        <div className="pointer-events-none absolute top-0 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--garnet),transparent_70%)] opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--gold),transparent_70%)] opacity-25 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-gold inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase">
              <FileUp className="size-3.5" /> Publica con nosotros
            </span>
            <h2 className="font-display mt-4 text-4xl leading-tight font-bold text-balance sm:text-5xl">
              ¿Tienes una investigación que merece ser leída?
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md text-pretty">
              Publica en acceso abierto con el respaldo del servicio de
              publicaciones de la URJC: visibilidad, DOI, preservación y
              difusión internacional.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/publica/normas-de-envio">
                  Empezar a publicar <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link href="/recursos">Recursos para autores</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal i={1}>
            <div className="grid gap-4">
              {steps.map((s) => (
                <motion.div
                  key={s.title}
                  whileHover={{ x: 6 }}
                  className="glass flex items-start gap-4 rounded-2xl p-5"
                >
                  <span className="from-garnet to-red flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                    <s.Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-display font-semibold">{s.title}</p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
