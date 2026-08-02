---
title: "Crear Docker Backend con Base de Datos: Conexión Node.js + PostgreSQL"
description: "Caso práctico para dockerizar un backend Node.js conectado a PostgreSQL."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/creacion
  - docker/backend
  - docker/postgresql
  - docker/compose
type: caso-practico
category: creacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🔗 Crear Docker Backend con Base de Datos: Node.js + PostgreSQL

Caso práctico para dockerizar un backend Node.js conectado a PostgreSQL.

---

## 🏗️ Arquitectura

```mermaid
graph LR
    A[Cliente] --> B[Backend :4000]
    B --> C[PostgreSQL :5432]
    C --> D[(Volumen pgdata)]
```

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

- [[02_crear_docker_para_base_de_datos]] — Solo base de datos
- [[04_crear_docker_para_backend]] — Solo backend
- [[05_vincular_backend_con_base_de_datos]] — Vinculación de servicios
- [[MOC_Arquitecturas]] — Índice de arquitecturas
