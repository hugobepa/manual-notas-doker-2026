---
title: "Crear Docker para Frontend: Next.js, React, Astro y Vite"
description: "Guías de Dockerfile optimizadas para los principales frameworks frontend modernos."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/creacion
  - docker/frontend
  - docker/nextjs
  - docker/react
type: caso-practico
category: creacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🎨 Crear Docker para Frontend: Next.js, React, Astro y Vite

Guías de Dockerfile optimizadas para los principales frameworks frontend modernos.

---

## Next.js (Standalone)

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
USER node
CMD ["node", "server.js"]
```

---

## React (Vite)

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Astro (SSR)

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 4321
USER node
CMD ["node", "dist/server/entry.mjs"]
```

---

## 🔗 Notas Relacionadas

- [[01_crear_docker_monorepo_con_base_de_datos]] — Monorepo completo
- [[07_ciclo_de_vida_en_imagenes_optimizadas]] — Ciclo de vida optimizado
- [[04_crear_docker_para_backend]] — Docker para backend
- [[MOC_Arquitecturas]] — Índice de arquitecturas
