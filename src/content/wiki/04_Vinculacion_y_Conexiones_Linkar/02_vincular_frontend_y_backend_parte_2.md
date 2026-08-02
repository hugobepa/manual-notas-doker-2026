---
title: "Vincular Frontend y Backend en Docker - Parte 2: Salud y Dependencias"
description: "Estrategias avanzadas de vinculación con healthchecks, dependson con condiciones y manejo de fallos."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/vinculacion
  - docker/healthcheck
  - docker/depends_on
type: guia
category: vinculacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🔗 Vincular Frontend y Backend - Parte 2: Salud y Dependencias

Estrategias avanzadas de vinculación con healthchecks, depends_on con condiciones y manejo de fallos.

---

## 🏥 Healthchecks

```yaml
services:
  backend:
    build: ./backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  frontend:
    build: ./frontend
    depends_on:
      backend:
        condition: service_healthy
```

> [!warning] `depends_on` no espera a que la app esté lista
> Por defecto, `depends_on` solo controla el orden de arranque, no espera a que la aplicación dentro del contenedor esté lista. Usa `condition: service_healthy` con healthchecks.

---

## 🔗 Notas Relacionadas

- [[01_vincular_frontend_y_backend_parte_1]] — Redes básicas
- [[05_vincular_backend_con_base_de_datos]] — Backend + DB
- [[MOC_Arquitecturas]] — Índice de arquitecturas
