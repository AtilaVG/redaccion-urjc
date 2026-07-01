"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  onDark = false,
}: {
  className?: string;
  /** When rendered over an always-dark surface (e.g. the hero), keep it light. */
  onDark?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme !== "light" : true;

  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      data-cursor="hover"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-xl transition-colors",
        onDark
          ? "border border-white/15 bg-white/5 text-white hover:bg-white/10"
          : "glass hover:bg-foreground/5",
        className,
      )}
    >
      <Sun
        className={cn(
          "absolute size-4 transition-all duration-500",
          isDark
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute size-4 transition-all duration-500",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
