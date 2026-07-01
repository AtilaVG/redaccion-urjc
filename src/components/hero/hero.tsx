"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Newspaper, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/animations/magnetic";
import { SplitText } from "@/components/animations/split-text";
import { siteConfig } from "@/lib/site";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const [show3D, setShow3D] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  const isLight = mounted && resolvedTheme === "light";
  const sceneBg = isLight ? "#faf7f4" : "#0a0507";
  const sceneVignette = isLight ? 0.4 : 0.85;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const smallScreen = window.matchMedia("(max-width: 640px)").matches;
    const lowCores =
      typeof navigator !== "undefined" &&
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency < 4;
    setMounted(true);
    if (!reduced && !smallScreen && !lowCores) setShow3D(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-background relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 3D scene or CSS fallback */}
      <motion.div style={{ scale: sceneScale }} className="absolute inset-0">
        {show3D ? (
          <HeroScene background={sceneBg} vignette={sceneVignette} />
        ) : (
          <div className="absolute inset-0">
            <div className="animate-pulse-glow absolute top-1/2 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--violet),transparent_70%)] blur-3xl" />
            <div className="animate-float absolute top-1/3 left-1/4 h-[40vmin] w-[40vmin] rounded-full bg-[radial-gradient(circle,var(--cyan),transparent_70%)] opacity-60 blur-3xl" />
          </div>
        )}
      </motion.div>

      {/* Vignette + grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_92%)]" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <Badge variant="live" className="gap-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="bg-crimson absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-crimson relative inline-flex h-2 w-2 rounded-full" />
            </span>
            ACCESO ABIERTO · {siteConfig.university}
          </Badge>
        </motion.div>

        <SplitText
          as="h1"
          type="chars"
          stagger={0.018}
          delay={0.35}
          onScroll={false}
          className="font-display text-foreground text-5xl leading-[0.95] font-bold text-balance drop-shadow-[0_2px_20px_var(--background)] sm:text-7xl md:text-8xl"
        >
          EDICIONES URJC
        </SplitText>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-foreground/75 mx-auto mt-6 max-w-2xl text-base text-pretty sm:text-lg"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <Button asChild size="lg" variant="primary" data-cursor="hover">
              <Link href="#colecciones">
                <Newspaper className="size-4" />
                Explorar el catálogo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Button asChild size="lg" variant="glass" data-cursor="hover">
              <Link href="/publica/normas-de-envio">
                <Sparkles className="size-4" />
                Publica con nosotros
              </Link>
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-foreground/50 absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
