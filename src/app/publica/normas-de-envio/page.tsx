import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Prose } from "@/components/layout/prose";

export const metadata: Metadata = {
  title: "Normas de envío",
  description:
    "Requisitos de formato, estructura y procedimiento para enviar tu manuscrito a Ediciones URJC.",
};

export default function NormasEnvioPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Publica con nosotros"
          title="Normas de envío"
          description="Sigue estas indicaciones para preparar y remitir tu manuscrito. Un envío bien preparado agiliza la evaluación."
          back={{ href: "/publica", label: "Publica con nosotros" }}
        />
        <section className="mx-auto max-w-3xl px-6 py-16">
          <Prose>
            <h2>Antes de enviar</h2>
            <p>
              Comprueba que tu trabajo es original, inédito y que no se
              encuentra en evaluación en ningún otro medio. Todas las personas
              autoras deben conocer y aprobar el envío.
            </p>

            <h2>Formato del manuscrito</h2>
            <ul>
              <li>
                Documento en formato <strong>.docx</strong> u{" "}
                <strong>.odt</strong>, sin datos identificativos para la
                revisión ciega.
              </li>
              <li>
                Tipografía de cuerpo 12, interlineado 1,5 y márgenes de 2,5 cm.
              </li>
              <li>
                Figuras y tablas numeradas, con título y fuente, y también en
                archivo aparte en alta resolución.
              </li>
              <li>
                Extensión orientativa: 6.000–8.000 palabras para artículos.
              </li>
            </ul>

            <h2>Estructura recomendada</h2>
            <ol>
              <li>
                Título, resumen (máx. 250 palabras) y de 4 a 6 palabras clave.
              </li>
              <li>Introducción y objetivos.</li>
              <li>Metodología.</li>
              <li>Resultados y discusión.</li>
              <li>Conclusiones.</li>
              <li>Referencias bibliográficas.</li>
            </ol>

            <h2>Citas y referencias</h2>
            <p>
              Utiliza un estilo de citación reconocido (APA, Chicago o el propio
              de tu disciplina) de forma coherente en todo el texto. Incluye DOI
              en las referencias siempre que esté disponible.
            </p>

            <blockquote>
              Un manuscrito claro y bien estructurado es la mejor carta de
              presentación de tu investigación.
            </blockquote>

            <h2>Cómo enviarlo</h2>
            <p>
              Los artículos se remiten a través del portal{" "}
              <a
                href="https://revistas.urjc.es"
                target="_blank"
                rel="noreferrer"
              >
                revistas.urjc.es
              </a>{" "}
              y las propuestas de libro a través de{" "}
              <a
                href="https://monografias.urjc.es"
                target="_blank"
                rel="noreferrer"
              >
                monografias.urjc.es
              </a>
              . Si tienes dudas, escríbenos a{" "}
              <a href="mailto:ediciones@urjc.es">ediciones@urjc.es</a>.
            </p>
          </Prose>
        </section>
      </main>
      <Footer />
    </>
  );
}
