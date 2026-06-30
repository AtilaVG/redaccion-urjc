import Link from "next/link";
import {
  BookOpenText,
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import {
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social";
import { siteConfig } from "@/lib/site";
import { collections } from "@/lib/collections";

const socials = [
  { Icon: XIcon, href: siteConfig.links.twitter, label: "X" },
  { Icon: InstagramIcon, href: siteConfig.links.instagram, label: "Instagram" },
  { Icon: LinkedInIcon, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { Icon: YouTubeIcon, href: siteConfig.links.youtube, label: "YouTube" },
];

const columns = [
  {
    title: "Colecciones",
    links: collections.slice(0, 6).map((c) => ({
      label: c.name,
      href: `/colecciones/${c.slug}`,
      external: false,
    })),
  },
  {
    title: "Catálogo",
    links: [
      { label: "Revistas", href: siteConfig.external.revistas, external: true },
      {
        label: "Monografías",
        href: siteConfig.external.monografias,
        external: true,
      },
      { label: "Blog", href: "/blog", external: false },
    ],
  },
  {
    title: "Publica",
    links: [
      {
        label: "Normas de envío",
        href: "/publica/normas-de-envio",
        external: false,
      },
      {
        label: "Normas de publicación",
        href: "/publica/normas-de-publicacion",
        external: false,
      },
      { label: "Recursos para autores", href: "/recursos", external: false },
      { label: "Quiénes somos", href: "/quienes-somos", external: false },
      { label: "Contacto", href: "/contacto", external: false },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-void border-border/60 relative overflow-hidden border-t">
      <div className="via-garnet pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[60vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--garnet),transparent_70%)] opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="from-garnet to-red flex size-9 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                <BookOpenText className="size-4" />
              </span>
              <span className="font-display text-base font-bold">
                EDICIONES<span className="text-gradient"> URJC</span>
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm text-sm">
              {siteConfig.description}
            </p>
            <div className="text-muted-foreground mt-5 space-y-2 text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-foreground flex items-center gap-2 transition-colors"
              >
                <Mail className="size-4" /> {siteConfig.contact.email}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {siteConfig.contact.address}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className="glass hover:bg-foreground/10 hover:text-garnet flex size-10 items-center justify-center rounded-xl transition-colors"
                >
                  <s.Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
                    >
                      {l.label}
                      {l.external && <ArrowUpRight className="size-3.5" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border/60 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {siteConfig.name} ·{" "}
            {siteConfig.university}. Acceso abierto.
          </p>
          <a
            href="#top"
            data-cursor="hover"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs transition-colors"
          >
            Volver arriba <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
