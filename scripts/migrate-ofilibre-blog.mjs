/**
 * Migra los posts del blog de OfiLibre (Hugo, content/spanish/blog) al formato
 * MDX con frontmatter de este proyecto (content/blog/<slug>.mdx).
 *
 * Uso:  node scripts/migrate-ofilibre-blog.mjs <ruta-repo-hugo>
 *
 * - Copia bajo public/media/ solo los assets realmente referenciados
 *   (local/ del repo Hugo pesa >1 GB, no se copia entero).
 * - Sanea el markdown para que MDX lo acepte (br/img sin cerrar, anclas
 *   {#id}, comentarios HTML, style="..." como string, shortcode image).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const HUGO_ROOT = process.argv[2];
if (!HUGO_ROOT || !fs.existsSync(path.join(HUGO_ROOT, "content"))) {
  console.error("Uso: node scripts/migrate-ofilibre-blog.mjs <ruta-repo-hugo>");
  process.exit(1);
}

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const SRC_BLOG = path.join(HUGO_ROOT, "content", "spanish", "blog");
const OUT_BLOG = path.join(PROJECT_ROOT, "content", "blog");
const OUT_MEDIA = path.join(PROJECT_ROOT, "public", "media");

/** Assets a copiar: ruta origen absoluta -> ruta destino absoluta */
const assetsToCopy = new Map();
const missingAssets = [];

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
    missingAssets.push(clean);
    return publicPath; // reescribimos igualmente; se avisa al final
  }
  // En disco el fichero se guarda decodificado (el servidor decodifica la URL).
  assetsToCopy.set(
    srcFile,
    path.join(OUT_MEDIA, decodeURIComponent(publicPath.slice("/media/".length))),
  );
  return publicPath;
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
    if (license) credits.push(licenseUrl ? `[${license}](${licenseUrl})` : license);
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

  // Shortcode de imagen de Hugo.
  out = convertImageShortcode(out);

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

  // Rutas de assets en markdown ![alt](/ruta) y [texto](/ruta.ext).
  out = out.replace(
    /(!?\[[^\]]*\]\()(\/[^)\s]+)(\))/g,
    (m, pre, url, post) => {
      const isAsset =
        /\.[a-z0-9]{2,5}$/i.test(url.replace(/\/+$/, "")) || url.startsWith("/local/");
      if (!isAsset && !m.startsWith("![")) return m; // enlace interno de sección
      return pre + rewriteAssetPath(url) + post;
    },
  );
  // Rutas en src="..." de HTML crudo.
  out = out.replace(/src="(\/[^"]+)"/g, (_, url) => `src="${rewriteAssetPath(url)}"`);

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
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(+d) ? String(value) : d.toISOString().slice(0, 10);
}

function readingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

fs.mkdirSync(OUT_BLOG, { recursive: true });

const files = fs
  .readdirSync(SRC_BLOG)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_index"))
  .sort();

const slugs = new Set();
let written = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(SRC_BLOG, file), "utf-8");
  const { data, content } = matter(raw);

  const slug =
    data.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
  if (slugs.has(slug)) {
    console.warn(`AVISO: slug duplicado "${slug}" (${file}); se añade sufijo.`);
  }
  let finalSlug = slug;
  let n = 2;
  while (slugs.has(finalSlug)) finalSlug = `${slug}-${n++}`;
  slugs.add(finalSlug);

  const cover = data.image ? rewriteAssetPath(String(data.image)) : "/og.svg";
  const categories = Array.isArray(data.categories)
    ? data.categories
    : data.categories
      ? [data.categories]
      : [];
  const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];

  const body = sanitizeBody(content);

  const fm = {
    title: String(data.title ?? finalSlug),
    excerpt: String(data.description ?? "").trim(),
    cover,
    author: "OfiLibre URJC",
    date: toIsoDate(data.date),
    tag: categories[0] ?? "OfiLibre",
    tags: [...categories, ...tags],
    readingTime: readingTime(body),
  };

  const mdx = matter.stringify(body, fm);
  fs.writeFileSync(path.join(OUT_BLOG, `${finalSlug}.mdx`), mdx, "utf-8");
  written++;
}

let copied = 0;
for (const [src, dest] of assetsToCopy) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  copied++;
}

console.log(`Posts convertidos: ${written}`);
console.log(`Assets copiados a public/media: ${copied}`);
if (missingAssets.length) {
  console.warn(`Assets referenciados que NO existen en el repo Hugo (${missingAssets.length}):`);
  for (const a of missingAssets) console.warn(`  - ${a}`);
}
