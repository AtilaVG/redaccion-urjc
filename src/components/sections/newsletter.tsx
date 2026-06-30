"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/animations/reveal";

const schema = z.object({
  name: z.string().min(2, "Dinos cómo te llamas"),
  email: z.string().email("Introduce un correo válido"),
  interest: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    // Simulated submission — wire to your API / Sanity / Resend here.
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Newsletter signup:", values);
    setDone(true);
    reset();
  }

  return (
    <section
      id="newsletter"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <div className="border-conic glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-14">
        {/* glow */}
        <div className="pointer-events-none absolute top-0 -left-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--violet),transparent_70%)] opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--cyan),transparent_70%)] opacity-30 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-cyan inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase">
              <Sparkles className="size-3.5" /> Newsletter
            </span>
            <h2 className="font-display mt-4 text-4xl leading-tight font-bold text-balance sm:text-5xl">
              Novedades editoriales en tu bandeja
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md text-pretty">
              Cada mes, las últimas publicaciones, convocatorias y recursos para
              autores de Ediciones URJC. Sin spam, solo conocimiento abierto.
            </p>
          </Reveal>

          <Reveal i={1}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass flex flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center"
                >
                  <span className="from-violet to-cyan flex size-14 items-center justify-center rounded-full bg-gradient-to-br text-white">
                    <Check className="size-7" />
                  </span>
                  <p className="font-display text-xl font-semibold">
                    ¡Bienvenido/a a la redacción!
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Te hemos apuntado. Revisa tu correo para confirmar.
                  </p>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => setDone(false)}
                  >
                    Suscribir otro correo
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="glass flex flex-col gap-4 rounded-2xl p-6"
                  noValidate
                >
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-crimson text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tucorreo@alumnos.urjc.es"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-crimson text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="interest">
                      Sección favorita (opcional)
                    </Label>
                    <Input
                      id="interest"
                      placeholder="Cultura, deportes, tecnología…"
                      {...register("interest")}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Enviando…
                      </>
                    ) : (
                      <>
                        <Mail className="size-4" /> Suscribirme
                      </>
                    )}
                  </Button>
                  <p className="text-muted-foreground text-center text-[11px]">
                    Al suscribirte aceptas nuestra política de privacidad.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
