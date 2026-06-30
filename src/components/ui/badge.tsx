import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-foreground/5 text-foreground/80",
        glass: "glass text-foreground/90",
        cyan: "border-cyan/30 bg-cyan/10 text-cyan",
        violet: "border-violet/30 bg-violet/10 text-violet",
        crimson: "border-crimson/30 bg-crimson/10 text-crimson",
        gold: "border-gold/40 bg-gold/10 text-gold",
        red: "border-red/40 bg-red/10 text-red",
        live: "border-red/40 bg-red/15 text-red",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
