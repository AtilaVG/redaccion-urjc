"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
  BookOpenText,
  ArrowUpRight,
  Library,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-3"
      >
        <nav
          className={cn(
            "flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500",
            scrolled || openIdx !== null
              ? "glass-strong shadow-xl"
              : "bg-transparent",
          )}
          onMouseLeave={() => setOpenIdx(null)}
        >
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="from-garnet to-red flex size-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-[0_0_20px_-4px_var(--garnet)]">
              <BookOpenText className="size-4" />
            </span>
            <span className="font-display text-sm leading-none font-bold tracking-tight">
              EDICIONES
              <span className="text-gradient"> URJC</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center xl:flex">
            {navItems.map((item, i) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isOpen={openIdx === i}
                onOpen={() => setOpenIdx(i)}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="primary"
              className="hidden sm:inline-flex"
            >
              <Link href="/publica/normas-de-envio">Publicar</Link>
            </Button>
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen(true)}
              className="glass flex size-10 items-center justify-center rounded-xl xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function DesktopNavItem({
  item,
  isOpen,
  onOpen,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const hasChildren = !!item.children?.length;

  if (!hasChildren) {
    return (
      <Link
        href={item.href ?? "#"}
        onMouseEnter={onOpen}
        data-cursor="hover"
        className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-2 text-[13px] font-medium transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onOpen}>
      <button
        type="button"
        data-cursor="hover"
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
          isOpen
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2",
              item.variant === "catalog" ? "w-[420px]" : "w-[340px]",
            )}
          >
            <div className="glass-strong border-conic overflow-hidden rounded-2xl p-2 shadow-2xl">
              {item.variant === "catalog" ? (
                <CatalogPanel item={item} />
              ) : (
                <ListPanel item={item} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ListPanel({ item }: { item: NavItem }) {
  return (
    <div className="grid gap-0.5">
      {item.href && (
        <Link
          href={item.href}
          className="text-gradient hover:bg-foreground/5 mb-1 rounded-xl px-3 py-2 text-xs font-semibold tracking-wide uppercase"
        >
          Ver todo
        </Link>
      )}
      {item.children!.map((leaf) => (
        <Link
          key={leaf.label}
          href={leaf.href}
          {...(leaf.external ? { target: "_blank", rel: "noreferrer" } : {})}
          className="group hover:bg-foreground/5 flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors"
        >
          <div className="flex-1">
            <p className="group-hover:text-gradient flex items-center gap-1 text-sm font-medium transition-colors">
              {leaf.label}
              {leaf.external && <ArrowUpRight className="size-3.5" />}
            </p>
            {leaf.description && (
              <p className="text-muted-foreground mt-0.5 text-xs">
                {leaf.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

function CatalogPanel({ item }: { item: NavItem }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {item.children!.map((leaf) => (
        <a
          key={leaf.label}
          href={leaf.href}
          target="_blank"
          rel="noreferrer"
          className="group glass relative flex flex-col gap-2 overflow-hidden rounded-xl p-4 transition-transform hover:-translate-y-0.5"
        >
          <span className="from-garnet to-red flex size-10 items-center justify-center rounded-lg bg-gradient-to-br text-white">
            <Library className="size-5" />
          </span>
          <p className="font-display flex items-center gap-1 text-base font-semibold">
            {leaf.label}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </p>
          <p className="text-muted-foreground text-xs">{leaf.description}</p>
        </a>
      ))}
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-void/95 fixed inset-0 z-[95] overflow-y-auto backdrop-blur-xl xl:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-display text-sm font-bold">
              EDICIONES<span className="text-gradient"> URJC</span>
            </span>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={onClose}
              className="glass flex size-10 items-center justify-center rounded-xl"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-5 pb-10">
            {navItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const isExpanded = expanded === item.label;
              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    onClick={onClose}
                    className="font-display border-border/40 border-b py-4 text-2xl font-semibold"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="border-border/40 border-b">
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                    className="font-display flex w-full items-center justify-between py-4 text-2xl font-semibold"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-5 transition-transform",
                        isExpanded && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pb-3 pl-3">
                          {item.href && (
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="text-gradient py-2 text-sm font-semibold uppercase"
                            >
                              Ver todo
                            </Link>
                          )}
                          {item.children!.map((leaf) => (
                            <Link
                              key={leaf.label}
                              href={leaf.href}
                              onClick={onClose}
                              {...(leaf.external
                                ? { target: "_blank", rel: "noreferrer" }
                                : {})}
                              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 py-2 text-base"
                            >
                              {leaf.label}
                              {leaf.external && (
                                <ArrowUpRight className="size-4" />
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div className="mt-6">
              <Button asChild variant="primary" onClick={onClose}>
                <Link href="/publica/normas-de-envio">
                  Publicar con nosotros
                </Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
