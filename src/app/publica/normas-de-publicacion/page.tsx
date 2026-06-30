import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Prose } from "@/components/layout/prose";

export const metadata: Metadata = {
  title: "Normas de publicación",
  description:
    "Criterios editoriales, proceso de revisión por pares, ética editorial y derechos de autor en Ediciones URJC.",
};

export default function NormasPublicacionPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Publica con nosotros"
          title="Normas de publicación"
          description="Nuestros criterios editoriales y el proceso por el que pasa cada obra hasta su publicación en acceso abierto."
          back={{ href: "/publica", label: "Publica con nosotros" }}
        />
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Prose>
            <h2>Proceso de evaluación</h2>
            <p>
              Toda propuesta se somete a una revisión editorial inicial y,
              superada esta, a una{" "}
              <strong>revisión por pares doble ciego</strong> realizada por
              especialistas externos. El resultado puede ser aceptación,
              aceptación con modificaciones o rechazo razonado.
            </p>

            <h2>Criterios de calidad</h2>
            <ul>
              <li>Originalidad y relevancia de la aportación.</li>
              <li>Rigor metodológico y solidez de los resultados.</li>
              <li>Claridad expositiva y adecuación de las fuentes.</li>
              <li>Contribución al avance del conocimiento en su área.</li>
            </ul>

            <h2>Ética editorial</h2>
            <p>
              Seguimos las directrices del <strong>COPE</strong> (Committee on
              Publication Ethics). No se tolera el plagio, la fabricación o
              falsificación de datos ni las autorías ficticias. Cualquier
              conflicto de interés debe declararse.
            </p>

            <blockquote>
              La confianza en la ciencia se sostiene sobre la integridad de
              quienes la publican.
            </blockquote>

            <h2>Acceso abierto y licencias</h2>
            <p>
              Todas las obras se publican en acceso abierto bajo licencias{" "}
              <strong>Creative Commons</strong>, preferentemente CC BY 4.0. La
              autoría conserva sus derechos morales y autoriza la difusión y
              reutilización con atribución.
            </p>

            <h2>Identificadores y preservación</h2>
            <ul>
              <li>
                Asignación de <strong>DOI</strong> a cada publicación.
              </li>
              <li>
                Recomendación de vincular <strong>ORCID</strong> a la autoría.
              </li>
              <li>
                Preservación digital a largo plazo en el repositorio
                institucional.
              </li>
            </ul>

            <h2>Tasas</h2>
            <p>
              Ediciones URJC no aplica tasas de procesamiento de artículos (APC)
              a la comunidad universitaria. Publicar en abierto no debe depender
              de la capacidad de pago.
            </p>
          </Prose>
        </section>
      </main>
      <Footer />
    </>
  );
}
