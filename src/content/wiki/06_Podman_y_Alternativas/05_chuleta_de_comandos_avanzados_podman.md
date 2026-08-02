---
title: "Chuleta de Comandos Avanzados de Podman: Pods, Redes y Systemd"
description: "Comandos avanzados: pods, redes, volúmenes y generación de systemd."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - podman/comandos
  - podman/avanzado
  - podman/pods
type: chuleta
category: podman
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🚀 Chuleta de Comandos Avanzados de Podman

Comandos avanzados: pods, redes, volúmenes y generación de systemd.

---

## 📦 Pods (Grupos de Contenedores)

| Comando                           | Descripción     |
| :-------------------------------- | :-------------- |
| `podman pod create --name mi-pod` | Crear un pod    |
| `podman pod ps`                   | Listar pods     |
| `podman pod rm mi-pod`            | Eliminar un pod |

---

## 🌐 Redes

| Comando                        | Descripción  |
| :----------------------------- | :----------- |
| `podman network create mi-red` | Crear red    |
| `podman network ls`            | Listar redes |
| `podman network rm mi-red`     | Eliminar red |

---

## 🔧 Systemd

```bash
# Generar unidad systemd para un contenedor
podman generate systemd --name mi-contenedor > ~/.config/systemd/user/mi-contenedor.service
systemctl --user enable --now mi-contenedor
```

---

## 🔗 Notas Relacionadas

- [[04_chuleta_de_comandos_basicos_podman]] — Comandos básicos
- [[08_despliegue_de_postgresql_y_pgadmin4_en_podman]] — PostgreSQL en Podman
- [[MOC_Podman]] — Índice de Podman
