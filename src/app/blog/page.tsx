import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { getLatestPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guías, consejos y novedades sobre publicación académica, acceso abierto e identidad digital del investigador.",
};

export default function BlogPage() {
  const posts = getLatestPosts();

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          kicker="Blog"
          title="Ideas en abierto"
          description="Guías prácticas y reflexiones sobre publicación académica, acceso abierto y comunicación científica."
        />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-cursor="hover"
                className="group glass flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_var(--garnet)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    priority={i < 3}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="from-void/70 absolute inset-0 bg-gradient-to-t to-transparent" />
                  <Badge variant="gold" className="absolute top-4 left-4">
                    {post.tag}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="group-hover:text-gradient font-display text-lg leading-snug font-semibold text-balance transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="text-muted-foreground border-border/60 mt-5 flex items-center justify-between border-t pt-4 text-[11px]">
                    <span>
                      {post.author} · {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {post.readingTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
