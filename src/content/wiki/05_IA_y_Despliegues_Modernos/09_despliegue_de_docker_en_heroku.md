---
title: "Despliegue de Docker en Heroku"
description: "Heroku es el clásico de los PaaS. Aunque ha perdido popularidad frente a alternativas modernas, sigue siendo una opción sólida con un ecosis"
createdAt: 2026-08-02
updatedAt: 2026-08-02
tags:
  - docker/heroku
  - docker/despliegue
  - docker/cloud
type: guia
category: ia
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🟣 Despliegue de Docker en Heroku

Heroku es el **clásico** de los PaaS. Aunque ha perdido popularidad frente a alternativas modernas, sigue siendo una opción sólida con un ecosistema de add-ons muy maduro.

---

## 📊 Características

| Característica                 | Detalle                                       |
| :----------------------------- | :-------------------------------------------- |
| **Modelo**                     | Contenedores **always-on** (dynos)            |
| **Precio**                     | Desde **$5/mes** (dynos)                      |
| **Despliegue**                 | Desde Git o `heroku container:push`           |
| **Almacenamiento persistente** | ❌ No nativo (usar servicios externos)        |
| **Escalado**                   | Manual                                        |
| **Ideal para**                 | Proyectos legacy o equipos que ya usan Heroku |

---

## 🚀 Flujo de Despliegue

```mermaid
graph LR
    A[Git Push / CLI] --> B[Heroku detecta Dockerfile]
    B --> C[Construye imagen en Container Registry]
    C --> D[Libera como dyno]
    D --> E[App always-on]
```

---

## 🎯 Ideal para

- Equipos que ya conocen Heroku y tienen flujos establecidos
- Proyectos legacy que migran desde dynos tradicionales a contenedores
- Apps que se benefician del ecosistema de **add-ons** (150+ servicios)

---

## ✨ Ventaja Clave

> [!tip] Ecosistema de add-ons
> Heroku Elements ofrece más de 150 add-ons (bases de datos, monitoring, logging, email, search, etc.) que se integran con un solo clic. La madurez del ecosistema es difícil de igualar.

---

## ⚠️ Limitación

> [!warning] Sin persistencia nativa
> Heroku no ofrece almacenamiento persistente en sus dynos. Para datos duraderos necesitas add-ons externos (Heroku Postgres, Redis, etc.) o servicios cloud como S3.

---

## 📄 Ejemplo: Despliegue con Container Registry

```bash
# Login en Container Registry
heroku container:login

# Crear app
heroku create mi-app-docker

# Construir y empujar imagen
heroku container:push web

# Liberar la imagen
heroku container:release web

# Abrir en navegador
heroku open
```

---

## 🔗 Enlaces

- **[Heroku Container Registry docs](https://devcenter.heroku.com/articles/container-registry-and-runtime)**
- **[heroku.com](https://heroku.com)**

---

## 🔗 Notas Relacionadas

- [[05_despliegue_de_docker_en_render]] — Alternativa moderna a Heroku
- [[06_despliegue_de_docker_en_railway]] — Simplicidad estilo Heroku
- [[MOC_IA_Despliegues]] — Índice de IA y despliegues
