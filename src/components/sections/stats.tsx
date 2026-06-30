"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { stats } from "@/lib/collections";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  const formatted =
    value >= 1000 ? display.toLocaleString("es-ES") : String(display);

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-border/60 bg-card/30 relative border-y backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-16 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-gradient text-4xl font-bold sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="text-muted-foreground mt-2 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
