---
title: "Chuleta General de Comandos Docker: Referencia Rápida Completa"
description: "Referencia rápida de todos los comandos Docker esenciales."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/comandos
  - docker/chuleta
  - docker/referencia
type: chuleta
category: recursos
complexity: principiante
isPinned: false
growthStage: seedling
---
# 📋 Chuleta General de Comandos Docker

Referencia rápida de todos los comandos Docker esenciales.

---

## 🚀 Ejecución

| Comando                             | Descripción                       |
| :---------------------------------- | :-------------------------------- |
| `docker run -d --name X imagen`     | Ejecutar contenedor en background |
| `docker run -it imagen bash`        | Ejecutar con terminal interactiva |
| `docker run --rm imagen`            | Eliminar al detenerse             |
| `docker run -p 8080:80 imagen`      | Mapear puertos                    |
| `docker run -v ./data:/data imagen` | Montar volumen                    |

## 📊 Inspección

| Comando                     | Descripción            |
| :-------------------------- | :--------------------- |
| `docker ps`                 | Contenedores activos   |
| `docker ps -a`              | Todos los contenedores |
| `docker images`             | Imágenes locales       |
| `docker logs -f contenedor` | Logs en tiempo real    |
| `docker inspect contenedor` | Detalles completos     |

## 🧹 Limpieza

| Comando                  | Descripción                     |
| :----------------------- | :------------------------------ |
| `docker container prune` | Eliminar contenedores detenidos |
| `docker image prune -a`  | Eliminar imágenes no usadas     |
| `docker system prune -a` | Limpieza total                  |

---

## 🔗 Notas Relacionadas

- [[02_guia_rapida_de_docker]] — Guía rápida
- [[03_guia_complementaria_de_estudio]] — Guía de estudio
- [[MOC_Docker_General]] — Índice general
