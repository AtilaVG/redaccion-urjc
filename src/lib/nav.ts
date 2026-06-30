import { collections } from "./collections";
import { siteConfig } from "./site";

export interface NavLeaf {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href?: string;
  /** Dropdown children */
  children?: NavLeaf[];
  /** Render children as a two-button "catalog" panel */
  variant?: "list" | "catalog";
}

export const navItems: NavItem[] = [
  { label: "Quiénes somos", href: "/quienes-somos" },
  {
    label: "Colecciones",
    href: "/colecciones",
    variant: "list",
    children: collections.map((c) => ({
      label: c.name,
      href: `/colecciones/${c.slug}`,
      description: c.short,
    })),
  },
  {
    label: "Catálogo",
    variant: "catalog",
    children: [
      {
        label: "Revistas",
        href: siteConfig.external.revistas,
        description: "Revistas científicas en OJS · revistas.urjc.es",
        external: true,
      },
      {
        label: "Monografías",
        href: siteConfig.external.monografias,
        description: "Libros y monografías en OMP · monografias.urjc.es",
        external: true,
      },
    ],
  },
  {
    label: "Publica con nosotros",
    href: "/publica",
    variant: "list",
    children: [
      {
        label: "Normas de envío",
        href: "/publica/normas-de-envio",
        description: "Cómo preparar y remitir tu manuscrito",
      },
      {
        label: "Normas de publicación",
        href: "/publica/normas-de-publicacion",
        description: "Criterios editoriales y proceso de evaluación",
      },
    ],
  },
  { label: "Recursos", href: "/recursos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];
