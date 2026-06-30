"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "./section-heading";

const team = [
  {
    name: "Lucía Marín",
    role: "Redactora jefa",
    img: "https://i.pravatar.cc/240?img=47",
  },
  {
    name: "Diego Ferrer",
    role: "Tecnología",
    img: "https://i.pravatar.cc/240?img=12",
  },
  {
    name: "Noa Sánchez",
    role: "Cultura",
    img: "https://i.pravatar.cc/240?img=32",
  },
  {
    name: "Hugo Belmonte",
    role: "Deportes",
    img: "https://i.pravatar.cc/240?img=15",
  },
  {
    name: "Ariadna Vega",
    role: "Investigación",
    img: "https://i.pravatar.cc/240?img=5",
  },
  {
    name: "Mateo Ríos",
    role: "Audiovisual",
    img: "https://i.pravatar.cc/240?img=51",
  },
];

export function Team() {
  return (
    <section
      id="equipo"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <SectionHeading
        kicker="Equipo"
        title="Las voces detrás de la redacción"
        description="Estudiantes de toda la URJC que convierten la curiosidad en periodismo."
        align="center"
        className="mb-14 items-center"
      />

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {team.map((member, i) => (
          <Reveal key={member.name} i={i}>
            <motion.div
              whileHover={{ y: -6 }}
              data-cursor="hover"
              className="group glass relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="200px"
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="from-void absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="font-display text-sm font-semibold text-white">
                    {member.name}
                  </p>
                  <p className="text-cyan text-[11px]">{member.role}</p>
                </div>
              </div>
              <span className="group-hover:border-violet/50 pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
