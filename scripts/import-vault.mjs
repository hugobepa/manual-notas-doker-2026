/**
 * Importa el vault Obsidian y transforma frontmatter al esquema Veka.
 * Uso: node scripts/import-vault.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VAULT_SRC = path.resolve(
  ROOT,
  "../0.pre-guia_crear-obs-wd/3.web/0.pre-doc_build-web/2.docker_manual-rml_2026",
);
const WIKI_DEST = path.join(ROOT, "src/content/wiki");
const CANVAS_DEST = path.join(ROOT, "public/canvas");

const SKIP_DIRS = new Set(["_Templates", ".git"]);
const SKIP_FILES = new Set(["man_subida_git.md", ".gitignore"]);

const COMPLEXITY_TO_GROWTH = {
  principiante: "seedling",
  intermedio: "budding",
  avanzado: "evergreen",
};

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return {
      frontmatter: {
        title: titleMatch?.[1]?.replace(/[*#]/g, "").trim() || "Sin título",
      },
      body: content,
    };
  }
  const raw = match[1];
  const body = match[2];
  const frontmatter = {};
  let currentKey = null;
  let inArray = false;

  for (const line of raw.split(/\r?\n/)) {
    const arrayItem = line.match(/^\s+-\s+(.+)$/);
    if (arrayItem && currentKey && inArray) {
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      frontmatter[currentKey].push(arrayItem[1].replace(/^["']|["']$/g, ""));
      continue;
    }

    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;

    currentKey = kv[1];
    const value = kv[2].trim();

    if (value === "") {
      frontmatter[currentKey] = [];
      inArray = true;
    } else if (value.startsWith('"') || value.startsWith("'")) {
      frontmatter[currentKey] = value.replace(/^["']|["']$/g, "");
      inArray = false;
    } else {
      frontmatter[currentKey] = value;
      inArray = false;
    }
  }

  return { frontmatter, body };
}

function buildDescription(title, body, type) {
  const firstLine = body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("#") && !l.startsWith("```") && !l.startsWith(">"));
  const snippet = firstLine?.replace(/[*_\[\]]/g, "").slice(0, 140);
  return snippet || `${title} — ${type || "nota"} del manual Docker.`;
}

function transformFrontmatter(fm) {
  const type = fm.type || "guia";
  const complexity = fm.complexity || "principiante";
  const tags = Array.isArray(fm.tags) ? fm.tags : fm.tags ? [String(fm.tags)] : [];
  const created = fm.date_created || fm.createdAt || "2026-08-01";
  const updated = fm.last_modified || fm.updatedAt || created;
  const title = fm.title || "Sin título";
  const category = fm.category || "general";
  const isPinned = ["moc", "dashboard"].includes(type);

  return {
    title,
    description: buildDescription(title, "", type).slice(0, 160),
    createdAt: created,
    updatedAt: updated,
    tags,
    type,
    category,
    complexity,
    growthStage: COMPLEXITY_TO_GROWTH[complexity] || "seedling",
    isPinned,
  };
}

function serializeFrontmatter(data, body) {
  const lines = ["---"];
  lines.push(`title: "${data.title.replace(/"/g, '\\"')}"`);
  lines.push(`description: "${data.description.replace(/"/g, '\\"')}"`);
  lines.push(`createdAt: ${data.createdAt}`);
  lines.push(`updatedAt: ${data.updatedAt}`);
  lines.push("tags:");
  if (data.tags.length === 0) {
    lines.push("  - general");
  } else {
    for (const tag of data.tags) lines.push(`  - ${tag}`);
  }
  lines.push(`type: ${data.type}`);
  lines.push(`category: ${data.category}`);
  lines.push(`complexity: ${data.complexity}`);
  lines.push(`isPinned: ${data.isPinned}`);
  lines.push(`growthStage: ${data.growthStage}`);
  lines.push("---");
  lines.push("");
  return `${lines.join("\n")}${body.trimStart()}`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyMarkdownFiles(srcDir, destDir, rel = "") {
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;

    const srcPath = path.join(srcDir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      copyMarkdownFiles(srcPath, destDir, relPath);
      continue;
    }

    if (entry.name.endsWith(".canvas")) {
      const canvasName = entry.name.replace(".canvas", "");
      const destCanvasDir = path.join(destDir, rel || ".");
      ensureDir(destCanvasDir);
      ensureDir(CANVAS_DEST);
      fs.copyFileSync(srcPath, path.join(CANVAS_DEST, entry.name));

      const mdPath = path.join(destCanvasDir, `${canvasName}.md`);
      const canvasFrontmatter = {
        title: canvasName.replace(/_/g, " ").replace(/^\d+\s*/, ""),
        description: `Mapa visual interactivo: ${canvasName}`,
        createdAt: "2026-08-02",
        updatedAt: "2026-08-02",
        tags: ["canvas", "visual"],
        type: "canvas",
        category: "indice",
        complexity: "principiante",
        growthStage: "evergreen",
        isPinned: true,
      };
      const body = `# ${canvasFrontmatter.title}

<Mapa visual del vault Docker. Los nodos enlazan a las notas del manual.>

<div class="canvas-viewer" data-canvas="/canvas/${entry.name}"></div>
`;
      fs.writeFileSync(
        mdPath,
        serializeFrontmatter(canvasFrontmatter, body),
        "utf8",
      );
      continue;
    }

    if (!entry.name.endsWith(".md")) continue;
    if (SKIP_FILES.has(entry.name)) continue;
    if (entry.name === "README.md") continue;

    const raw = fs.readFileSync(srcPath, "utf8");
    const { frontmatter, body } = parseFrontmatter(raw);
    const transformed = transformFrontmatter(frontmatter);
    transformed.description = buildDescription(
      transformed.title,
      body,
      transformed.type,
    ).slice(0, 160);

    const destPath = path.join(destDir, relPath);
    ensureDir(path.dirname(destPath));
    fs.writeFileSync(
      destPath,
      serializeFrontmatter(transformed, body),
      "utf8",
    );
  }
}

