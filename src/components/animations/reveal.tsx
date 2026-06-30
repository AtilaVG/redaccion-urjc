"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 38, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** index for stagger */
  i?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  i = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      custom={i + delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
