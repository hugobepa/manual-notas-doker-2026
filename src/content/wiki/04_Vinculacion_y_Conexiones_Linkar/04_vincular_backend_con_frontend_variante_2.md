---
title: "Vincular Backend con Frontend - Variante 2: Proxy Inverso con Nginx"
description: "Usa Nginx como proxy inverso para enrutar tráfico al frontend y backend desde un único punto de entrada."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/vinculacion
  - docker/nginx
  - docker/proxy
type: caso-practico
category: vinculacion
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🔄 Vincular Backend con Frontend - Variante 2: Proxy Inverso con Nginx

Usa Nginx como proxy inverso para enrutar tráfico al frontend y backend desde un único punto de entrada.

---

## 📄 `compose.yaml` con Nginx

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - frontend
      - backend

  frontend:
    build: ./frontend
    expose:
      - "3000"

  backend:
    build: ./backend
    expose:
      - "4000"
```

---

## 🔗 Notas Relacionadas

- [[01_vincular_frontend_y_backend_parte_1]] — Redes básicas
- [[03_vincular_backend_apirest_y_frontend]] — Conexión directa
- [[MOC_Arquitecturas]] — Índice de arquitecturas
