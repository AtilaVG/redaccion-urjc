import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Antepone el basePath (GitLab Pages sirve el sitio bajo /<proyecto>/) a las
 * rutas absolutas de assets locales. Las URLs externas se devuelven tal cual.
 */
export function withBasePath(src: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return base && src.startsWith("/") && !src.startsWith(`${base}/`)
    ? `${base}${src}`
    : src;
}

export function formatDate(iso: string, locale = "es-ES") {
  return new Date(iso).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
