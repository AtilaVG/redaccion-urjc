/**
 * Migra el contenido de OfiLibre (Hugo, content/spanish/*) al formato MDX con
 * frontmatter de este proyecto (content/<seccion>/<slug>.mdx).
 *
 * Uso:  node scripts/migrate-ofilibre-content.mjs <ruta-repo-hugo>
 *
 * Secciones: blog, guias, acciones, pres, catalogo, fichas.
 * - Copia bajo public/media/ solo los assets realmente referenciados
 *   (local/ del repo Hugo pesa >1 GB, no se copia entero).
 * - Sanea el markdown para que MDX lo acepte (br/img sin cerrar, anclas
 *   {#id}, comentarios HTML, autolinks, style="..." como string, shortcodes).
 * - Los campos extra de frontmatter (slides, licenses, tutorials, author,
 *   department, ...) se conservan tal cual, reescribiendo rutas de assets.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";

/** Motor YAML tolerante: admite claves duplicadas (gana la última), como Hugo. */
const MATTER_OPTS = {
  engines: {
    yaml: { parse: (str) => yaml.load(str, { json: true }) ?? {} },
  },
};

const HUGO_ROOT = process.argv[2];
if (!HUGO_ROOT || !fs.existsSync(path.join(HUGO_ROOT, "content"))) {
  console.error(
    "Uso: node scripts/migrate-ofilibre-content.mjs <ruta-repo-hugo>",
  );
  process.exit(1);
}

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const SRC_ROOT = path.join(HUGO_ROOT, "content", "spanish");
const OUT_ROOT = path.join(PROJECT_ROOT, "content");
const OUT_MEDIA = path.join(PROJECT_ROOT, "public", "media");

const SECTIONS = ["blog", "guias", "acciones", "pres", "catalogo", "fichas"];

/** Claves de frontmatter Hugo que se mapean a campos comunes (no se copian). */
const MAPPED_KEYS = new Set([
  "title",
  "description",
  "image",
  "date",
  "categories",
  "tags",
  "type",
  "slug",
  "draft",
]);

/** Assets a copiar: ruta origen absoluta -> ruta destino absoluta */
const assetsToCopy = new Map();
const missingAssets = new Set();

/**
 * Rutas absolutas del sitio Hugo -> ruta pública nueva bajo /media.
 * Devuelve la ruta reescrita, registrando la copia pendiente.
 */
function rewriteAssetPath(url) {
  const clean = url.replace(/\/+$/, ""); // p.ej. "/local/images/CC.png/" (typo)
  // Los enlaces pueden venir URL-encodeados ("%20"); en disco hay espacios.
  const fsRel = decodeURIComponent(clean);
  let srcFile = null;
  let publicPath = null;

  if (clean.startsWith("/local/")) {
    srcFile = path.join(HUGO_ROOT, fsRel);
    publicPath = "/media" + clean.slice("/local".length);
  } else if (/^\/(blog|documentos|consejo-pa|images)\//.test(clean)) {
    srcFile = path.join(HUGO_ROOT, "static", fsRel);
    publicPath = "/media" + clean;
  } else {
    return url; // externo o ruta interna de sección: no tocar
  }

  if (!fs.existsSync(srcFile)) {
    missingAssets.add(clean);
    return publicPath; // reescribimos igualmente; se avisa al final
  }
  // En disco el fichero se guarda decodificado (el servidor decodifica la URL).
  assetsToCopy.set(
    srcFile,
    path.join(
      OUT_MEDIA,
      decodeURIComponent(publicPath.slice("/media/".length)),
    ),
  );
  return publicPath;
}

/** ¿La ruta apunta a un fichero (asset) y no a una página interna? */
function looksLikeAsset(url) {
  return (
    url.startsWith("/local/") ||
    /\.[a-z0-9]{2,5}$/i.test(url.replace(/\/+$/, ""))
  );
}

/** Reescribe rutas de assets en cualquier valor de frontmatter, recursivo. */
function deepRewrite(value) {
  if (typeof value === "string") {
    // Solo assets; los enlaces internos de página (p.ej. url: /blog/x) se dejan.
    return value.startsWith("/") && looksLikeAsset(value)
      ? rewriteAssetPath(value)
      : value;
  }
  if (Array.isArray(value)) return value.map(deepRewrite);
  if (value && typeof value === "object" && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepRewrite(v)]),
    );
  }
  return value;
}

