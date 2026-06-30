import { Navbar } from "@/components/layout/navbar";
import { Ticker } from "@/components/layout/ticker";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/hero/hero";
import { Narrative } from "@/components/sections/narrative";
import { Featured } from "@/components/sections/featured";
import { Catalogo } from "@/components/sections/catalogo";
import { Stats } from "@/components/sections/stats";
import { Colecciones } from "@/components/sections/colecciones";
import { Novedades } from "@/components/sections/novedades";
import { PublicaCTA } from "@/components/sections/publica-cta";
import { Team } from "@/components/sections/team";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Ticker />
        <Featured />
        <Catalogo />
        <Narrative />
        <Stats />
        <Colecciones />
        <Novedades />
        <PublicaCTA />
        <Team />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
