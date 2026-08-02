---
title: "Crear Docker Backend API REST con Database Completa"
description: "Arquitectura completa: API REST + PostgreSQL + frontend en un solo `compose.yaml`."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/creacion
  - docker/api-rest
  - docker/fullstack
  - docker/postgresql
type: caso-practico
category: creacion
complexity: avanzado
isPinned: false
growthStage: evergreen
---
# 🏗️ Crear Docker Backend API REST con Database Completa

Arquitectura completa: API REST + PostgreSQL + frontend en un solo `compose.yaml`.

---

## 📄 `compose.yaml`

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:4000
    depends_on:
      - api

  api:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: postgres://admin:secret@db:5432/miapp
      JWT_SECRET: super_secret_key
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

- [[06_crear_docker_backend_apirest]] — API REST básica
- [[01_crear_docker_monorepo_con_base_de_datos]] — Monorepo completo
- [[06_vincular_backend_base_de_datos_y_frontend_v1]] — Vinculación completa
- [[MOC_Arquitecturas]] — Índice de arquitecturas
