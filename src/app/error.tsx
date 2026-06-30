"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-void flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-gradient text-4xl font-bold">
        Algo se ha cruzado en la señal
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md">
        Ha ocurrido un error inesperado. Puedes intentar recargar la sección.
      </p>
      <Button onClick={reset} className="mt-6">
        Reintentar
      </Button>
    </main>
  );
}
