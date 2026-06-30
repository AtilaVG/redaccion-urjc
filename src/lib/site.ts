export const siteConfig = {
  name: "Redacción URJC",
  shortName: "Redacción",
  university: "Universidad Rey Juan Carlos",
  description:
    "El medio digital de los estudiantes de la Universidad Rey Juan Carlos. Periodismo inmersivo, investigación y cultura del campus contados como nunca antes.",
  tagline: "Donde el campus se convierte en historia",
  url: "https://redaccion-urjc.vercel.app",
  locale: "es-ES",
  ogImage: "/og.svg",
  links: {
    twitter: "https://twitter.com/urjc",
    instagram: "https://instagram.com/urjc",
    github: "https://github.com/AtilaVG",
  },
  keywords: [
    "Redacción URJC",
    "Universidad Rey Juan Carlos",
    "periódico universitario",
    "noticias campus",
    "periodismo digital",
    "estudiantes URJC",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
