---
title: "Dashboard de Arquitecturas: Creación y Vinculación de Servicios"
description: "15 notas distribuidas en dos carpetas: `03CreaciondeServicios` (7) y `04VinculacionyConexiones` (8). Cubre cómo dockerizar y conectar servic"
createdAt: 2026-08-02
updatedAt: 2026-08-02
tags:
  - dashboard
  - docker/creacion
  - docker/vinculacion
  - docker/arquitectura
type: dashboard
category: creacion
complexity: intermedio
isPinned: true
growthStage: budding
---
# 🏗️ Dashboard de Arquitecturas: Creación y Vinculación de Servicios

**15 notas** distribuidas en dos carpetas: `03_Creacion_de_Servicios` (7) y `04_Vinculacion_y_Conexiones` (8). Cubre cómo dockerizar y conectar servicios reales.

---

## 🗺️ Mapa de Arquitecturas

```mermaid
graph TD
    subgraph Creacion["🔨 03_Creacion de Servicios"]
        C1[01_monorepo_db]
        C2[02_docker_db]
        C3[03_docker_frontend]
        C4[04_docker_backend]
        C5[05_compose_servicios]
        C6[06_compose_frontend_backend_db]
    end

    subgraph Vinculacion["🔗 04_Vinculacion y Conexiones"]
        V1[01_vincular_frontend_backend_1]
        V2[02_vincular_frontend_backend_2]
        V3[03_vincular_react_apis]
        V4[04_vincular_nextjs_backend]
        V5[05_vincular_backend_db]
        V6[06_vincular_db_contenedores]
        V7[07_vincular_nextjs_db]
        V8[08_healthcheck_nginx]
    end

    C1 --> V1
    C2 --> V5
    C3 --> V3
    C4 --> V1
    C5 --> V4
    C6 --> V7
    V1 --> V2
    V5 --> V6
    V4 --> V7
    V7 --> V8
```

---

## 🔨 Creación de Servicios (7 notas)

| #   | Nota                                           | Type     | Complexity |
| :-- | :--------------------------------------------- | :------- | :--------- |
| 1   | [[01_crear_docker_monorepo_con_base_de_datos]] | guia     | intermedio |
| 2   | [[02_crear_docker_para_base_de_datos]]         | guia     | intermedio |
| 3   | [[03_crear_docker_para_frontend]]              | guia     | intermedio |
| 4   | [[04_crear_docker_para_backend]]               | guia     | intermedio |
| 5   | [[05_crear_docker_backend_con_base_de_datos]]      | concepto | intermedio |
| 6   | [[07_crear_docker_backend_apirest_con_database]]      | concepto | avanzado   |

---

## 🔗 Vinculación y Conexiones (8 notas)

| #   | Nota                                              | Type          | Complexity |
| :-- | :------------------------------------------------ | :------------ | :--------- |
| 1   | [[01_vincular_frontend_y_backend_parte_1]]        | guia          | intermedio |
| 2   | [[02_vincular_frontend_y_backend_parte_2]]        | guia          | intermedio |
| 3   | [[03_vincular_backend_apirest_y_frontend]]             | concepto      | intermedio |
| 4   | [[04_vincular_backend_con_frontend_variante_2]]       | guia          | intermedio |
| 5   | [[05_vincular_backend_con_base_de_datos]]         | guia          | intermedio |
| 6   | [[06_vincular_backend_base_de_datos_y_frontend_v1]] | concepto      | avanzado   |
| 7   | [[07_vincular_frontend_nextjs_y_database]]        | guia          | avanzado   |
| 8   | [[08_vincular_backend_base_de_datos_y_frontend_v2]]           | caso-practico | avanzado   |

---

## 📈 Distribución

```mermaid
pie title Arquitecturas por Complejidad
    "intermedio" : 10
    "avanzado" : 5
```

---

## 🏷️ Tags de Arquitecturas

| Tag                  | Cantidad | Carpeta        |
| :------------------- | :------- | :------------- |
| `docker/creacion`    | 7        | 03_Creacion    |
| `docker/vinculacion` | 8        | 04_Vinculacion |
| `docker/compose`     | 5        | 03 + 04        |
| `docker/redes`       | 4        | 04_Vinculacion |
| `docker/healthcheck` | 2        | 04_Vinculacion |
| `docker/nginx`       | 2        | 04_Vinculacion |
| `stack/nextjs`       | 3        | 03 + 04        |
| `stack/react`        | 2        | 04_Vinculacion |
| `stack/postgresql`   | 3        | 03_Creacion    |

---

## 🎯 Patrones de Arquitectura

```text
┌─────────────────────────────────────────────────────┐
│  PATRÓN 1: Frontend + Backend + DB (Compose)        │
│                                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐        │
│  │ Frontend │──▶│ Backend  │──▶│ Database  │        │
│  │ :3000    │   │ :4000    │   │ :5432    │        │
│  └──────────┘   └──────────┘   └──────────┘        │
│       ↑                            ↑               │
│  03_crear_frontend           02_crear_db           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PATRÓN 2: Next.js + API + PostgreSQL               │
│                                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐        │
│  │ Next.js  │──▶│  API     │──▶│PostgreSQL │        │
│  │  (SSR)   │   │  (Hono)  │   │  :5432   │        │
│  └──────────┘   └──────────┘   └──────────┘        │
│       ↑                            ↑               │
│  04_vincular_nextjs          05_vincular_db        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  PATRÓN 3: Proxy con Nginx + Healthcheck            │
│                                                     │
│  ┌──────────┐                                      │
│  │  Nginx   │──▶ Backend ──▶ DB                    │
│  │  :80     │                                      │
│  └──────────┘                                      │
│       ↑                                            │
│  08_healthcheck_nginx                              │
└─────────────────────────────────────────────────────┘
```

---

## 🔗 Notas Relacionadas

- [[MOC_Arquitecturas]] — Índice completo de arquitecturas
- [[MOC_Compose]] — Docker Compose
- [[04_dashboard_dockerfiles]] — Dashboard de Dockerfiles
- [[00_dashboard_general]] — Dashboard general
