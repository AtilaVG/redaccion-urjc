import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  kicker,
  title,
  description,
  back,
  children,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  back?: { href: string; label: string };
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "bg-background border-border/60 relative overflow-hidden border-b",
        className,
      )}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,var(--garnet),transparent_65%)] opacity-25 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 pt-36 pb-16 sm:pt-40">
        {back && (
          <Link
            href={back.href}
            className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" /> {back.label}
          </Link>
        )}
        {kicker && (
          <span className="text-gold font-mono text-xs tracking-[0.3em] uppercase">
            {kicker}
          </span>
        )}
        <h1 className="font-display text-foreground mt-3 text-4xl leading-[1.05] font-bold text-balance sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg text-pretty">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
