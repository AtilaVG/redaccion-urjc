"use client";

import { createElement, useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface SplitTextProps {
  children: string;
  as?: Tag;
  className?: string;
  /** Reveal type */
  type?: "words" | "chars" | "lines";
  /** Stagger between units in seconds */
  stagger?: number;
  delay?: number;
  /** Trigger on scroll instead of on mount */
  onScroll?: boolean;
}

export function SplitText({
  children,
  as = "h2",
  className,
  type = "words",
  stagger = 0.04,
  delay = 0,
  onScroll = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const split = new SplitType(el, {
      types:
        type === "lines" ? "lines" : type === "chars" ? "words,chars" : "words",
    });
    const targets =
      type === "chars"
        ? split.chars
        : type === "lines"
          ? split.lines
          : split.words;

    if (!targets || reduced) {
      gsap.set(el, { autoAlpha: 1 });
      return () => split.revert();
    }

    gsap.set(el, { autoAlpha: 1 });
    const tween = gsap.from(targets, {
      yPercent: 120,
      opacity: 0,
      rotateX: -40,
      duration: 0.9,
      ease: "power4.out",
      stagger,
      delay,
      scrollTrigger: onScroll
        ? { trigger: el, start: "top 85%", once: true }
        : undefined,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [children, type, stagger, delay, onScroll]);

  return createElement(
    as,
    {
      ref,
      className: cn("invisible [perspective:800px]", className),
      style: { transformStyle: "preserve-3d" as const },
    },
    children,
  );
}
