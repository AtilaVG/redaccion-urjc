"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Dinos cómo te llamas"),
  email: z.string().email("Introduce un correo válido"),
  subject: z.string().min(3, "Indica un asunto"),
  message: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres)"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Contacto:", values);
    setDone(true);
    reset();
  }

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass flex flex-col items-center justify-center gap-4 rounded-2xl p-12 text-center"
        >
          <span className="from-garnet to-red flex size-14 items-center justify-center rounded-full bg-gradient-to-br text-white">
            <Check className="size-7" />
          </span>
          <p className="font-display text-xl font-semibold">
            ¡Mensaje enviado!
          </p>
          <p className="text-muted-foreground text-sm">
            Gracias por escribirnos. Te responderemos lo antes posible.
          </p>
          <Button variant="glass" size="sm" onClick={() => setDone(false)}>
            Enviar otro mensaje
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass flex flex-col gap-4 rounded-2xl p-6 sm:p-8"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" {...register("name")} />
              {errors.name && (
                <p className="text-red text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@urjc.es"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              placeholder="¿En qué podemos ayudarte?"
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-red text-xs">{errors.subject.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Mensaje</Label>
            <textarea
              id="message"
              rows={5}
              placeholder="Escribe tu mensaje…"
              className="border-input bg-background/40 placeholder:text-muted-foreground focus-visible:border-garnet focus-visible:ring-ring/40 flex w-full resize-none rounded-xl border px-4 py-3 text-sm shadow-sm backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-red text-xs">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Enviando…
              </>
            ) : (
              <>
                <Send className="size-4" /> Enviar mensaje
              </>
            )}
          </Button>
          <p className="text-muted-foreground text-center text-[11px]">
            Al enviar aceptas nuestra política de privacidad.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
