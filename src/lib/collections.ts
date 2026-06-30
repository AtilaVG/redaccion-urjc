export type CollectionSlug =
  | "investigacion"
  | "innovacion-docente"
  | "actas-de-congreso"
  | "tesis-doctorales"
  | "materiales-docentes"
  | "divulgacion"
  | "arte-y-cultura"
  | "institucional";

export type Accent = "garnet" | "gold" | "red" | "amber";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  short: string;
  description: string;
  iconKey: string;
  accent: Accent;
}

/** Orden solicitado por el área de publicaciones. */
export const collections: Collection[] = [
  {
    slug: "investigacion",
    name: "Investigación",
    short: "Ciencia revisada por pares",
    description:
      "Artículos y resultados de investigación originales evaluados por pares en todas las áreas de conocimiento de la URJC.",
    iconKey: "flask",
    accent: "garnet",
  },
  {
    slug: "innovacion-docente",
    name: "Innovación docente",
    short: "Nuevas formas de enseñar",
    description:
      "Experiencias, metodologías activas y proyectos que transforman la docencia universitaria.",
    iconKey: "lightbulb",
    accent: "gold",
  },
  {
    slug: "actas-de-congreso",
    name: "Actas de congreso",
    short: "Memoria de los encuentros",
    description:
      "Comunicaciones, ponencias y actas de congresos y jornadas científicas organizados en la universidad.",
    iconKey: "podium",
    accent: "red",
  },
  {
    slug: "tesis-doctorales",
    name: "Tesis doctorales",
    short: "Investigación de excelencia",
    description:
      "Tesis defendidas en los programas de doctorado de la URJC, en acceso abierto y con DOI.",
    iconKey: "cap",
    accent: "garnet",
  },
  {
    slug: "materiales-docentes",
    name: "Materiales docentes",
    short: "Recursos para el aula",
    description:
      "Manuales, guías, apuntes y recursos de aprendizaje elaborados por el profesorado.",
    iconKey: "book",
    accent: "amber",
  },
  {
    slug: "divulgacion",
    name: "Divulgación",
    short: "Ciencia para todos",
    description:
      "Contenidos que acercan el conocimiento científico a la sociedad con rigor y claridad.",
    iconKey: "megaphone",
    accent: "gold",
  },
  {
    slug: "arte-y-cultura",
    name: "Arte y cultura",
    short: "Creación y patrimonio",
    description:
      "Catálogos, ensayos y proyectos del ámbito artístico, humanístico y cultural de la comunidad URJC.",
    iconKey: "palette",
    accent: "red",
  },
  {
    slug: "institucional",
    name: "Institucional",
    short: "Documentación oficial",
    description:
      "Memorias, informes y publicaciones institucionales de la Universidad Rey Juan Carlos.",
    iconKey: "building",
    accent: "garnet",
  },
];

export type PublicationType =
  | "Artículo"
  | "Monografía"
  | "Tesis"
  | "Acta"
  | "Manual"
  | "Informe"
  | "Catálogo";

export interface Publication {
  slug: string;
  title: string;
  excerpt: string;
  collection: CollectionSlug;
  type: PublicationType;
  cover: string;
  authors: string[];
  date: string; // ISO
  doi?: string;
  pages?: number;
  featured?: boolean;
  isNew?: boolean;
}

