---
title: "Gestión y Descarga de Imágenes con Podman"
description: "Guía para buscar, descargar y gestionar imágenes de contenedores con Podman."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - podman/imagenes
  - podman/pull
  - podman/registries
type: guia
category: podman
complexity: principiante
isPinned: false
growthStage: seedling
---
# 📥 Gestión y Descarga de Imágenes con Podman

Guía para buscar, descargar y gestionar imágenes de contenedores con Podman.

---

## 🔍 Buscar Imágenes

```bash
# Docker Hub
podman search nginx

# Registros alternativos
podman search docker.io/nginx
podman search quay.io/prometheus/prometheus
```

## 📥 Descargar Imágenes

```bash
podman pull nginx:alpine
podman pull docker.io/library/postgres:16-alpine
```

## 📋 Listar y Eliminar

```bash
podman images
podman rmi nginx:alpine
podman image prune
```

---

## 🔗 Notas Relacionadas

- [[04_chuleta_de_comandos_basicos_podman]] — Comandos básicos
- [[06_uso_y_configuracion_de_podman_desktop]] — Podman Desktop
- [[MOC_Podman]] — Índice de Podman