/** Convierte el shortcode {{< image ... >}} de Hugo en markdown + créditos. */
function convertImageShortcode(body) {
  return body.replace(/\{\{<\s*image\s+([\s\S]*?)>\}\}/g, (_, attrs) => {
    const get = (name) => {
      const m = attrs.match(new RegExp(`${name}="([^"]*)"`));
      return m ? m[1] : "";
    };
    const src = get("src");
    const alt = get("alt");
    const title = get("title");
    const license = get("license");
    const licenseUrl = get("licenseUrl");
    const author = get("author");
    let out = `![${alt}](${src})`;
    const credits = [];
    if (title) credits.push(`**${title}**`);
    if (author) credits.push(author);
    if (license)
      credits.push(licenseUrl ? `[${license}](${licenseUrl})` : license);
    if (credits.length) out += `\n\n_${credits.join(" · ")}_`;
    return out;
  });
}

/** Convierte style="a: b; c: d" a sintaxis JSX style={{...}}. */
function styleToJsx(styleStr) {
  const entries = styleStr
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((decl) => {
      const [prop, ...rest] = decl.split(":");
      const camel = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${camel}: "${rest.join(":").trim()}"`;
    });
  return `style={{ ${entries.join(", ")} }}`;
}

function sanitizeBody(body) {
  let out = body;

  // Comentarios HTML: MDX no los admite.
  out = out.replace(/<!--[\s\S]*?-->/g, "");

  // Embeds de Twitter: el <script> no se ejecuta en React; se elimina.
  out = out.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<script[^>]*\/>/gi, "");

  // Shortcodes de Hugo.
  out = convertImageShortcode(out);
  // Cualquier otro shortcode desconocido se elimina con aviso.
  out = out.replace(/\{\{[<%][\s\S]*?[>%]\}\}/g, (m) => {
    console.warn(`AVISO: shortcode eliminado: ${m.slice(0, 60)}...`);
    return "";
  });

  // Autolinks de Markdown clásico (<https://...>, <correo@...>): MDX no los
  // admite, los interpreta como JSX.
  out = out.replace(/<(https?:\/\/[^>\s]+)>/g, "[$1]($1)");
  out = out.replace(/<([^>\s@]+@[^>\s]+\.[a-z]{2,})>/gi, "[$1](mailto:$1)");

  // Anclas de encabezado tipo "### Título {#id}".
  out = out.replace(/[ \t]*\{#[A-Za-z0-9_-]+\}/g, "");

  // Etiquetas vacías sin cerrar (y cierres huérfanos tipo </br>).
  out = out.replace(/<\/(br|hr|img)\s*>/gi, "");
  out = out.replace(/<br\s*>/gi, "<br />");
  out = out.replace(/<hr\s*>/gi, "<hr />");
  out = out.replace(/<img([^>]*?)(?<!\/)>/gi, "<img$1 />");

  // Atributos JSX: class= y style="..." de string a expresión.
  out = out.replace(/(<[a-z][^>]*?)\sclass="/gi, '$1 className="');
  out = out.replace(/style="([^"]*)"/g, (_, s) => styleToJsx(s));

  // Typo en origen: enlaces internos que apuntan al fichero .md fuente.
  out = out.replace(
    /(\]\(\/(?:blog|guias|acciones|pres|catalogo|fichas)\/[^)\s]+?)\.md\)/g,
    "$1)",
  );

  // Rutas de assets en markdown ![alt](/ruta) y [texto](/ruta.ext).
  out = out.replace(
    /(!?\[[^\]]*\]\()(\/[^)\s]+)(\))/g,
    (m, pre, url, post) => {
      if (!looksLikeAsset(url) && !m.startsWith("![")) return m; // enlace interno
      return pre + rewriteAssetPath(url) + post;
    },
  );
  // Rutas en src="..." de HTML crudo.
  out = out.replace(
    /src="(\/[^"]+)"/g,
    (_, url) => `src="${rewriteAssetPath(url)}"`,
  );

  // Llaves sueltas fuera de código (MDX las interpreta como JS). Se escapan
  // solo las que quedan fuera de bloques/inline code y de JSX ya generado.
  const lines = out.split("\n");
  let inFence = false;
  out = lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence || line.includes("style={{")) return line;
      return line.replace(/(?<!\\)([{}])(?!\{)/g, (m, brace, offset) => {
        // no tocar `código` inline
        const before = line.slice(0, offset);
        const ticks = (before.match(/`/g) || []).length;
        return ticks % 2 === 1 ? brace : `\\${brace}`;
      });
    })
    .join("\n");

  return out.trim() + "\n";
}

