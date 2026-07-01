import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ReadingProgress } from "@/components/news/reading-progress";
import { posts, getPost } from "@/lib/blog";
import { getMdxBody } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.cover, width: 1200, height: 630 }],
    },
  };
}

const fallbackBody = `
Estamos terminando de redactar este artículo. Vuelve pronto para leer el texto
completo del blog de **Ediciones URJC**.
`;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const body = (await getMdxBody("blog", slug)) ?? fallbackBody;

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <article className="relative">
        <header className="bg-void relative flex min-h-[60vh] items-end overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div className="from-void via-void/75 to-void/30 absolute inset-0 bg-gradient-to-t" />
          <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b to-transparent" />
          <div className="grid-lines absolute inset-0 opacity-30" />
          <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-32 pb-14">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" /> Volver al blog
            </Link>
            <Badge variant="gold" className="mb-4">
              {post.tag}
            </Badge>
            <h1 className="font-display text-3xl leading-[1.08] font-bold text-balance text-white sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/70">
              <span>{post.author}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {post.readingTime} min
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-lg">
            <MDXRemote source={body} components={mdxComponents} />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
