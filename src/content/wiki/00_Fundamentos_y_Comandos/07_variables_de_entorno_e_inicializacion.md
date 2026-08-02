---
title: "Variables de Entorno e Inicialización de Contenedores"
description: "Aprenderás a configurar variables de entorno al iniciar contenedores, usar archivos `.env` y establecer configuraciones predeterminadas en t"
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/fundamentos
  - docker/variables-entorno
  - docker/env
  - docker/configuracion
type: guia
category: fundamentos
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🌍 Variables de Entorno e Inicialización de Contenedores

Aprenderás a configurar variables de entorno al iniciar contenedores, usar archivos `.env` y establecer configuraciones predeterminadas en tus Dockerfiles.

---

## 📋 `docker run -e` — Pasar Variables de Entorno

La forma más directa de configurar un contenedor es mediante la flag `-e` (o `--env`):

```bash
# Una variable
docker run -e NODE_ENV=production nginx

# Múltiples variables
docker run \
  -e NODE_ENV=production \
  -e DATABASE_URL=postgres://user:pass@host:5432/db \
  -e API_KEY=sk-123456 \
  mi-app
```

> [!warning] Secretos en línea de comandos
> Pasar secretos directamente con `-e` los deja visibles en el historial de la terminal y en `docker inspect`. Para información sensible, usa [[03_explicacion_y_consejos_de_volumenes|Docker Secrets]] o archivos `.env`.

---

## 📄 `docker run --env-file` — Cargar desde un Archivo

Define todas tus variables en un archivo y pásalo de una vez:

### Archivo `.env`

```text
NODE_ENV=production
DATABASE_URL=postgres://user:pass@host:5432/db
API_KEY=sk-123456
LOG_LEVEL=debug
```

### Comando

```bash
docker run --env-file ./.env mi-app
```

---

## 🏗️ Variables en el Dockerfile con `ENV`

Define valores predeterminados que pueden sobrescribirse en tiempo de ejecución:

```dockerfile
FROM node:22-alpine

# Valores predeterminados
ENV NODE_ENV=development
ENV PORT=3000
ENV LOG_LEVEL=info

WORKDIR /app
COPY . .
RUN npm ci

EXPOSE $PORT
CMD ["node", "server.js"]
```

```bash
# Sobrescribir en tiempo de ejecución
docker run -e NODE_ENV=production -e PORT=8080 mi-app
```

> [!tip] Orden de precedencia
> Las variables de entorno tienen esta prioridad:
>
> 1. `docker run -e` (mayor prioridad)
> 2. `--env-file`
> 3. `ENV` en Dockerfile (valor por defecto)

---

## 🔐 `ENV` vs `ARG` — Variables de Build vs Runtime

| Aspecto                   | `ENV`                                     | `ARG`                           |
| :------------------------ | :---------------------------------------- | :------------------------------ |
| **Disponible en build**   | ✅                                        | ✅                              |
| **Disponible en runtime** | ✅                                        | ❌ (solo durante el build)      |
| **Se pasa con**           | `docker run -e`                           | `docker build --build-arg`      |
| **Persiste en la imagen** | ✅ Sí                                     | ❌ No                           |
| **Uso típico**            | Configuración de la app (puerto, entorno) | Versiones, flags de compilación |

```dockerfile
# ARG solo existe durante el build
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine

# ENV persiste en la imagen y en el contenedor
ENV APP_HOME=/usr/src/app
WORKDIR ${APP_HOME}
```

### Pasar ARG en el build

```bash
docker build --build-arg NODE_VERSION=20 -t mi-app .
```

---

## 🧪 Inspeccionar Variables en un Contenedor

### Ver todas las variables de entorno

```bash
docker exec <container-id> env
```

### Ver una variable específica

```bash
docker exec <container-id> printenv NODE_ENV
```

### Desde fuera con `docker inspect`

```bash
docker inspect <container-id> | grep -A 10 "Env"
```

---

## 📊 Comparativa de Métodos

```mermaid
graph TD
    A[¿De dónde vienen las variables?] --> B[Dockerfile: ENV]
    A --> C[Dockerfile: ARG]
    A --> D[docker run -e]
    A --> E[--env-file]

    B --> F[Runtime: disponible]
    C --> G[Build: desaparece después]
    D --> F
    E --> F

    F --> H[Prioridad: -e > --env-file > ENV]
```

---

## 🔗 Notas Relacionadas

- [[02_descarga_imagenes_y_creacion_contenedores]] — Fundamentos de `docker run`
- [[09_inicializar_imagen_con_run]] — Guía avanzada con todas las opciones de `docker run`
- [[03_gestion_de_contenedores_ps_commit]] — Inspeccionar estado de contenedores
- [[MOC_Fundamentos]] — Índice general de la categoría Fundamentos
