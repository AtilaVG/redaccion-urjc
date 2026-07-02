export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string; // ISO
  tag: string;
  readingTime: number;
}

export const posts: BlogPost[] = [
  {
    slug: "que-es-el-acceso-abierto",
    title:
      "Acceso abierto explicado: qué significa publicar en abierto y por qué importa",
    excerpt:
      "Rutas verde y dorada, licencias Creative Commons y el impacto real de liberar el conocimiento.",
    cover:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
    author: "Equipo Ediciones URJC",
    date: "2026-06-26",
    tag: "Acceso abierto",
    readingTime: 6,
  },
  {
    slug: "como-elegir-revista",
    title:
      "Cómo elegir la revista adecuada para tu artículo (y evitar las depredadoras)",
    excerpt:
      "Una guía práctica para encontrar el medio idóneo y reconocer señales de alerta antes de enviar tu trabajo.",
    cover:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=80",
    author: "Lucía Marín",
    date: "2026-06-18",
    tag: "Consejos",
    readingTime: 7,
  },
  {
    slug: "identificadores-orcid-doi",
    title:
      "ORCID, DOI y Handle: los identificadores que tu investigación necesita",
    excerpt:
      "Qué son, para qué sirven y cómo te ayudan a ganar visibilidad y atribución como autor o autora.",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    author: "Diego Ferrer",
    date: "2026-06-09",
    tag: "Identidad digital",
    readingTime: 5,
  },
  {
    slug: "datos-de-investigacion-fair",
    title:
      "Datos FAIR: publica tus datos de investigación para que cuenten de verdad",
    excerpt:
      "Principios Findable, Accessible, Interoperable y Reusable aplicados al día a día del investigador.",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    author: "Ariadna Vega",
    date: "2026-05-28",
    tag: "Datos abiertos",
    readingTime: 8,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getLatestPosts(limit?: number) {
  const sorted = [...posts].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
