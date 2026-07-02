import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Code2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleLayout } from "@/components/content/article-layout";
import { getEntries, getEntry } from "@/lib/content";
import { getMdxBody } from "@/lib/mdx";
import { withBasePath } from "@/lib/utils";

interface NamedLink {
  name: string;
  url: string;
  kind?: string;
}

export function generateStaticParams() {
  return getEntries("fichas").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("fichas", slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.excerpt };
}

function LinkList({ title, links }: { title: string; links: NamedLink[] }) {
  if (!links.length) return null;
  return (
    <div>
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {title}
      </p>
      <ul className="mt-1.5 space-y-1">
        {links.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="text-cyan text-sm underline-offset-4 hover:underline"
            >
              {l.name || l.url}
              {l.kind === "video" ? " (vídeo)" : ""}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function FichaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("fichas", slug);
  if (!entry) notFound();

  const body = (await getMdxBody("fichas", slug)) ?? "";
  const extra = entry.extra as {
    website?: string;
    website_es?: string;
    source?: string;
    licenses?: { name: string; url?: string }[];
    installs?: NamedLink[];
    tutorials?: NamedLink[];
    screenshots?: { name?: string; file: string }[];
  };

  const asArray = <T,>(v: T[] | undefined | null): T[] =>
    Array.isArray(v) ? v : [];
  const licenses = asArray(extra.licenses).filter((l) => l && l.name);
  const installs = asArray(extra.installs).filter((l) => l && l.url);
  const tutorials = asArray(extra.tutorials).filter((l) => l && l.url);
  const screenshots = asArray(extra.screenshots).filter((s) => s && s.file);

  return (
    <ArticleLayout
      entry={entry}
      body={body}
      backHref="/fichas"
      backLabel="Volver a fichas"
    >
      <div className="glass mb-10 grid gap-5 rounded-2xl p-6">
        <div className="flex flex-wrap gap-3">
          {extra.website && (
            <Button asChild variant="primary" size="sm">
              <a href={extra.website} target="_blank" rel="noreferrer">
                <Globe className="size-4" /> Sitio web
              </a>
            </Button>
          )}
          {extra.website_es && (
            <Button asChild variant="outline" size="sm">
              <a href={extra.website_es} target="_blank" rel="noreferrer">
                <Globe className="size-4" /> Web en español
              </a>
            </Button>
          )}
          {extra.source && (
            <Button asChild variant="outline" size="sm">
              <a href={extra.source} target="_blank" rel="noreferrer">
                <Code2 className="size-4" /> Código fuente
              </a>
            </Button>
          )}
        </div>

        {licenses.length > 0 && (
          <p className="text-sm">
            <span className="text-muted-foreground">Licencia:</span>{" "}
            {licenses.map((l, i) => (
              <span key={l.name}>
                {i > 0 && ", "}
                {l.url ? (
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan underline-offset-4 hover:underline"
                  >
                    {l.name}
                  </a>
                ) : (
                  l.name
                )}
              </span>
            ))}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {installs.length > 0 && (
            <LinkList title="Cómo instalarlo" links={installs} />
          )}
          {tutorials.length > 0 && (
            <LinkList title="Tutoriales" links={tutorials} />
          )}
        </div>
      </div>

      {screenshots.length > 0 && (
        <div className="mb-10 grid gap-4">
          {screenshots.map((s) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.file}
              src={withBasePath(s.file)}
              alt={s.name ?? entry.title}
              loading="lazy"
              className="border-border/60 w-full rounded-2xl border"
            />
          ))}
        </div>
      )}
    </ArticleLayout>
  );
}
