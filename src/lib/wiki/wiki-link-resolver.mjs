import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function isMarkdownFile(file) {
  return (
    typeof file === "string" && (file.endsWith(".md") || file.endsWith(".mdx"))
  );
}

function buildWikiLinksMap() {
  const wikiLinksMap = new Map();
  try {
    const contentWikiPath = path.resolve(__dirname, "../../content/wiki");
    const wikiFiles = fs.readdirSync(contentWikiPath, { recursive: true });

    for (const file of wikiFiles) {
      if (isMarkdownFile(file)) {
        const slug = file.replace(/\.(md|mdx)?$/, "").replace(/\\/g, "/");
        const basename = path.basename(slug);
        const lowerSlug = slug.toLowerCase();
        wikiLinksMap.set(basename.toLowerCase(), lowerSlug);
        wikiLinksMap.set(lowerSlug, lowerSlug);
      }
    }
  } catch (e) {
    console.warn("Failed to read wiki files for wikiLinksMap", e);
  }
  return wikiLinksMap;
}

const wikiLinksMap = buildWikiLinksMap();

export function createWikiLinkOptions(base = "/") {
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;

  return {
    pageResolver: (name) => {
      return [name.replace(/ /g, "-").toLowerCase()];
    },
    hrefTemplate: (permalink) => {
      const key = permalink.replace(/\\/g, "/").toLowerCase();
      const resolved = wikiLinksMap.get(key) || key;
      return `${normalizedBase}/wiki/${resolved}`;
    },
  };
}

/** @deprecated Usar createWikiLinkOptions(base) desde astro.config */
export const wikiLinkOptions = createWikiLinkOptions("/");
