---
title: "Búsqueda de Imágenes y Multi-Stage Builds en Profundidad"
description: "Aprenderás a buscar imágenes en Docker Hub, evaluar su calidad y aplicar multi-stage builds avanzados con ejemplos de PostgREST y stacks mod"
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/dockerfile
  - docker/docker-search
  - docker/multi-stage
  - docker/postgrest
type: guia
category: dockerfile
complexity: avanzado
isPinned: false
growthStage: evergreen
---
# 🔍 Búsqueda de Imágenes y Multi-Stage Builds en Profundidad

Aprenderás a buscar imágenes en Docker Hub, evaluar su calidad y aplicar multi-stage builds avanzados con ejemplos de PostgREST y stacks modernos.

---

## 🔎 `docker search` — El Buscador de Docker Hub

`docker search` consulta Docker Hub y devuelve imágenes que coinciden con tu término de búsqueda.

### Anatomía del comando

```bash
docker search postgrest
```

| Parte           | Significado                      |
| :-------------- | :------------------------------- |
| `docker search` | Acción de búsqueda en Docker Hub |
| `postgrest`     | Término de búsqueda              |

### Columnas del resultado

| Columna         | Significado                                                |
| :-------------- | :--------------------------------------------------------- |
| **NAME**        | Nombre completo de la imagen                               |
| **DESCRIPTION** | Descripción breve                                          |
| **STARS**       | Popularidad (más estrellas = más confiable)                |
| **OFFICIAL**    | `[OK]` = mantenida por el equipo oficial                   |
| **AUTOMATED**   | Imagen construida automáticamente desde GitHub (en desuso) |

### Opciones útiles

| Opción                      | Descripción                 | Ejemplo                                          |
| :-------------------------- | :-------------------------- | :----------------------------------------------- |
| `--limit`                   | Número máximo de resultados | `docker search --limit 10 nginx`                 |
| `--filter is-official=true` | Solo imágenes oficiales     | `docker search --filter is-official=true python` |
| `--filter stars=100`        | Mínimo de estrellas         | `docker search --filter stars=100 postgres`      |
| `--no-trunc`                | No truncar la descripción   | `docker search --no-trunc postgrest`             |

> [!tip] Evalúa antes de usar
> Busca siempre la imagen con `[OK]` en OFFICIAL. Si no hay oficial, elige la de más STARS y lee su descripción y documentación en Docker Hub.

---

## 🐘 Ejemplo: PostgREST

PostgREST convierte tu base de datos PostgreSQL en una API RESTful automáticamente.

```bash
# Buscar
docker search postgrest
# Resultado: postgrest/postgrest [OK]

# Descargar
docker pull postgrest/postgrest

# Ejecutar
docker run --name my-postgrest -d \
  -p 3000:3000 \
  -e PGRST_DB_URI="postgres://user:pass@host:5432/dbname" \
  -e PGRST_DB_SCHEMA="public" \
  -e PGRST_DB_ANON_ROLE="web_anon" \
  postgrest/postgrest
```

---

## 🏗️ Multi-Stage Build: El Flujo Completo

```mermaid
graph TD
    A[docker search] --> B[Encontrar imagen base]
    B --> C[Escribir Dockerfile multi-stage]
    C --> D[docker build -t app:latest .]
    D --> E[docker tag app:latest user/app:v1]
    E --> F[docker push user/app:v1]
    F --> G[docker pull user/app:v1 en servidor]
    G --> H[docker run -d -p 3000:3000 user/app:v1]
```

### Dockerfile multi-stage para PostgREST + Frontend

```dockerfile
# Etapa 1: Frontend Builder (Next.js standalone)
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Etapa 2: Imagen final combinada
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copiar frontend compilado
COPY --from=frontend-builder /app/.next/standalone ./
COPY --from=frontend-builder /app/.next/static ./.next/static

EXPOSE 3000
USER node
CMD ["node", "server.js"]
```

> [!info] Separación de responsabilidades
> En producción, el frontend y PostgREST suelen ir en contenedores separados orquestados con [[01_introduccion_a_docker_compose|Docker Compose]].

---

## 🔗 Notas Relacionadas

- [[05_optimizacion_y_peso_ligero]] — Filosofía de optimización de imágenes
- [[09_ciclo_de_vida_multistage]] — Ciclo completo: build, push, pull, run
- [[04_ejecucion_postgrest_ubuntu]] — Guía práctica de PostgREST en Docker
- [[MOC_Dockerfiles]] — Índice general de la categoría Dockerfiles
