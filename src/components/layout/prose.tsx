import { cn } from "@/lib/utils";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-foreground/85 max-w-none",
        "[&_h2]:font-display [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold",
        "[&_h3]:font-display [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold",
        "[&_p]:mt-5 [&_p]:leading-relaxed",
        "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_li]:leading-relaxed",
        "[&_strong]:text-foreground [&_strong]:font-semibold",
        "[&_a]:text-gold [&_a]:underline-offset-4 hover:[&_a]:underline",
        "[&_blockquote]:border-garnet [&_blockquote]:font-display [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:text-xl [&_blockquote]:italic",
        className,
      )}
    >
      {children}
    </div>
  );
}
