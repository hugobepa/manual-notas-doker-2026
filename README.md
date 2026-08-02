# Manual Docker & Podman — Sitio web

Documentación estática generada con [Veka](https://github.com/masmuss/veka) (Astro) a partir del vault Obsidian Docker.

**URL:** https://hugobepa.github.io/manual-notas-doker-2026/

## Características

- 70+ notas con frontmatter (type, category, complexity, tags)
- Búsqueda con **Pagefind** indexando metadatos
- Diagramas **Mermaid** en dashboards y notas
- Canvas de Obsidian renderizados como mapas interactivos
- Tema Docker (Inter, paleta azul, Font Awesome)
- Despliegue automático en GitHub Pages

## Desarrollo local

```bash
pnpm install
pnpm run import-vault   # reimportar contenido desde el vault fuente
pnpm run dev
```

Para probar búsqueda (Pagefind):

```bash
pnpm run build
pnpm run preview
```

## Estructura

```
src/content/wiki/     ← Notas importadas del vault Obsidian
public/canvas/        ← Archivos .canvas de Obsidian
scripts/import-vault.mjs
```

## Fuente del contenido

Vault original: `0.pre-guia_crear-obs-wd/3.web/0.pre-doc_build-web/2.docker_manual-rml_2026`

## Despliegue

Push a `main` activa el workflow `.github/workflows/deploy.yml`.

Configuración GitHub Pages: **Source → GitHub Actions**.

Base path: `/manual-notas-doker-2026` (ver `astro.config.mjs`).
