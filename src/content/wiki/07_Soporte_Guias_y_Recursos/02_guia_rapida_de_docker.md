---
title: "Guía Rápida de Docker: De Cero a Producción en 30 Minutos"
description: "Todo lo esencial de Docker en una guía concisa."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/guia
  - docker/rapida
  - docker/introduccion
type: guia
category: recursos
complexity: principiante
isPinned: false
growthStage: seedling
---
# ⚡ Guía Rápida de Docker: De Cero a Producción

Todo lo esencial de Docker en una guía concisa.

---

## 🎯 Los 5 Comandos que Necesitas

```bash
# 1. Ejecutar un contenedor
docker run -d -p 3000:3000 --name mi-app mi-imagen

# 2. Ver qué está corriendo
docker ps

# 3. Ver logs
docker logs -f mi-app

# 4. Detener
docker stop mi-app

# 5. Construir imagen
docker build -t mi-imagen .
```

---

## 🔗 Notas Relacionadas

- [[01_chuleta_general_de_comandos_docker]] — Chuleta completa
- [[01_conceptos_y_primeros_pasos]] — Fundamentos
- [[MOC_Docker_General]] — Índice general
