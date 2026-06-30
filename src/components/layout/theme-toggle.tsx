"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme !== "light";

  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      data-cursor="hover"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "glass hover:bg-foreground/5 relative flex size-10 items-center justify-center rounded-full transition-colors",
        className,
      )}
    >
      {mounted && (
        <>
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
        </>
      )}
    </button>
  );
}
