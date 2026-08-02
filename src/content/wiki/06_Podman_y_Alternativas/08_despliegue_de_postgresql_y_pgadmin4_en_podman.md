---
title: "Despliegue de PostgreSQL y pgAdmin4 en Podman"
description: "Despliega PostgreSQL con pgAdmin4 usando Podman y pods."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - podman/postgresql
  - podman/pgadmin
  - podman/caso-practico
type: caso-practico
category: podman
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🐘 Despliegue de PostgreSQL y pgAdmin4 en Podman

Despliega PostgreSQL con pgAdmin4 usando Podman y pods.

---

## 🚀 Con Pod

```bash
# Crear pod
podman pod create --name postgres-pod -p 5432:5432 -p 8080:80

# PostgreSQL
podman run -d --pod postgres-pod --name db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -v pgdata:/var/lib/postgresql/data \
  postgres:16-alpine

# pgAdmin4
podman run -d --pod postgres-pod --name pgadmin \
  -e PGADMIN_DEFAULT_EMAIL=admin@admin.com \
  -e PGADMIN_DEFAULT_PASSWORD=secret \
  dpage/pgadmin4
```

---

## 🔗 Notas Relacionadas

- [[04_chuleta_de_comandos_basicos_podman]] — Comandos Podman
- [[03_explicacion_y_consejos_de_volumenes]] — Volúmenes
- [[MOC_Podman]] — Índice de Podman
