import type { Metadata } from "next";
import { Target, Eye, HeartHandshake, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Team } from "@/components/sections/team";
import { Stats } from "@/components/sections/stats";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Ediciones URJC es el servicio de publicaciones de la Universidad Rey Juan Carlos. Conoce nuestra misión, valores y equipo.",
};

const values = [
  {
    Icon: Target,
    title: "Misión",
    text: "Editar y difundir la producción científica y docente de la URJC con los más altos estándares de calidad.",
  },
  {
    Icon: Eye,
    title: "Visión",
    text: "Ser una editorial universitaria de referencia en acceso abierto, cercana a quienes investigan y enseñan.",
  },
  {
    Icon: HeartHandshake,
    title: "Compromiso",
    text: "Rigor en la evaluación, cuidado en la edición y respeto absoluto por la autoría y la ciencia abierta.",
  },
  {
    Icon: Sparkles,
    title: "Valores",
    text: "Apertura, integridad, accesibilidad y vocación de servicio a la comunidad universitaria.",
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Quiénes somos"
          title="La editorial de la Universidad Rey Juan Carlos"
          description="Acompañamos a la comunidad universitaria en todo el proceso de publicación: del manuscrito a la difusión internacional en acceso abierto."
        />

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass flex flex-col gap-4 rounded-2xl p-6"
              >
                <span className="from-garnet to-red flex size-12 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                  <v.Icon className="size-5" />
                </span>
                <h2 className="font-display text-lg font-semibold">
                  {v.title}
                </h2>
                <p className="text-muted-foreground text-sm">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="glass-strong mt-12 grid gap-8 rounded-3xl p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Una editorial al servicio del conocimiento
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4 text-pretty">
              <p>
                Ediciones URJC nace para dar voz a la investigación y la
                docencia que se produce cada día en la Universidad Rey Juan
                Carlos. Editamos revistas científicas, monografías, actas, tesis
                y materiales docentes con un compromiso firme con el acceso
                abierto.
              </p>
              <p>
                Creemos que el conocimiento financiado con fondos públicos debe
                volver a la sociedad sin barreras. Por eso, cada obra que
                publicamos nace con DOI, preservación a largo plazo y licencias
                que facilitan su difusión y reutilización.
              </p>
            </div>
          </div>
        </section>

        <Stats />
        <Team />
      </main>
      <Footer />
    </>
  );
}
