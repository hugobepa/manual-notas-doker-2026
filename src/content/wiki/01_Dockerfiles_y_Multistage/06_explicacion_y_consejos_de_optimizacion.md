---
title: "Explicación y Consejos de Optimización de Imágenes Docker"
description: "Explicación detallada de por qué y cómo optimizar imágenes Docker, con consejos prácticos para reducir tamaño, acelerar builds y mejorar el "
createdAt: 2026-08-02
updatedAt: 2026-08-02
tags:
  - docker/dockerfile
  - docker/optimizacion
  - docker/capas
  - docker/buenas-practicas
type: guia
category: dockerfile
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🧠 Explicación y Consejos de Optimización de Imágenes Docker

Explicación detallada de **por qué** y **cómo** optimizar imágenes Docker, con consejos prácticos para reducir tamaño, acelerar builds y mejorar el rendimiento.

---

## 🎯 ¿Por qué optimizar?

| Beneficio              | Impacto                                        |
| :--------------------- | :--------------------------------------------- |
| **Menos tamaño**       | Descargas y despliegues más rápidos            |
| **Menos superficie**   | Menos vulnerabilidades y paquetes innecesarios |
| **Builds más rápidos** | Aprovecha la caché de capas correctamente      |
| **Menos recursos**     | Menor consumo de RAM/CPU en ejecución          |

---

## 🧱 Cómo funcionan las capas (la clave)

Cada instrucción del `Dockerfile` crea una **capa**. Docker cachea cada capa y solo reconstruye las que cambian.

> [!tip] Regla de oro
> **Lo que cambia menos, primero.** Las dependencias (`package.json`, `requirements.txt`) deben copiarse e instalarse **antes** que el código fuente, que cambia constantemente.

```dockerfile
# ❌ MAL: copia todo primero → cualquier cambio invalida toda la caché
COPY . .
RUN npm install

# ✅ BIEN: dependencias primero → solo se reinstalan si cambia package.json
COPY package*.json ./
RUN npm install
COPY . .
```

---

## 🏗️ Consejos de optimización

### 1. Elige la imagen base correcta

| Imagen base      | Tamaño aprox. | Uso recomendado                   |
| :--------------- | :------------ | :-------------------------------- |
| `node:22`        | ~1 GB         | Desarrollo / compatibilidad total |
| `node:22-slim`   | ~250 MB       | Producción ligera                 |
| `node:22-alpine` | ~50 MB        | Máxima optimización               |

### 2. Usa multi-stage builds

```dockerfile
# Etapa 1: construir (con todo lo necesario)
FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: producción (solo lo esencial)
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]
```

### 3. Usa `.dockerignore`

Evita copiar `node_modules`, `.git`, `dist`, logs y archivos locales al contexto de build:

```text
node_modules/
.git/
*.log
.env
dist/
```

### 4. Combina comandos para reducir capas

```dockerfile
# ❌ MAL: varias capas
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# ✅ BIEN: una sola capa
RUN apt-get update && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
```

### 5. Instala solo dependencias de producción

```dockerfile
# ❌ MAL: instala todo
RUN npm install

# ✅ BIEN: solo producción
RUN npm ci --omit=dev
```

---

## 📊 Resumen de buenas prácticas

- [x] Imagen base ligera (`alpine` o `slim`)
- [x] Multi-stage build para separar build y runtime
- [x] Ordenar capas: lo que cambia menos, primero
- [x] Usar `.dockerignore` para reducir el contexto
- [x] Combinar `RUN` con `&&` para menos capas
- [x] Instalar solo dependencias de producción

---

## 🔗 Notas Relacionadas

- [[03_gestion_de_capas_dockerfile]] — Cómo funcionan las capas
- [[05_optimizacion_y_peso_ligero]] — Optimización y peso ligero
- [[08_busqueda_y_multistage_build]] — Multi-stage build
- [[MOC_Dockerfiles]] — Índice de Dockerfiles
