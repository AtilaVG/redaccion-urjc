import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import {
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/icons/social";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "¿Tienes una propuesta o una duda sobre publicación? Escríbenos al equipo de Ediciones URJC.",
};

const socials = [
  { Icon: XIcon, href: siteConfig.links.twitter, label: "X" },
  { Icon: InstagramIcon, href: siteConfig.links.instagram, label: "Instagram" },
  { Icon: LinkedInIcon, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { Icon: YouTubeIcon, href: siteConfig.links.youtube, label: "YouTube" },
];

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Contacto"
          title="Hablemos de tu próxima publicación"
          description="Estamos aquí para resolver tus dudas sobre el proceso editorial, propuestas de obra o cualquier consulta."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col gap-6">
              <div className="glass flex items-start gap-4 rounded-2xl p-6">
                <span className="from-garnet to-red flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="font-display font-semibold">Correo</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              <div className="glass flex items-start gap-4 rounded-2xl p-6">
                <span className="from-garnet to-red flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="font-display font-semibold">Dónde estamos</p>
                  <p className="text-muted-foreground text-sm">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
              <div className="glass flex items-start gap-4 rounded-2xl p-6">
                <span className="from-garnet to-red flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white">
                  <Clock className="size-5" />
                </span>
                <div>
                  <p className="font-display font-semibold">Atención</p>
                  <p className="text-muted-foreground text-sm">
                    Lunes a viernes · 9:00 – 14:00
                  </p>
                </div>
              </div>

              <div className="glass flex items-center justify-between gap-4 rounded-2xl p-6">
                <p className="text-muted-foreground text-sm">Síguenos</p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="glass hover:text-garnet hover:bg-foreground/10 flex size-10 items-center justify-center rounded-xl transition-colors"
                    >
                      <s.Icon className="size-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
