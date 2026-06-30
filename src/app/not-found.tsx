import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-void relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--violet),transparent_70%)] opacity-30 blur-3xl" />
      <p className="text-cyan relative font-mono text-sm tracking-[0.4em] uppercase">
        Error 404
      </p>
      <h1 className="font-display text-gradient relative mt-4 text-7xl font-bold sm:text-9xl">
        Sin señal
      </h1>
      <p className="text-muted-foreground relative mt-4 max-w-md text-pretty">
        Esta historia se ha perdido en el ciberespacio del campus. Volvamos a la
        redacción.
      </p>
      <Button asChild className="relative mt-8">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  );
}
