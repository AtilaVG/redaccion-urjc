import type { MDXComponents } from "mdx/types";
import { withBasePath } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-display mt-12 scroll-mt-24 text-2xl font-bold sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-display mt-8 text-xl font-semibold" {...props} />
  ),
  p: (props) => (
    <p className="text-foreground/85 mt-5 leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul
      className="text-foreground/85 mt-5 list-disc space-y-2 pl-6"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="text-foreground/85 mt-5 list-decimal space-y-2 pl-6"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-violet font-display text-foreground/90 my-8 border-l-2 pl-6 text-xl italic"
      {...props}
    />
  ),
  a: ({ href, ...props }) => {
    const internal =
      typeof href === "string" &&
      (href.startsWith("/") || href.startsWith("#"));
    return (
      <a
        className="text-cyan underline-offset-4 hover:underline"
        {...(internal ? {} : { target: "_blank", rel: "noreferrer" })}
        href={typeof href === "string" ? withBasePath(href) : href}
        {...props}
      />
    );
  },
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="border-border/60 my-8 w-full rounded-2xl border"
      src={typeof src === "string" ? withBasePath(src) : src}
      alt={alt ?? ""}
      loading="lazy"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  hr: () => <hr className="border-border/60 my-12 border-0 border-t" />,
};
