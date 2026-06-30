import { Navbar } from "@/components/layout/navbar";
import { Ticker } from "@/components/layout/ticker";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/hero/hero";
import { Narrative } from "@/components/sections/narrative";
import { Featured } from "@/components/sections/featured";
import { Stats } from "@/components/sections/stats";
import { Categories } from "@/components/sections/categories";
import { NewsGrid } from "@/components/sections/news-grid";
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
        <Narrative />
        <Stats />
        <Categories />
        <NewsGrid />
        <Team />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