function createIndex() {
  const indexPath = path.join(WIKI_DEST, "index.md");
  const content = `---
title: "Manual Docker — Índice"
description: "Documentación completa de Docker, Podman, Compose, arquitecturas y despliegues cloud para desarrolladores frontend."
createdAt: 2026-08-02
updatedAt: 2026-08-02
tags:
  - docker/indice
  - moc
type: moc
category: indice
complexity: principiante
isPinned: true
growthStage: evergreen
---

# 🐳 Manual Docker & Podman

Bienvenido al manual interactivo de contenedores. Explora por categoría, complejidad o usa **⌘K** para buscar.

## 🗺️ Mapas de contenido

- [[MOC_Docker_General|MOC General]]
- [[MOC_Fundamentos|Fundamentos]]
- [[MOC_Dockerfiles|Dockerfiles]]
- [[MOC_Compose|Compose]]
- [[MOC_Arquitecturas|Arquitecturas]]
- [[MOC_IA_Despliegues|IA & Cloud]]
- [[MOC_Podman|Podman]]
- [[MOC_Soporte|Soporte]]

## 📊 Dashboards

- [[08_Dashboards/00_dashboard_general|Dashboard General]]
- [[08_Dashboards/02_dashboard_por_complejidad|Ruta de aprendizaje]]

## 🎨 Canvas

- [[09_Canvas/00_mapa_conocimiento_general|Mapa de conocimiento]]
- [[09_Canvas/01_flujo_aprendizaje|Flujo de aprendizaje]]
- [[09_Canvas/02_arquitecturas_docker|Arquitecturas Docker]]
`;
  fs.writeFileSync(indexPath, content, "utf8");
}

// Main
console.log("Importando vault desde:", VAULT_SRC);
console.log("Destino wiki:", WIKI_DEST);

if (!fs.existsSync(VAULT_SRC)) {
  console.error("No se encontró el vault fuente:", VAULT_SRC);
  process.exit(1);
}

// Limpiar contenido demo de Veka
if (fs.existsSync(WIKI_DEST)) {
  fs.rmSync(WIKI_DEST, { recursive: true });
}
ensureDir(WIKI_DEST);
ensureDir(CANVAS_DEST);

copyMarkdownFiles(VAULT_SRC, WIKI_DEST);
createIndex();

console.log("✅ Importación completada.");
