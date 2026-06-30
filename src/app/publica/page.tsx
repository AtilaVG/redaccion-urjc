import type { Metadata } from "next";
import Link from "next/link";
import {
  ScrollText,
  BadgeCheck,
  ArrowRight,
  Library,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Publica con nosotros",
  description:
    "Todo lo que necesitas para publicar en Ediciones URJC: normas de envío, normas de publicación y acceso a nuestras plataformas.",
};

const cards = [
  {
    Icon: ScrollText,
    title: "Normas de envío",
    desc: "Cómo preparar y remitir tu manuscrito: formato, estructura, citas y materiales complementarios.",
    href: "/publica/normas-de-envio",
    external: false,
  },
  {
    Icon: BadgeCheck,
    title: "Normas de publicación",
    desc: "Criterios editoriales, proceso de revisión por pares, ética y derechos de autor.",
    href: "/publica/normas-de-publicacion",
    external: false,
  },
  {
    Icon: Library,
    title: "Enviar a una revista",
    desc: "Accede al portal de revistas científicas en OJS.",
    href: siteConfig.external.revistas,
    external: true,
  },
  {
    Icon: BookOpen,
    title: "Proponer una monografía",
    desc: "Accede a la plataforma de libros y monografías en OMP.",
    href: siteConfig.external.monografias,
    external: true,
  },
];

export default function PublicaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Publica con nosotros"
          title="Convierte tu investigación en publicación"
          description="Te acompañamos en cada paso del proceso editorial, desde el envío del manuscrito hasta su difusión en acceso abierto."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                data-cursor="hover"
                className="group glass flex flex-col gap-4 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="from-garnet to-red flex size-12 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                  <c.Icon className="size-5" />
                </span>
                <h2 className="group-hover:text-gradient font-display text-xl font-semibold transition-colors">
                  {c.title}
                </h2>
                <p className="text-muted-foreground flex-1 text-sm">{c.desc}</p>
                <span className="text-gold inline-flex items-center gap-1 text-sm font-medium">
                  {c.external ? "Ir a la plataforma" : "Leer normas"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
