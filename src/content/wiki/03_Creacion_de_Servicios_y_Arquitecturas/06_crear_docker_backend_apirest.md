---
title: "Crear Docker Backend API REST: Hono + PostgreSQL"
description: "Guía para dockerizar una API REST completa con Hono como framework backend."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/creacion
  - docker/api-rest
  - docker/hono
  - docker/backend
type: caso-practico
category: creacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🚀 Crear Docker Backend API REST: Hono + PostgreSQL

Guía para dockerizar una API REST completa con Hono como framework backend.

---

## 📁 Estructura

```text
backend-api/
├── Dockerfile
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
```

---

## 📄 Dockerfile

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

## 📄 `compose.yaml` (API + DB)

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://admin:secret@db:5432/miapp
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: miapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d miapp"]
      interval: 10s
      retries: 5

volumes:
  pgdata:
```

---

## 🔗 Notas Relacionadas

- [[04_crear_docker_para_backend]] — Docker para backend
- [[07_crear_docker_backend_apirest_con_database]] — API REST + DB
- [[04_ejecucion_postgrest_ubuntu]] — PostgREST como alternativa
- [[MOC_Arquitecturas]] — Índice de arquitecturas
