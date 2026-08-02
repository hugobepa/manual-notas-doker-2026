---
title: "Sintaxis y Configuración de compose.yaml: Referencia Completa"
description: "Referencia detallada de todos los atributos del archivo `compose.yaml` moderno (Compose Specification)."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/compose
  - docker/yaml
  - docker/configuracion
type: guia
category: compose
complexity: intermedio
isPinned: false
growthStage: budding
---
# 📝 Sintaxis y Configuración de `compose.yaml`: Referencia Completa

Referencia detallada de todos los atributos del archivo `compose.yaml` moderno (Compose Specification).

---

## 🏗️ Estructura Base

El formato moderno **no requiere `version:`**. Comienza directamente con `services:`.

```yaml
services:
  nombre-servicio:
    # atributos del servicio
```

---

## 📋 Atributos por Servicio

### Imagen y Construcción

| Atributo           | Descripción                                           | Ejemplo                       |
| :----------------- | :---------------------------------------------------- | :---------------------------- |
| `image`            | Imagen de Docker Hub o registro privado               | `image: postgres:16-alpine`   |
| `build`            | Ruta al contexto de build (directorio con Dockerfile) | `build: ./backend`            |
| `build.context`    | Ruta al contexto                                      | `context: ./backend`          |
| `build.dockerfile` | Ruta alternativa al Dockerfile                        | `dockerfile: Dockerfile.prod` |
| `build.args`       | Argumentos de build (`--build-arg`)                   | `args: \n  NODE_VERSION: 22`  |

### Puertos y Redes

| Atributo       | Descripción                           | Ejemplo                    |
| :------------- | :------------------------------------ | :------------------------- |
| `ports`        | Mapeo HOST:CONTENEDOR                 | `ports: \n  - "3000:3000"` |
| `expose`       | Puertos internos (sin mapear al host) | `expose: \n  - "5432"`     |
| `networks`     | Redes a las que conectarse            | `networks: \n  - mi-red`   |
| `network_mode` | Modo de red especial                  | `network_mode: host`       |

### Variables de Entorno

| Atributo      | Descripción             | Ejemplo                                 |
| :------------ | :---------------------- | :-------------------------------------- |
| `environment` | Variables clave-valor   | `environment: \n  NODE_ENV: production` |
| `env_file`    | Archivo(s) de variables | `env_file: .env`                        |

### Volúmenes

| Atributo                   | Descripción                        | Ejemplo                                                              |
| :------------------------- | :--------------------------------- | :------------------------------------------------------------------- |
| `volumes`                  | Montaje de volúmenes o bind mounts | `volumes: \n  - pgdata:/var/lib/postgresql/data`                     |
| `volumes` (sintaxis larga) | Montaje con opciones detalladas    | `volumes: \n  - type: volume\n    source: pgdata\n    target: /data` |

### Dependencias y Salud

| Atributo      | Descripción                        | Ejemplo                                                |
| :------------ | :--------------------------------- | :----------------------------------------------------- |
| `depends_on`  | Orden de arranque + condiciones    | `depends_on: \n  db: \n    condition: service_healthy` |
| `healthcheck` | Verificación de salud del servicio | Ver ejemplo abajo                                      |

### Recursos y Seguridad

| Atributo                  | Descripción          | Ejemplo                                   |
| :------------------------ | :------------------- | :---------------------------------------- |
| `deploy.resources.limits` | Límites de CPU/RAM   | `limits: \n  cpus: '0.5'\n  memory: 256M` |
| `user`                    | Usuario del proceso  | `user: "1000:1000"`                       |
| `restart`                 | Política de reinicio | `restart: unless-stopped`                 |

---

## 📄 Ejemplo Completo

```yaml
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      args:
        NODE_VERSION: "22"
    image: mi-app-backend:latest
    ports:
      - "4000:4000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://admin:secret@db:5432/miapp
    env_file:
      - .env.backend
    volumes:
      - ./backend/src:/app/src:ro
      - uploads:/app/uploads
    networks:
      - app-network
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M
    restart: unless-stopped
    user: "1000:1000"

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: miapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d miapp"]
      interval: 10s
      retries: 5

networks:
  app-network:
    driver: bridge

volumes:
  pgdata:
  uploads:
```

---

## 🔗 Notas Relacionadas

- [[01_introduccion_a_docker_compose]] — Conceptos básicos de Compose
- [[03_explicacion_y_consejos_de_volumenes]] — Volúmenes en profundidad
- [[05_vincular_backend_con_base_de_datos]] — Vinculación backend-DB con Compose
- [[MOC_Compose]] — Índice general de la categoría Compose
