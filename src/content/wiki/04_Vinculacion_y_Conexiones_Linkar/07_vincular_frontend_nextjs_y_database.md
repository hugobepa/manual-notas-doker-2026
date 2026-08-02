---
title: "Vincular Frontend Next.js con Base de Datos Directamente"
description: "Caso práctico para conectar Next.js directamente a PostgreSQL usando Server Components y Server Actions."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/vinculacion
  - docker/nextjs
  - docker/postgresql
type: caso-practico
category: vinculacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# ⚡ Vincular Frontend Next.js con Base de Datos Directamente

Caso práctico para conectar Next.js directamente a PostgreSQL usando Server Components y Server Actions.

---

## 📄 `compose.yaml`

```yaml
services:
  frontend:
    build: ./frontend
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

> [!tip] Next.js + Prisma
> Esta arquitectura es ideal con Prisma ORM. La conexión se maneja del lado del servidor en Server Components.

---

## 🔗 Notas Relacionadas

- [[03_crear_docker_para_frontend]] — Frontend en Docker
- [[05_vincular_backend_con_base_de_datos]] — Backend + DB
- [[MOC_Arquitecturas]] — Índice de arquitecturas
