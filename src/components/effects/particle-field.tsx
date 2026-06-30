"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

let enginePromise: Promise<void> | null = null;

export function ParticleField({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    if (!enginePromise) {
      enginePromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    }
    enginePromise.then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      background: { color: "transparent" },
      particles: {
        number: { value: 60, density: { enable: true } },
        color: { value: ["#c9a227", "#9e1b32", "#c8102e"] },
        links: {
          enable: true,
          color: "#9e1b32",
          distance: 140,
          opacity: 0.18,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.7,
          direction: "none",
          outModes: { default: "out" },
        },
        opacity: {
          value: { min: 0.2, max: 0.7 },
          animation: { enable: true, speed: 0.6, sync: false },
        },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.4 } },
        },
      },
    }),
    [],
  );

  if (!ready) return null;

  return <Particles id="tsparticles" options={options} className={className} />;
}
