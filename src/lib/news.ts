export type CategorySlug =
  | "campus"
  | "investigacion"
  | "cultura"
  | "deportes"
  | "tecnologia"
  | "opinion";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  accent: "cyan" | "violet" | "crimson" | "amber";
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  cover: string;
  author: Author;
  date: string; // ISO
  readingTime: number; // minutes
  featured?: boolean;
  breaking?: boolean;
}

export const categories: Category[] = [
  {
    slug: "campus",
    name: "Campus",
    description:
      "La vida que late en Móstoles, Vicálvaro, Alcorcón y Fuenlabrada.",
    accent: "crimson",
  },
  {
    slug: "investigacion",
    name: "Investigación",
    description:
      "Ciencia, becas y proyectos que nacen en los laboratorios URJC.",
    accent: "cyan",
  },
  {
    slug: "cultura",
    name: "Cultura",
    description: "Música, cine, libros y la escena creativa estudiantil.",
    accent: "violet",
  },
  {
    slug: "deportes",
    name: "Deportes",
    description: "Competiciones universitarias, fichajes y gestas del campus.",
    accent: "amber",
  },
  {
    slug: "tecnologia",
    name: "Tecnología",
    description:
      "IA, gaming, startups y el futuro digital contado por estudiantes.",
    accent: "cyan",
  },
  {
    slug: "opinion",
    name: "Opinión",
    description: "Columnas, debates y la voz crítica de la comunidad URJC.",
    accent: "violet",
  },
];

const authors: Record<string, Author> = {
  lucia: {
    name: "Lucía Marín",
    role: "Redactora jefa",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  diego: {
    name: "Diego Ferrer",
    role: "Sección Tecnología",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  noa: {
    name: "Noa Sánchez",
    role: "Cultura & sociedad",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
  hugo: {
    name: "Hugo Belmonte",
    role: "Deportes",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
  ariadna: {
    name: "Ariadna Vega",
    role: "Investigación",
    avatar: "https://i.pravatar.cc/120?img=5",
  },
};

export const articles: Article[] = [
  {
    slug: "laboratorio-ia-urjc-campus-inteligente",
    title:
      "El laboratorio que convierte el campus de Móstoles en una ciudad inteligente",
    excerpt:
      "Un equipo de estudiantes de Ingeniería despliega sensores y gemelos digitales para optimizar la energía del campus en tiempo real.",
    category: "investigacion",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    author: authors.ariadna,
    date: "2026-06-24",
    readingTime: 7,
    featured: true,
    breaking: true,
  },
  {
    slug: "festival-cortos-vicalvaro",
    title:
      "Vicálvaro se convierte en plató: nace el festival de cortos de la URJC",
    excerpt:
      "Tres días de proyecciones, talleres y realidad virtual reúnen a más de 2.000 estudiantes alrededor del cine independiente.",
    category: "cultura",
    cover:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
    author: authors.noa,
    date: "2026-06-21",
    readingTime: 5,
    featured: true,
  },
  {
    slug: "esports-urjc-liga-universitaria",
    title:
      "Los esports de la URJC se clasifican para la final nacional universitaria",
    excerpt:
      "El equipo de la facultad debuta en la máxima categoría y ya sueña con representar a España en el circuito europeo.",
    category: "deportes",
    cover:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    author: authors.hugo,
    date: "2026-06-19",
    readingTime: 4,
    featured: true,
  },
  {
    slug: "inteligencia-artificial-aula",
    title:
      "IA en el aula: cómo los estudiantes URJC reescriben la forma de aprender",
    excerpt:
      "Profesores y alumnos diseñan juntos un protocolo de uso responsable de la inteligencia artificial generativa.",
    category: "tecnologia",
    cover:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    author: authors.diego,
    date: "2026-06-17",
    readingTime: 6,
  },
  {
    slug: "voluntariado-fuenlabrada",
    title: "Mil manos: el voluntariado estudiantil que transforma Fuenlabrada",
    excerpt:
      "Una red de estudiantes coordina apoyo escolar, banco de alimentos y acompañamiento a mayores del barrio.",
    category: "campus",
    cover:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
    author: authors.lucia,
    date: "2026-06-14",
    readingTime: 5,
  },
  {
    slug: "opinion-universidad-publica",
    title:
      "La universidad pública no es un gasto, es la mejor inversión que tenemos",
    excerpt:
      "Una reflexión sobre el valor del conocimiento abierto en tiempos de matrículas al alza y futuro incierto.",
    category: "opinion",
    cover:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    author: authors.lucia,
    date: "2026-06-11",
    readingTime: 4,
  },
];

export const stats = [
  { label: "Lectores mensuales", value: 48000, suffix: "+" },
  { label: "Redactores activos", value: 120, suffix: "" },
  { label: "Reportajes publicados", value: 1450, suffix: "" },
  { label: "Premios universitarios", value: 9, suffix: "" },
];

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)!;
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getFeatured() {
  return articles.filter((a) => a.featured);
}

export function getLatest(limit?: number) {
  const sorted = [...articles].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getByCategory(slug: CategorySlug) {
  return articles.filter((a) => a.category === slug);
}
