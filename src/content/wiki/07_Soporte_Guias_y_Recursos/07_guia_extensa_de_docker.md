---
title: "Guía Extensa de Docker: Cheat-Sheet Completo de Comandos y Flujos"
description: "Referencia exhaustiva de comandos Docker: búsqueda, ejecución, logs, ciclo de vida, guardado/carga sin Internet, publicación en Docker Hub, "
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/comandos
  - docker/chuleta
  - docker/volumenes
  - docker/registry
type: chuleta
category: recursos
complexity: intermedio
isPinned: false
growthStage: budding
---
# 📖 Guía Extensa de Docker: Cheat-Sheet Completo

Referencia exhaustiva de comandos Docker: búsqueda, ejecución, logs, ciclo de vida, guardado/carga sin Internet, publicación en Docker Hub, volúmenes, optimización y eliminación. Pensada para **consulta rápida** — todo en tablas y bloques de código copiables.

> [!warning] Correcciones de tipeo del documento original
> Esta guía corrige erratas evidentes del material fuente para que los comandos sean copiables y funcionales: `dockers` → `docker`, `fm` → `rm`, `psotgresql` → `postgresql`, `POSTGRES_PW` → `POSTGRES_PASSWORD`. **No se ha eliminado ninguna información**, solo se corrige la sintaxis.

---

## 🗺️ Mapa Visual del Ciclo de Vida

```mermaid
graph LR
    A[Dockerfile] -->|docker build| B[Imagen Local]
    B -->|docker run| C[Contenedor]
    C -->|docker commit| B
    C -->|docker logs / attach / exec| C
    B -->|docker save| D[archivo .tar]
    D -->|docker load| B
    B -->|docker tag + docker push| E[Docker Hub]
    E -->|docker pull| B
    C -->|docker stop / rm| F[🗑️ Eliminado]
    B -->|docker rmi| F
    class A,B,C,D,E,F internal-link;
```

---

## 🔍 Búsqueda e Imágenes

| Comando                                                                                     | Descripción                                                      |
| :------------------------------------------------------------------------------------------ | :--------------------------------------------------------------- |
| `docker search postgrest`                                                                   | Búsqueda simple en Docker Hub                                    |
| `docker search --limit 5 --filter stars=100 --filter is-official=true --no-trunc postgrest` | Búsqueda avanzada: top 5, +100 estrellas, oficiales, sin truncar |
| `docker images`                                                                             | Ver imágenes locales                                             |
| `docker system df`                                                                          | Ver ocupación total de disco de Docker                           |
| `docker system prune`                                                                       | Limpieza general (no borra imágenes, sí caché)                   |
| `docker system prune -a`                                                                    | Limpieza de imágenes no utilizadas                               |
| `docker ps`                                                                                 | Contenedores en ejecución                                        |
| `docker ps -a`                                                                              | Todos los contenedores (incluidos detenidos)                     |
| `docker build -t mi-primera-imagen .`                                                       | Construir imagen                                                 |
| `docker build -t hola-docker:dev .`                                                         | Construir imagen con etiqueta de versión                         |
| `docker init`                                                                               | Auto-configuración de Docker en el proyecto                      |

---

## 🚀 Creación y Ejecución de Contenedores

