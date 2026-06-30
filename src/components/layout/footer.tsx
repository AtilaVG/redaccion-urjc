import Link from "next/link";
import { Radio, Code2, Camera, AtSign, ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/news";

export function Footer() {
  return (
    <footer className="border-border/60 bg-void relative overflow-hidden border-t">
      <div className="via-violet pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[60vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--violet),transparent_70%)] opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="from-violet to-cyan flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-white">
                <Radio className="size-4" />
              </span>
              <span className="font-display text-base font-bold">
                REDACCIÓN<span className="text-gradient"> URJC</span>
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm text-sm">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: AtSign, href: siteConfig.links.twitter },
                { icon: Camera, href: siteConfig.links.instagram },
                { icon: Code2, href: siteConfig.links.github },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="glass hover:bg-foreground/10 flex size-10 items-center justify-center rounded-full transition-colors"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold">Secciones</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/secciones/${c.slug}`}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold">Redacción</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Sobre nosotros", href: "#historia" },
                { label: "Equipo", href: "#equipo" },
                { label: "Newsletter", href: "#newsletter" },
                { label: "Contacto", href: "#newsletter" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border/60 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {siteConfig.name}. Proyecto estudiantil
            · {siteConfig.university}.
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
