---
title: "Inicialización de Imágenes con docker run: Guía Completa"
description: "Guía exhaustiva de todas las opciones y flags de `docker run`, el comando más importante del ecosistema Docker."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/fundamentos
  - docker/docker-run
  - docker/inicializacion
type: guia
category: fundamentos
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🚀 Inicialización de Imágenes con `docker run`: Guía Completa

Guía exhaustiva de todas las opciones y flags de `docker run`, el comando más importante del ecosistema Docker.

---

## 🧠 Anatomía de `docker run`

```text
docker run [OPCIONES] IMAGEN [COMANDO] [ARGUMENTOS...]
```

`docker run` = `docker create` + `docker start` + `docker attach` (por defecto, sin `-d`)

---

## 🎛️ Todas las Opciones por Categoría

### 🔗 Modos de Ejecución

| Flag              | Descripción                                                         | Ejemplo                                   |
| :---------------- | :------------------------------------------------------------------ | :---------------------------------------- |
| `-d` / `--detach` | Ejecutar en segundo plano y devolver el control                     | `docker run -d nginx`                     |
| `-it`             | Interactivo + TTY: `-i` mantiene STDIN, `-t` asigna pseudo-terminal | `docker run -it ubuntu bash`              |
| `--rm`            | Eliminar el contenedor automáticamente al detenerse                 | `docker run --rm alpine echo "hola"`      |
| `-a` / `--attach` | Conectarse a STDIN, STDOUT o STDERR                                 | `docker run -a STDOUT alpine echo "hola"` |

### 🏷️ Identidad y Nombres

| Flag         | Descripción                     | Ejemplo                                 |
| :----------- | :------------------------------ | :-------------------------------------- |
| `--name`     | Asignar un nombre al contenedor | `docker run --name mi-web nginx`        |
| `--hostname` | Establecer el hostname interno  | `docker run --hostname servidor1 nginx` |
| `--label`    | Añadir metadatos (etiquetas)    | `docker run --label env=prod nginx`     |

### 🌐 Redes y Puertos

| Flag                   | Descripción                                            | Ejemplo                                               |
| :--------------------- | :----------------------------------------------------- | :---------------------------------------------------- |
| `-p` / `--publish`     | Mapear puerto host:contenedor                          | `docker run -p 8080:80 nginx`                         |
| `-P` / `--publish-all` | Publicar todos los puertos EXPOSE a puertos aleatorios | `docker run -P nginx`                                 |
| `--network`            | Conectar a una red específica                          | `docker run --network mi-red nginx`                   |
| `--dns`                | Servidor DNS personalizado                             | `docker run --dns 8.8.8.8 nginx`                      |
| `--add-host`           | Añadir entrada al /etc/hosts                           | `docker run --add-host api.local:192.168.1.100 nginx` |

### 💾 Almacenamiento y Volúmenes

| Flag              | Descripción                                | Ejemplo                                                          |
| :---------------- | :----------------------------------------- | :--------------------------------------------------------------- |
| `-v` / `--volume` | Montar un volumen o bind mount             | `docker run -v ./data:/app/data nginx`                           |
| `--mount`         | Sintaxis más explícita para montajes       | `docker run --mount type=bind,src=./data,target=/app/data nginx` |
| `--tmpfs`         | Montar sistema de archivos temporal en RAM | `docker run --tmpfs /tmp nginx`                                  |

### 🌍 Variables de Entorno

| Flag           | Descripción                       | Ejemplo                              |
| :------------- | :-------------------------------- | :----------------------------------- |
| `-e` / `--env` | Establecer variable de entorno    | `docker run -e NODE_ENV=prod nginx`  |
| `--env-file`   | Cargar variables desde un archivo | `docker run --env-file ./.env nginx` |

### 🔒 Seguridad y Recursos

| Flag                       | Descripción                            | Ejemplo                                                      |
| :------------------------- | :------------------------------------- | :----------------------------------------------------------- |
| `--user`                   | Usuario con el que ejecutar el proceso | `docker run --user 1000:1000 nginx`                          |
| `--read-only`              | Sistema de archivos de solo lectura    | `docker run --read-only nginx`                               |
| `--memory` / `-m`          | Límite de memoria RAM                  | `docker run -m 512m nginx`                                   |
| `--cpus`                   | Límite de CPUs                         | `docker run --cpus 1.5 nginx`                                |
| `--restart`                | Política de reinicio                   | `docker run --restart always nginx`                          |
| `--cap-add` / `--cap-drop` | Añadir/quitar capacidades del kernel   | `docker run --cap-drop ALL --cap-add NET_BIND_SERVICE nginx` |

### 🏥 Healthcheck

| Flag                | Descripción                            | Ejemplo                                            |
| :------------------ | :------------------------------------- | :------------------------------------------------- | --- | -------------- |
| `--health-cmd`      | Comando para verificar salud           | `docker run --health-cmd="curl -f http://localhost |     | exit 1" nginx` |
| `--health-interval` | Intervalo entre chequeos               | `docker run --health-interval=30s nginx`           |
| `--health-timeout`  | Timeout del chequeo                    | `docker run --health-timeout=5s nginx`             |
| `--health-retries`  | Reintentos antes de declarar unhealthy | `docker run --health-retries=3 nginx`              |

---

## 📊 Ejemplos Prácticos Combinados

### Servidor web en producción con límites

```bash
docker run -d \
  --name mi-web \
  --restart always \
  -p 80:80 \
  -p 443:443 \
  -v ./html:/usr/share/nginx/html:ro \
  -v ./nginx.conf:/etc/nginx/nginx.conf:ro \
  -e NGINX_HOST=midominio.com \
  --memory 256m \
  --cpus 0.5 \
  --health-cmd="curl -f http://localhost || exit 1" \
  --health-interval=30s \
  nginx:alpine
```

### Base de datos PostgreSQL con volumen persistente

```bash
docker run -d \
  --name postgres-db \
  --restart unless-stopped \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=miapp \
  postgres:16-alpine
```

> [!warning] Contraseñas en línea de comandos
> Evita pasar contraseñas directamente con `-e` en producción. Usa `--env-file` con permisos restringidos o un gestor de secretos como [[03_explicacion_y_consejos_de_volumenes|Docker Secrets]].

---

## 🔗 Notas Relacionadas

- [[02_descarga_imagenes_y_creacion_contenedores]] — Fundamentos de `docker run`
- [[08_ciclo_de_vida_sencillo]] — El ciclo de vida completo del contenedor
- [[07_variables_de_entorno_e_inicializacion]] — Configuración con variables de entorno
- [[MOC_Fundamentos]] — Índice general de la categoría Fundamentos