| Comando                                       | Descripción                                                       |
| :-------------------------------------------- | :---------------------------------------------------------------- |
| `docker run -d mi-primera-imagen`             | Ejecutar en segundo plano (`-d`)                                  |
| `docker run -d --rm mi-primera-imagen`        | Segundo plano + autodestrucción al parar (`--rm`)                 |
| `docker run hello-world`                      | Llamada simple a imagen del [Docker Hub](https://hub.docker.com/) |
| `docker run --rm -it node:22 --version`       | Eliminación post-uso + terminal interactiva (`-it`)               |
| `docker run --rm -it node:22 bash`            | Igual que arriba, entrando directamente a `bash`                  |
| `docker run --rm -d -p 5002:3000 02-node-web` | Segundo plano + autodestrucción + mapeo de puertos                |

> [!info] ¿Qué hace `-it`?
> Permite "hablar" directamente con el proceso del contenedor: ves la salida en formato legible y puedes usar atajos como `Ctrl+C`. Se compone de dos flags combinadas: **`-i`** (interactive) mantiene abierta la entrada estándar (STDIN) para escribir comandos dentro del contenedor, y **`-t`** (tty) asigna un pseudo-terminal para que la shell se comporte como una terminal real.

<!-- -->

> [!tip] Mapeo de puertos `-p`
> `-p` es la abreviatura de `--publish`. Formato: `-p <puerto_host>:<puerto_contenedor>`.
> En `-p 5002:3000`: **5002** es el puerto de tu máquina host, **3000** es el puerto dentro del contenedor.

### Variables de Entorno

```bash
# Variables desde un archivo .env
docker run -d --env-file .env --name web-env mi-app

# Variables individuales con -e
docker run -d -p 5005:3000 -e SALUDO="hola" -e OTRA="mundo" --name web-env mi-app

docker run -d -p 5005:3000 -e SALUDO="hola-mundo" --name web-env mi-app:latest
```

### Ejemplo Comentado: `docker run -it --rm hbp/docker-ejemplo:0.1 sh`

| Parte del comando        | Traducción a humano                         | Analogía                                                                                  |
| :----------------------- | :------------------------------------------ | :---------------------------------------------------------------------------------------- |
| `docker run`             | "Crea y arranca un nuevo contenedor"        | Como encender un ordenador nuevo a partir de un "disco duro" (imagen).                    |
| `-it`                    | "Modo interactivo con terminal"             | Como abrir una ventana de terminal en ese ordenador para poder escribir y ver resultados. |
| `--rm`                   | "Al apagar, bórralo todo sin dejar rastro"  | Es como usar un ordenador desechable: cuando apagas, desaparece.                          |
| `hbp/docker-ejemplo:0.1` | "Usa esta imagen concreta"                  | Es el "disco duro" o sistema operativo que va a tener ese ordenador.                      |
| `sh`                     | "Ejecuta la shell (intérprete de comandos)" | Es el programa que te da el prompt para escribir comandos (como `ls`, `cd`, `cat`).       |

---

## 📜 Logs y Attach

```bash
docker logs 09d9b8912d4b                                                          # logs históricos
docker logs -f 09d9b8912d4b                                                       # logs en tiempo real
docker logs -f -t --tail 100 --since "2026-07-30T10:00:00" 09d9b8912d4b           # logs "chungos" combinados
docker attach 09d9b8912d4b                                                        # conectar al proceso principal
```

| Flag                  | Significado                                                                  |
| :-------------------- | :--------------------------------------------------------------------------- |
| `--tail N`            | Muestra solo las últimas **N** líneas y termina (sin `-f`). Ej: `--tail 50`  |
| `--since`             | Muestra logs a partir de una fecha/hora. Ej: `--since "2026-07-30T10:00:00"` |
| `--until`             | Muestra logs hasta una fecha/hora.                                           |
| `-t` / `--timestamps` | Añade la marca de tiempo a cada línea de log.                                |

```bash
# Crear una nueva imagen a partir del estado actual de un contenedor
docker commit 09d9b8912d4b mi-imagen:version1
```

---

## ⏯️ Ciclo de Vida: Iniciar y Detener

| Comando                          | Descripción                                |
| :------------------------------- | :----------------------------------------- |
| `docker start 09d9b8912d4b`      | Encender contenedor                        |
| `docker stop 09d9b8912d4b`       | Parar contenedor                           |
| `docker stop -t 30 09d9b8912d4b` | Parar con tiempo de espera (`-t`, en seg.) |
| `docker kill 09d9b8912d4b`       | Matar proceso y contenedor de inmediato    |
| `docker pause 09d9b8912d4b`      | Pausar contenedor                          |

---

## 💾 Guardar y Cargar Imágenes (Sin Internet)

```bash
# Escenario 1: guardar imagen en un .tar transportable
docker save -o hola-docker.tar hola-docker:latest

# Cargar la imagen en la máquina destino
docker load -i hola-docker.tar
docker load < hola-docker.tar                    # vía redirección

# Si se comprimió con gzip
gunzip -c hola-docker.tar.gz | docker load
```

### Resumen del Flujo Completo (Sin Internet)

| Paso        | Comando                                             | Lugar                  |
| :---------- | :-------------------------------------------------- | :--------------------- |
| 1. Guardar  | `docker save -o hola-docker.tar hola-docker:latest` | Origen (con Internet)  |
| 2. Mover    | Copiar `hola-docker.tar` por USB, SCP, etc.         | Entre máquinas         |
| 3. Cargar   | `docker load -i hola-docker.tar`                    | Destino (sin Internet) |
| 4. Ejecutar | `docker run hola-docker:latest`                     | Destino                |

---

## ☁️ Publicar en Docker Hub (`docker push`)

```bash
# 1. Crear cuenta en https://hub.docker.com/signup

# 2. Iniciar sesión
docker login
docker login -u tu-usuario

# 3. Etiquetar la imagen local con el namespace del registry
docker tag hola-docker:latest juanperez/hola-docker:latest

# 4. Subir la imagen
docker push juanperez/hola-docker:latest

# 5. Descargar y ejecutar en cualquier máquina
docker pull juanperez/hola-docker:latest
docker run juanperez/hola-docker:latest
```

---

## 🗄️ Volúmenes y Persistencia

```bash
docker volume create datos-db
```

```bash
# ⚠️ Ejemplo original con erratas (POSTGRES_PW y "psotgresql") — ver versión corregida abajo
docker run -d \
  --name postgres-container \
  -e POSTGRES_PW=secreto \
  -v datos-db:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16
```

```bash
# ✅ Versión corregida y funcional
docker run -d \
  --name postgres-container \
  -e POSTGRES_USER=usuario \
  -e POSTGRES_PASSWORD=secreto \
  -e POSTGRES_DB=basedatos \
  -v datos-db:/var/lib/postgresql/data \
  postgres:16-alpine

docker run -d \
  --name postgrest-container \
  -e PGRST_DB_URI=postgres://usuario:secreto@host:5432/basedatos \
  -e PGRST_DB_SCHEMA=public \
  -p 3000:3000 \
  postgrest/postgrest
```

```bash
# Cambiar código en caliente montando el proyecto como volumen
docker run -d -p 3000:3000 \
  --name mi-app-live \
  -v "$(pwd)":/app \
  app-volumenes \
  sh -c "node --watch server.js"
```

---

## ⚖️ Optimización y Recursos Ligeros

```bash
# Limitar el uso de memoria y CPU
docker run -d --memory="512m" --cpus="1.0" mi-imagen:tag

# Forzar arquitectura ARM (ej. Mac M1/M2, Raspberry Pi)
docker pull --platform linux/arm64 mi-imagen:tag

# Forzar arquitectura AMD64 (la mayoría de servidores)
docker pull --platform linux/amd64 mi-imagen:tag
docker pull --platform linux/amd64 mi-imagen:latest

# Descargar por digest exacto (inmutable)
docker pull mi-imagen@sha256:xxxxxxxx
```

---

## 🖥️ Ejecutar Comandos Dentro de Contenedores (`docker exec`)

```bash
docker exec -it postgrest-nuevo psql -U postgres -c "SELECT * FROM tabla;"
docker exec -it ubuntu bash -c "ls -a"
docker exec -it ubuntu ls -a
```

---

## 🗑️ Eliminación de Contenedores e Imágenes

```bash
docker rm -f docker-ejemplo               # eliminar contenedor
docker rmi -f imagen-ejemplo              # eliminar imagen
docker rmi -f mi-imagen:latest
```

### Flujo Recomendado (Sencillo)

```bash
# 1. Listar contenedores que usan la imagen
docker ps -a --filter ancestor=mi-imagen:latest

# 2. Detener y eliminar esos contenedores
docker stop <container-id>
docker rm <container-id>

# 3. Ahora puedes eliminar la imagen sin -f
docker rmi mi-imagen:latest
```

### Limpieza "a Saco"

```bash
# Elimina todas las imágenes no usadas (no asociadas a ningún contenedor)
docker image prune -a

# Elimina imágenes no usadas, contenedores detenidos, redes y caché de construcción
docker system prune -a

# Elimina contenedores, imágenes y volúmenes no usados
docker system prune -a --volumes
```

> [!danger] Cuidado con `--volumes`
> `docker system prune -a --volumes` también borra volúmenes no usados. Si contienen datos de bases de datos, se pierden **permanentemente**. Haz backup antes (ver más abajo).

### Ejemplo: Limpiar una Imagen de Next.js

```bash
docker images
docker rmi -f mi-next-app:experimental
docker image prune -a
```

### Ejemplo: Eliminar Stack de PostgreSQL Completo

```bash
# 1. Detener y eliminar el contenedor
docker stop mi-postgres
docker rm mi-postgres

# 2. Eliminar la imagen (ya no está en uso)
docker rmi postgres:16-alpine

# 3. Los datos del volumen siguen ahí (¡no se borran solos!)
docker volume ls

# 4. Eliminar el volumen explícitamente
docker volume rm postgres_data
docker volume rm -f nombre-del-volumen
```

### Buenas Prácticas Antes de Eliminar un Volumen

```bash
# Inspeccionar el contenido/metadatos del volumen
docker volume inspect postgres_data

# Backup de los datos antes de eliminar el volumen
docker run --rm -v postgres_data:/source -v $(pwd):/backup alpine \
  tar czf /backup/backup.tar.gz -C /source .
```

---

## 📁 Archivos de Configuración

### Estructura de Proyecto y `.dockerignore`

```text
proyecto/
├── .dockerignore        ← controla qué NO se copia al build
├── Dockerfile
├── .env                 ← ignorado (datos sensibles)
├── .env.example          ← SÍ se copia (excepción con "!")
├── node_modules/         ← ignorado (se instala dentro del contenedor)
├── dist/ · build/        ← ignorados (generados por el proyecto)
├── .git/                 ← ignorado (historial completo)
└── app.js                ← SÍ se copia
```

```text
.git/             # Contiene todo el historial del proyecto
.env*             # datos sensibles
!.env.example     # excepción: sí se incluye ("!" en .dockerignore)
node_modules/     # deben instalarse dentro del contenedor
*.log             # específicos de la ejecución
.vscode/          # configuración local del desarrollador
.idea/            # configuración local del desarrollador
dist/             # el proyecto genera estos archivos
build/            # el proyecto genera estos archivos
```

### Dockerfile Mínimo de Referencia

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY app.js .

CMD ["node", "app.js"]
```

---

## 🔗 Notas Relacionadas

- [[01_chuleta_general_de_comandos_docker]] — Chuleta de comandos base
- [[06_gestion_de_imagenes]] — Gestión de imágenes en detalle
- [[03_explicacion_y_consejos_de_volumenes]] — Volúmenes en profundidad
- [[04_uso_del_archivo_dockerignore]] — `.dockerignore` en detalle
- [[MOC_Docker_General]] — Índice central
