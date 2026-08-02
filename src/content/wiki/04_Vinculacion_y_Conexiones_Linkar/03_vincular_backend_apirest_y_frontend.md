---
title: "Vincular Backend API REST con Frontend"
description: "Guía para conectar un frontend (Next.js/React) con una API REST backend usando Docker Compose."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/vinculacion
  - docker/api-rest
  - docker/frontend
type: guia
category: vinculacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🔌 Vincular Backend API REST con Frontend

Guía para conectar un frontend (Next.js/React) con una API REST backend usando Docker Compose.

---

## 📄 `compose.yaml`

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://backend:4000/api

  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      CORS_ORIGIN: http://localhost:3000
```

---

## 🔧 Configuración CORS en el Backend

```typescript
// Hono
app.use("/api/*", cors({ origin: "http://localhost:3000" }));
```

```javascript
// Express
app.use(cors({ origin: "http://localhost:3000" }));
```

> [!tip] CORS en desarrollo vs producción
> En desarrollo usa `localhost`. En producción, usa el dominio real. Puedes configurarlo con variables de entorno.

---

## 🔗 Notas Relacionadas

- [[01_vincular_frontend_y_backend_parte_1]] — Redes básicas
- [[06_crear_docker_backend_apirest]] — API REST
- [[MOC_Arquitecturas]] — Índice de arquitecturas