function toIsoDate(value) {
  if (value == null || value === "") return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(+d) ? null : d.toISOString().slice(0, 10);
}

function readingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// Fidelidad con Hugo: sin slug explícito, la URL usa el nombre de fichero
// completo (incluido el prefijo de fecha); los enlaces internos dependen de ello.
function slugify(name) {
  return name
    .replace(/\.md$/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

let totalWritten = 0;

for (const section of SECTIONS) {
  const srcDir = path.join(SRC_ROOT, section);
  if (!fs.existsSync(srcDir)) {
    console.warn(`AVISO: no existe ${srcDir}, se omite.`);
    continue;
  }
  const outDir = path.join(OUT_ROOT, section);
  fs.mkdirSync(outDir, { recursive: true });

  // Recorrido recursivo: acciones/ anida las actas del Consejo de
  // Publicación Abierta en una subcarpeta.
  const files = fs
    .readdirSync(srcDir, { recursive: true })
    .map(String)
    .map((f) => f.replaceAll("\\", "/"))
    .filter((f) => f.endsWith(".md") && !path.basename(f).startsWith("_index"))
    .sort();

  const slugs = new Set();
  let written = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(srcDir, file), "utf-8");
    const { data, content } = matter(raw, MATTER_OPTS);
    if (data.draft === true) continue;

    const subDir = path.dirname(file) === "." ? "" : path.dirname(file) + "/";
    const slug = data.slug
      ? subDir + String(data.slug)
      : subDir + slugify(path.basename(file));
    let finalSlug = slug;
    let n = 2;
    while (slugs.has(finalSlug)) finalSlug = `${slug}-${n++}`;
    if (finalSlug !== slug)
      console.warn(`AVISO: slug duplicado "${slug}" (${file}) -> ${finalSlug}`);
    slugs.add(finalSlug);

    const cover = data.image ? rewriteAssetPath(String(data.image)) : "/og.svg";
    const categories = Array.isArray(data.categories)
      ? data.categories
      : data.categories
        ? [data.categories]
        : [];
    const tags = Array.isArray(data.tags)
      ? data.tags
      : data.tags
        ? [data.tags]
        : [];

    // Campos extra propios de cada sección (slides, licenses, tutorials, ...)
    // se conservan reescribiendo rutas de assets.
    const extra = {};
    for (const [k, v] of Object.entries(data)) {
      if (MAPPED_KEYS.has(k) || v == null) continue;
      extra[k] = deepRewrite(v);
    }

    // Las capturas de las fichas vienen como fichero relativo a la carpeta
    // de la imagen principal (p.ej. file: captura.png).
    if (section === "fichas" && extra.screenshots) {
      const imgDir = data.image
        ? String(data.image).replace(/\/[^/]*$/, "")
        : null;
      // YAML malformado en origen puede dejar un objeto suelto en vez de lista.
      const shots = Array.isArray(extra.screenshots)
        ? extra.screenshots
        : [extra.screenshots];
      extra.screenshots = shots
        .filter((s) => s && s.file)
        .map((s) => ({
          ...s,
          file: s.file.startsWith("/")
            ? rewriteAssetPath(s.file)
            : imgDir
              ? rewriteAssetPath(`${imgDir}/${s.file}`)
              : s.file,
        }));
    }

    const body = sanitizeBody(content);
    const date = toIsoDate(data.date);

    const fm = {
      title: String(data.title ?? finalSlug),
      excerpt: String(data.description ?? "").trim(),
      cover,
      author: "OfiLibre URJC",
      ...(date ? { date } : {}),
      tag: categories[0] ?? "OfiLibre",
      tags: [...new Set([...categories, ...tags].map(String))],
      readingTime: readingTime(body),
      ...extra,
    };

    const mdx = matter.stringify(body, fm);
    const outFile = path.join(outDir, `${finalSlug}.mdx`);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, mdx, "utf-8");
    written++;
  }

  console.log(`${section}: ${written} entradas`);
  totalWritten += written;
}

let copied = 0;
for (const [src, dest] of assetsToCopy) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  copied++;
}

console.log(`Total entradas: ${totalWritten}`);
console.log(`Assets copiados a public/media: ${copied}`);
if (missingAssets.size) {
  console.warn(
    `Assets referenciados que NO existen en el repo Hugo (${missingAssets.size}):`,
  );
  for (const a of missingAssets) console.warn(`  - ${a}`);
}
