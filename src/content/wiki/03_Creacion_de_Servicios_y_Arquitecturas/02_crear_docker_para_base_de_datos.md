---
title: "Crear Docker para Base de Datos: PostgreSQL en Contenedor"
description: "Guía para desplegar PostgreSQL en Docker con persistencia de datos, healthchecks y configuración óptima."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/creacion
  - docker/postgresql
  - docker/volumenes
  - docker/base-de-datos
type: caso-practico
category: creacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🗄️ Crear Docker para Base de Datos: PostgreSQL en Contenedor

Guía para desplegar PostgreSQL en Docker con persistencia de datos, healthchecks y configuración óptima.

---

## 🚀 Despliegue Rápido

```bash
docker run -d \
  --name postgres-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=miapp \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16-alpine
```

---

## 📄 Con Docker Compose

```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: postgres-db
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: miapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d miapp"]
      interval: 10s
      retries: 5
    restart: unless-stopped

volumes:
  pgdata:
```

---

## 🔧 Conexión desde Apps

```text
# URL de conexión dentro de la red Docker
postgres://admin:secret@db:5432/miapp

# URL de conexión desde el host
postgres://admin:secret@localhost:5432/miapp
```

---

## 🔗 Notas Relacionadas

- [[01_crear_docker_monorepo_con_base_de_datos]] — Monorepo completo
- [[03_explicacion_y_consejos_de_volumenes]] — Persistencia con volúmenes
- [[05_crear_docker_backend_con_base_de_datos]] — Backend + DB
- [[MOC_Arquitecturas]] — Índice de arquitecturas
