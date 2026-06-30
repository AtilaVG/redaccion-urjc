<div align="center">

# 🛰️ Redacción URJC

### Donde el campus se convierte en historia

Una experiencia web inmersiva de nivel _Awwwards_ para el medio digital de los
estudiantes de la **Universidad Rey Juan Carlos**. Mezcla un portal de noticias
premium, una experiencia interactiva en 3D y la pantalla inicial de un
videojuego AAA.

</div>

---

## ✨ Características

- **Hero cinematográfico en 3D** — orbe de energía con shaders GLSL (ruido
  simplex + fresnel), campo de estrellas, fragmentos flotantes, rig de cámara
  con parallax y postprocesado (Bloom, aberración cromática, viñeta).
- **Scroll narrativo** — manifiesto con _storytelling_ por capítulos sobre un
  campo de partículas interactivo (tsParticles).
- **Glassmorphism** y bordes cónicos animados en toda la interfaz.
- **Tarjetas con hover 3D** — tilt con perspectiva real y _glare_ dinámico.
- **Animaciones de texto** con SplitType + GSAP ScrollTrigger.
- **Smooth scrolling** con Lenis sincronizado con GSAP.
- **Microinteracciones**: cursor personalizado, botones magnéticos, contadores
  animados, barra de progreso de lectura, ticker de última hora.
- **Modo claro/oscuro** con `next-themes`.
- **Noticias y artículos en MDX** con rutas estáticas (SSG).
- **Formulario** de newsletter con React Hook Form + Zod.
- **SEO completo**: metadata, Open Graph, Twitter cards, JSON-LD (NewsArticle),
  sitemap y robots dinámicos, manifest PWA.
- **Accesibilidad y rendimiento**: respeta `prefers-reduced-motion`, degrada el
  3D en móviles/dispositivos modestos y carga la escena de forma diferida.

## 🧱 Stack

| Área         | Tecnologías                                                               |
| ------------ | ------------------------------------------------------------------------- |
| Framework    | Next.js 15 (App Router) · TypeScript · React 19                           |
| Estilos      | Tailwind CSS v4 · shadcn/ui · Lucide · next-themes                        |
| Animación    | GSAP + ScrollTrigger · Motion · Lenis · SplitType                         |
| 3D / efectos | React Three Fiber · three.js · drei · postprocessing · GLSL · tsParticles |
| Datos        | MDX (`next-mdx-remote`) · contenido tipado                                |
| Estado/forms | Zustand · React Hook Form · Zod                                           |
| Calidad      | ESLint · Prettier · Husky · lint-staged                                   |

## 🚀 Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Comando             | Descripción            |
| ------------------- | ---------------------- |
| `npm run dev`       | Servidor de desarrollo |
| `npm run build`     | Build de producción    |
| `npm run start`     | Sirve el build         |
| `npm run lint`      | ESLint                 |
| `npm run typecheck` | Comprobación de tipos  |
| `npm run format`    | Formatea con Prettier  |

## 📝 Añadir una noticia

1. Añade los metadatos del artículo en `src/lib/news.ts`.
2. Crea el cuerpo en `content/noticias/<slug>.mdx`.

La ruta `/noticias/<slug>` se genera estáticamente de forma automática.

## ☁️ Deploy

Optimizado para **Vercel** (cero configuración). También compatible con Netlify.

```bash
# Vercel
npx vercel --prod
```

Recuerda actualizar `siteConfig.url` en `src/lib/site.ts` con tu dominio final.

---

<div align="center">
Proyecto estudiantil · Universidad Rey Juan Carlos
</div>
