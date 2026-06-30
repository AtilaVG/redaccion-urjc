"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    // Only on devices with a fine pointer (desktop) and no reduced motion
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(
          target.closest("a, button, [data-cursor='hover'], input, textarea"),
        ),
      );
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="bg-cyan pointer-events-none fixed top-0 left-0 z-[200] -mt-1 -ml-1 h-2 w-2 rounded-full mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="border-violet/70 pointer-events-none fixed top-0 left-0 z-[200] -mt-5 -ml-5 h-10 w-10 rounded-full border mix-blend-difference"
      />
    </>
  );
}
