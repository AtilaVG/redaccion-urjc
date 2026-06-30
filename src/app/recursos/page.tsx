import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  FileText,
  Video,
  Wrench,
  HelpCircle,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Recursos para autores",
  description:
    "Guías, plantillas, formación y herramientas para acompañarte en el proceso de publicación académica.",
};

const resources = [
  {
    Icon: GraduationCap,
    title: "Formación para autores",
    desc: "Sesiones y talleres sobre escritura científica, acceso abierto y visibilidad de la investigación.",
    href: "/contacto",
  },
  {
    Icon: FileText,
    title: "Plantillas y guías",
    desc: "Plantillas de manuscrito, guía de estilo y listas de comprobación antes del envío.",
    href: "/publica/normas-de-envio",
  },
  {
    Icon: Video,
    title: "Webinars grabados",
    desc: "Biblioteca de seminarios sobre métricas, identificadores y derechos de autor.",
    href: "/blog",
  },
  {
    Icon: Wrench,
    title: "Herramientas útiles",
    desc: "Gestores bibliográficos, ORCID, DOAJ y recursos para datos de investigación.",
    href: "/blog/identificadores-orcid-doi",
  },
  {
    Icon: ShieldCheck,
    title: "Ética y buenas prácticas",
    desc: "Directrices COPE, integridad académica y prevención del plagio.",
    href: "/publica/normas-de-publicacion",
  },
  {
    Icon: HelpCircle,
    title: "Preguntas frecuentes",
    desc: "Resolvemos las dudas más habituales sobre el proceso editorial.",
    href: "/contacto",
  },
];

export default function RecursosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Recursos"
          title="Formación y apoyo para autores"
          description="Todo lo que necesitas para publicar mejor: guías, plantillas, formación y herramientas seleccionadas por nuestro equipo."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                data-cursor="hover"
                className="group glass flex flex-col gap-4 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="from-garnet to-red flex size-12 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                  <r.Icon className="size-5" />
                </span>
                <h2 className="group-hover:text-gradient font-display text-lg font-semibold transition-colors">
                  {r.title}
                </h2>
                <p className="text-muted-foreground flex-1 text-sm">{r.desc}</p>
                <span className="text-gold inline-flex items-center gap-1 text-sm font-medium">
                  Acceder
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
