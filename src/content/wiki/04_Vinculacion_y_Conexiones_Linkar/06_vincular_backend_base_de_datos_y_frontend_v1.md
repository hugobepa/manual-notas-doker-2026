---
title: "Vincular Backend + Base de Datos + Frontend v1: Arquitectura Completa"
description: "Arquitectura completa de 3 servicios con healthchecks y dependencias encadenadas."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/vinculacion
  - docker/fullstack
  - docker/arquitectura
type: caso-practico
category: vinculacion
complexity: avanzado
isPinned: false
growthStage: evergreen
---
# 🏛️ Vincular Backend + Base de Datos + Frontend v1

Arquitectura completa de 3 servicios con healthchecks y dependencias encadenadas.

---

## 📄 `compose.yaml`

```yaml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:4000
    depends_on:
      backend:
        condition: service_healthy

  backend:
    build: ./backend
    ports: ["4000:4000"]
    environment:
      DATABASE_URL: postgres://admin:secret@db:5432/miapp
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: miapp
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d miapp"]
      interval: 10s
      retries: 5

volumes:
  pgdata:
```

---

## 🔗 Notas Relacionadas

- [[01_crear_docker_monorepo_con_base_de_datos]] — Monorepo completo
- [[08_vincular_backend_base_de_datos_y_frontend_v2]] — Variante 2
- [[MOC_Arquitecturas]] — Índice de arquitecturas