export const publications: Publication[] = [
  {
    slug: "gemelos-digitales-campus-sostenible",
    title:
      "Gemelos digitales para la gestión energética de campus universitarios sostenibles",
    excerpt:
      "Una metodología basada en sensorización y simulación en tiempo real para reducir la huella energética de la universidad.",
    collection: "investigacion",
    type: "Artículo",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    authors: ["Ariadna Vega", "Diego Ferrer"],
    date: "2026-06-24",
    doi: "10.5281/urjc.2026.0241",
    pages: 28,
    featured: true,
    isNew: true,
  },
  {
    slug: "aula-invertida-ingenieria",
    title:
      "El aula invertida en los grados de ingeniería: tres años de evidencia",
    excerpt:
      "Resultados de la implantación del flipped classroom y su impacto en el rendimiento y la motivación del alumnado.",
    collection: "innovacion-docente",
    type: "Artículo",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    authors: ["Lucía Marín"],
    date: "2026-06-20",
    doi: "10.5281/urjc.2026.0238",
    pages: 19,
    featured: true,
    isNew: true,
  },
  {
    slug: "actas-congreso-ia-responsable",
    title:
      "Actas del I Congreso de Inteligencia Artificial Responsable (CIAR 2026)",
    excerpt:
      "Compilación de las comunicaciones presentadas en el primer encuentro nacional sobre ética y gobernanza de la IA.",
    collection: "actas-de-congreso",
    type: "Acta",
    cover:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
    authors: ["VV. AA."],
    date: "2026-06-15",
    doi: "10.5281/urjc.2026.0230",
    pages: 312,
    featured: true,
  },
  {
    slug: "tesis-microplasticos-tajo",
    title:
      "Presencia y dinámica de microplásticos en la cuenca media del río Tajo",
    excerpt:
      "Tesis doctoral que cartografía la contaminación por microplásticos y propone indicadores de seguimiento ambiental.",
    collection: "tesis-doctorales",
    type: "Tesis",
    cover:
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=1600&q=80",
    authors: ["Noa Sánchez"],
    date: "2026-06-10",
    doi: "10.5281/urjc.2026.0222",
    pages: 247,
    isNew: true,
  },
  {
    slug: "manual-estadistica-ciencias-sociales",
    title: "Manual práctico de estadística aplicada a las ciencias sociales",
    excerpt:
      "Recurso docente con ejercicios resueltos y conjuntos de datos abiertos para asignaturas de metodología.",
    collection: "materiales-docentes",
    type: "Manual",
    cover:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    authors: ["Hugo Belmonte", "Ariadna Vega"],
    date: "2026-06-05",
    pages: 164,
  },
  {
    slug: "divulgacion-cuantica-cotidiana",
    title: "La cuántica que ya usas: tecnología invisible en tu día a día",
    excerpt:
      "Un ensayo divulgativo que explica cómo la física cuántica sostiene buena parte de la tecnología cotidiana.",
    collection: "divulgacion",
    type: "Artículo",
    cover:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1600&q=80",
    authors: ["Diego Ferrer"],
    date: "2026-05-30",
  },
  {
    slug: "catalogo-arte-sonoro-campus",
    title: "Resonancias: catálogo de la exposición de arte sonoro del campus",
    excerpt:
      "Catálogo de la muestra que reunió instalaciones sonoras de estudiantes y artistas invitados.",
    collection: "arte-y-cultura",
    type: "Catálogo",
    cover:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
    authors: ["Noa Sánchez"],
    date: "2026-05-22",
    pages: 96,
  },
  {
    slug: "memoria-investigacion-2025",
    title: "Memoria de investigación y transferencia URJC 2025",
    excerpt:
      "Informe institucional con los principales indicadores de producción científica y transferencia del último año.",
    collection: "institucional",
    type: "Informe",
    cover:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    authors: ["Vicerrectorado de Investigación"],
    date: "2026-05-12",
    pages: 120,
  },
  {
    slug: "monografia-ciudades-15-minutos",
    title: "La ciudad de los 15 minutos: movilidad, equidad y proximidad",
    excerpt:
      "Monografía colectiva sobre el modelo urbano de proximidad y su aplicación en el área metropolitana de Madrid.",
    collection: "investigacion",
    type: "Monografía",
    cover:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    authors: ["Lucía Marín", "Hugo Belmonte"],
    date: "2026-05-04",
    doi: "10.5281/urjc.2026.0210",
    pages: 208,
  },
  {
    slug: "gamificacion-evaluacion-continua",
    title:
      "Gamificación y evaluación continua: diseño de experiencias en el aula",
    excerpt:
      "Guía con patrones de gamificación validados para mejorar la implicación en la evaluación formativa.",
    collection: "innovacion-docente",
    type: "Manual",
    cover:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    authors: ["Diego Ferrer"],
    date: "2026-04-26",
    pages: 88,
  },
];

export function getCollection(slug: CollectionSlug) {
  return collections.find((c) => c.slug === slug)!;
}

export function getPublication(slug: string) {
  return publications.find((p) => p.slug === slug);
}

export function getByCollection(slug: CollectionSlug) {
  return publications
    .filter((p) => p.collection === slug)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getLatest(limit?: number) {
  const sorted = [...publications].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getFeatured() {
  return publications.filter((p) => p.featured);
}

export function countByCollection(slug: CollectionSlug) {
  return publications.filter((p) => p.collection === slug).length;
}

export const stats = [
  { label: "Publicaciones en abierto", value: 1480, suffix: "+" },
  { label: "Revistas científicas", value: 24, suffix: "" },
  { label: "Descargas anuales", value: 96000, suffix: "+" },
  { label: "Autores y autoras", value: 2100, suffix: "+" },
];
