---
title: "Vincular Backend + Base de Datos + Frontend v2: Con Proxy y Monitoreo"
description: "Arquitectura avanzada con Nginx como proxy inverso y healthchecks para monitoreo."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/vinculacion
  - docker/fullstack
  - docker/nginx
  - docker/monitoreo
type: caso-practico
category: vinculacion
complexity: avanzado
isPinned: false
growthStage: evergreen
---
# 🏛️ Vincular Backend + Base de Datos + Frontend v2: Con Proxy y Monitoreo

Arquitectura avanzada con Nginx como proxy inverso y healthchecks para monitoreo.

---

## 📄 `compose.yaml`

```yaml
services:
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - frontend
      - backend

  frontend:
    build: ./frontend
    expose: ["3000"]

  backend:
    build: ./backend
    expose: ["4000"]
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

- [[06_vincular_backend_base_de_datos_y_frontend_v1]] — Versión sin proxy
- [[04_vincular_backend_con_frontend_variante_2]] — Proxy con Nginx
- [[MOC_Arquitecturas]] — Índice de arquitecturas
