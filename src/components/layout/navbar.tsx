"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const links = [
  { href: "#noticias", label: "Noticias" },
  { href: "#secciones", label: "Secciones" },
  { href: "#historia", label: "Historia" },
  { href: "#equipo", label: "Equipo" },
];

export function Navbar() {
  const { menuOpen, setMenuOpen, toggleMenu } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
            scrolled ? "glass-strong shadow-lg" : "bg-transparent",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            data-cursor="hover"
          >
            <span className="from-violet to-cyan flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-[0_0_20px_-4px_var(--violet)]">
              <Radio className="size-4" />
            </span>
            <span className="font-display text-sm font-bold tracking-tight">
              REDACCIÓN<span className="text-gradient"> URJC</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="text-muted-foreground hover:text-foreground rounded-full px-4 py-2 text-sm transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <Button
              asChild
              size="sm"
              variant="primary"
              className="hidden sm:inline-flex"
            >
              <Link href="#newsletter">Suscríbete</Link>
            </Button>
            <button
              type="button"
              aria-label="Menú"
              onClick={toggleMenu}
              className="glass flex size-10 items-center justify-center rounded-full md:hidden"
            >
              {menuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-void/95 fixed inset-0 z-[80] flex flex-col items-center justify-center gap-2 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl font-semibold text-white/90"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex items-center gap-3">
              <ThemeToggle />
              <Button
                asChild
                variant="primary"
                onClick={() => setMenuOpen(false)}
              >
                <Link href="#newsletter">Suscríbete</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
