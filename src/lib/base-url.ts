/** Prefijo base de GitHub Pages (p. ej. /manual-notas-doker-2026/) */
export function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

/** Ruta interna con base incluida */
export function withBase(path: string): string {
  const base = getBaseUrl();
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}

/** Slug wiki en minúsculas (como genera Astro en GitHub Pages) */
export function wikiSlug(id: string): string {
  return id === "index" ? "" : id.toLowerCase();
}

/** URL completa a una nota wiki */
export function wikiHref(id: string): string {
  if (id === "index") return withBase("wiki");
  return withBase(`wiki/${wikiSlug(id)}`);
}

/** Normaliza pathname para comparar rutas activas */
export function normalizePath(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "");
  let normalized = path.replace(/\/$/, "") || "/";
  if (base && normalized.startsWith(base)) {
    normalized = normalized.slice(base.length) || "/";
  }
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  return normalized.toLowerCase();
}
