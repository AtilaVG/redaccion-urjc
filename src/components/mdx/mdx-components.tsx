import type { MDXComponents } from "mdx/types";

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
  a: (props) => (
    <a
      className="text-cyan underline-offset-4 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  hr: () => <hr className="border-border/60 my-12 border-0 border-t" />,
};
