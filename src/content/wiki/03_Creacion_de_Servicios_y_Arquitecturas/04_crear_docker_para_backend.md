---
title: "Crear Docker para Backend: Hono, Express y Fastify"
description: "Guías de Dockerfile optimizadas para los principales frameworks backend en Node.js."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/creacion
  - docker/backend
  - docker/hono
  - docker/nodejs
type: caso-practico
category: creacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# ⚙️ Crear Docker para Backend: Hono, Express y Fastify

Guías de Dockerfile optimizadas para los principales frameworks backend en Node.js.

---

## Hono (recomendado para edge y rendimiento)

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
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]
```

---

## Express

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]
```

---

## Fastify

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
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
```

---

## 🔗 Notas Relacionadas

- [[03_crear_docker_para_frontend]] — Docker para frontend
- [[05_crear_docker_backend_con_base_de_datos]] — Backend con DB
- [[06_crear_docker_backend_apirest]] — API REST completa
- [[MOC_Arquitecturas]] — Índice de arquitecturas
