# Manual Docker & Podman — Sitio web

> Documentación estática para dominar Docker, Podman y el ecosistema de contenedores, orientada a desarrolladores frontend indie.

**Sitio en vivo:** [hugobepa.github.io/manual-notas-docker-2026](https://hugobepa.github.io/manual-notas-docker-2026/)

---

## ¿Qué es esto?

Este repositorio es la **versión web** de un vault de Obsidian con más de **70 notas** sobre Docker, Compose, Podman, casos prácticos, IA/despliegues y chuletas.

En la web puedes **buscar, navegar por tags y consultar** el contenido sin Obsidian.

---

## Origen del proyecto

| Pieza | Enlace |
| :---- | :----- |
| **Vault Obsidian (contenido fuente)** | [docker_obsidian-vault_manual-roadmap-dockers_2026](https://github.com/hugobepa/docker_obsidian-vault_manual-roadmap-dockers_2026) |
| **Plantilla web (Astro)** | [Veka](https://github.com/masmuss/veka) |

---

## Inspiración — midudev

- [Curso de Docker desde cero (1 h 52 m)](https://www.youtube.com/watch?v=wZnddhLrmiM&t=3284s)
- [Ejemplos jscamp/10-docker](https://github.com/midudev/jscamp/tree/main/10-docker)
- [midu.dev](https://midu.dev/)

---

## Características

- 70+ notas con frontmatter (`type`, `category`, `complexity`, `tags`)
- Búsqueda **Pagefind** (`⌘K`)
- Diagramas **Mermaid** y **Canvas** de Obsidian
- Tema Docker · despliegue en **GitHub Pages**

---

## Desarrollo local

```bash
pnpm install
pnpm run dev
```

```bash
pnpm run build && pnpm run preview   # probar Pagefind
```

Base path: `/manual-notas-docker-2026` — el nombre del repo en GitHub debe coincidir (`docker`, no `doker`).

---

## Enlaces

- **Web:** https://hugobepa.github.io/manual-notas-docker-2026/
- **Repo:** https://github.com/hugobepa/manual-notas-docker-2026
- **Vault:** https://github.com/hugobepa/docker_obsidian-vault_manual-roadmap-dockers_2026
- **Veka:** https://github.com/masmuss/veka
