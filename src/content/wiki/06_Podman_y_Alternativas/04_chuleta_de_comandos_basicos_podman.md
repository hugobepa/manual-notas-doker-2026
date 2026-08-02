---
title: "Chuleta de Comandos Básicos de Podman: Equivalencia con Docker"
description: "Referencia rápida de equivalencias entre Docker y Podman para los comandos del día a día."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - podman/comandos
  - podman/basico
  - docker/comandos
type: chuleta
category: podman
complexity: principiante
isPinned: false
growthStage: seedling
---
# 📋 Chuleta de Comandos Básicos de Podman

Referencia rápida de equivalencias entre Docker y Podman para los comandos del día a día.

---

## 🔄 Equivalencias Docker ↔ Podman

| Docker           | Podman           | Descripción                    |
| :--------------- | :--------------- | :----------------------------- |
| `docker run`     | `podman run`     | Ejecutar un contenedor         |
| `docker ps`      | `podman ps`      | Listar contenedores activos    |
| `docker ps -a`   | `podman ps -a`   | Listar todos los contenedores  |
| `docker images`  | `podman images`  | Listar imágenes                |
| `docker pull`    | `podman pull`    | Descargar imagen               |
| `docker build`   | `podman build`   | Construir imagen               |
| `docker stop`    | `podman stop`    | Detener contenedor             |
| `docker rm`      | `podman rm`      | Eliminar contenedor            |
| `docker rmi`     | `podman rmi`     | Eliminar imagen                |
| `docker logs`    | `podman logs`    | Ver logs                       |
| `docker exec`    | `podman exec`    | Ejecutar comando en contenedor |
| `docker compose` | `podman compose` | Docker Compose                 |

> [!tip] Alias para facilitar la migración
>
> ```bash
> alias docker=podman
> ```

---

## 🔗 Notas Relacionadas

- [[01_instalacion_de_podman_y_docker_en_windows_11]] — Instalación
- [[05_chuleta_de_comandos_avanzados_podman]] — Comandos avanzados
- [[MOC_Podman]] — Índice de Podman
