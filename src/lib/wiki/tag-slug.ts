/** Codifica tags con `/` para rutas estáticas seguras. */
export function tagToSlug(tag: string): string {
  return encodeURIComponent(tag.replace(/\//g, "--"));
}

export function slugToTag(slug: string): string {
  return decodeURIComponent(slug).replace(/--/g, "/");
}
