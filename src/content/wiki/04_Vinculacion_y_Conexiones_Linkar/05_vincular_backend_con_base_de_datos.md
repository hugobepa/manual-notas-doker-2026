---
title: "Vincular Backend con Base de Datos: Node.js + PostgreSQL"
description: "Guía para conectar un backend Node.js a PostgreSQL, con healthchecks, reintentos y variables de entorno."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/vinculacion
  - docker/backend
  - docker/postgresql
type: guia
category: vinculacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🗄️ Vincular Backend con Base de Datos: Node.js + PostgreSQL

Guía para conectar un backend Node.js a PostgreSQL, con healthchecks, reintentos y variables de entorno.

---

## 📄 `compose.yaml`

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "4000:4000"
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

- [[02_crear_docker_para_base_de_datos]] — DB en Docker
- [[05_crear_docker_backend_con_base_de_datos]] — Backend + DB
- [[MOC_Arquitecturas]] — Índice de arquitecturas
