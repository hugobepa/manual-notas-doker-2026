---
title: "Instalación de Podman y Docker en Windows 11: Guía Completa"
description: "Guía paso a paso para instalar Podman y Docker Desktop en Windows 11."
createdAt: 2026-08-01
updatedAt: 2026-08-02
tags:
  - podman/instalacion
  - podman/windows
  - docker/windows
type: entorno
category: podman
complexity: principiante
isPinned: false
growthStage: seedling
---
# 🪟 Instalación de Podman y Docker en Windows 11

Guía paso a paso para instalar Podman y Docker Desktop en Windows 11.

---

## 📦 Opciones de Instalación

| Herramienta        | Método                  | Ventaja                             |
| :----------------- | :---------------------- | :---------------------------------- |
| **Docker Desktop** | Instalador oficial      | Interfaz gráfica, integración WSL2  |
| **Podman Desktop** | Instalador oficial      | Alternativa open-source, sin daemon |
| **Podman CLI**     | `winget install Podman` | Solo línea de comandos, más ligero  |

---

## 🚀 Instalación con Winget

```powershell
# Docker Desktop
winget install Docker.DockerDesktop

# Podman Desktop
winget install Podman.PodmanDesktop

# Podman CLI
winget install RedHat.Podman
```

---

## 📚 Información relacionada

La comparativa detallada entre Podman y Docker Desktop (recursos, RAM, comandos no soportados) y la configuración del alias `docker` → `podman` se han movido a notas dedicadas:

- [[02_diferencia_entre_podman_y_docker_en]] — Diferencias técnicas, recursos y comandos
- [[03_alias_docker_a_podman]] — Alias `docker` → `podman` (copy-paste)

---

## 🔗 Notas Relacionadas

- [[02_diferencia_entre_podman_y_docker_en]] — Diferencias técnicas y recursos
- [[03_alias_docker_a_podman]] — Alias `docker` → `podman`
- [[04_chuleta_de_comandos_basicos_podman]] — Comandos esenciales
- [[06_uso_y_configuracion_de_podman_desktop]] — Podman Desktop
- [[MOC_Podman]] — Índice de Podman
