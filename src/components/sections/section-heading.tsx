import { SplitText } from "@/components/animations/split-text";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="text-cyan inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase">
          <span className="bg-cyan/60 h-px w-8" />
          {kicker}
        </span>
      </Reveal>
      <SplitText
        as="h2"
        type="words"
        className="font-display max-w-3xl text-4xl leading-tight font-bold text-balance sm:text-5xl"
      >
        {title}
      </SplitText>
      {description && (
        <Reveal i={1}>
          <p className="text-muted-foreground max-w-xl text-pretty">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
