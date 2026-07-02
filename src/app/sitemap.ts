import type { MetadataRoute } from "next";
import { collections, publications } from "@/lib/collections";
import { posts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/quienes-somos",
    "/colecciones",
    "/publica",
    "/publica/normas-de-envio",
    "/publica/normas-de-publicacion",
    "/recursos",
    "/contacto",
    "/blog",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "daily" : "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${base}/colecciones/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const publicationRoutes: MetadataRoute.Sitemap = publications.map((p) => ({
    url: `${base}/publicaciones/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...publicationRoutes,
    ...blogRoutes,
  ];
}
