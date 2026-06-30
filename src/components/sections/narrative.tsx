"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ParticleField } from "@/components/effects/particle-field";

const beats = [
  {
    kicker: "01 — La señal",
    title: "Todo empieza con una pregunta",
    body: "En cada pasillo, en cada laboratorio y en cada asamblea hay una historia esperando ser contada. Nosotros la encontramos.",
  },
  {
    kicker: "02 — La misión",
    title: "Periodismo hecho por estudiantes",
    body: "Sin intermediarios. La comunidad universitaria toma el micrófono para narrar lo que de verdad importa en el campus.",
  },
  {
    kicker: "03 — El impacto",
    title: "Una redacción que se siente viva",
    body: "Tecnología inmersiva, datos abiertos y mirada crítica. Entrar aquí es entrar en el pulso de la URJC.",
  },
];

function Beat({
  i,
  progress,
  total,
  beat,
}: {
  i: number;
  progress: MotionValue<number>;
  total: number;
  beat: (typeof beats)[number];
}) {
  const seg = 1 / total;
  const start = i * seg;
  const opacity = useTransform(
    progress,
    [start, start + seg * 0.25, start + seg * 0.75, start + seg],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, start + seg], [60, -60]);
  const scale = useTransform(
    progress,
    [start, start + seg * 0.5, start + seg],
    [0.94, 1, 0.94],
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <span className="text-cyan mb-5 font-mono text-xs tracking-[0.4em] uppercase">
        {beat.kicker}
      </span>
      <h2 className="font-display max-w-4xl text-4xl leading-tight font-bold text-balance text-white sm:text-6xl md:text-7xl">
        {beat.title}
      </h2>
      <p className="mt-6 max-w-xl text-base text-pretty text-white/60 sm:text-lg">
        {beat.body}
      </p>
    </motion.div>
  );
}

export function Narrative() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="historia"
      ref={ref}
      className="bg-void relative h-[320vh]"
      aria-label="Manifiesto de la redacción"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <ParticleField className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--void)_85%)]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--violet)_40%,transparent),transparent_70%)] blur-3xl" />

        <div className="relative h-[60vh] w-full max-w-5xl">
          {beats.map((beat, i) => (
            <Beat
              key={i}
              i={i}
              beat={beat}
              progress={scrollYProgress}
              total={beats.length}
            />
          ))}
        </div>

        {/* progress rail */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {beats.map((_, i) => {
            const seg = 1 / beats.length;
            return (
              <Dot
                key={i}
                progress={scrollYProgress}
                start={i * seg}
                seg={seg}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Dot({
  progress,
  start,
  seg,
}: {
  progress: MotionValue<number>;
  start: number;
  seg: number;
}) {
  const w = useTransform(progress, [start, start + seg], [10, 36]);
  const opacity = useTransform(
    progress,
    [start - 0.05, start, start + seg, start + seg + 0.05],
    [0.3, 1, 1, 0.3],
  );
  return (
    <motion.span
      style={{ width: w, opacity }}
      className="from-cyan to-violet h-1.5 rounded-full bg-gradient-to-r"
    />
  );
}
