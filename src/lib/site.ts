export const siteConfig = {
  name: "Ediciones URJC",
  shortName: "Ediciones",
  university: "Universidad Rey Juan Carlos",
  description:
    "El servicio de publicaciones de la Universidad Rey Juan Carlos. Revistas científicas, monografías, tesis y colecciones académicas en acceso abierto.",
  tagline: "Conocimiento abierto que deja huella",
  url: "https://redaccion-urjc.vercel.app",
  locale: "es-ES",
  ogImage: "/og.svg",
  external: {
    revistas: "https://revistas.urjc.es",
    monografias: "https://monografias.urjc.es",
  },
  links: {
    twitter: "https://twitter.com/urjc",
    instagram: "https://instagram.com/urjc",
    linkedin: "https://www.linkedin.com/school/universidad-rey-juan-carlos/",
    youtube: "https://www.youtube.com/@urjc",
    web: "https://www.urjc.es",
  },
  contact: {
    email: "ediciones@urjc.es",
    address: "Campus de Móstoles · C/ Tulipán s/n, 28933 Móstoles, Madrid",
  },
  keywords: [
    "Ediciones URJC",
    "Universidad Rey Juan Carlos",
    "publicaciones científicas",
    "revistas URJC",
    "monografías URJC",
    "acceso abierto",
    "tesis doctorales",
    "editorial universitaria",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
