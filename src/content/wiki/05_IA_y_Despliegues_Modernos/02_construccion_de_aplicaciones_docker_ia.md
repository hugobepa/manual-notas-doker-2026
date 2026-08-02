---
title: "Construcción de Aplicaciones Docker con IA: Model Runner y Ollama"
description: "Guía práctica para ejecutar modelos LLM en Docker usando Docker Model Runner y Ollama."
createdAt: 2026-08-01
updatedAt: 2026-08-01
tags:
  - docker/ia
  - docker/model-runner
  - docker/ollama
  - docker/llm
type: guia
category: ia
complexity: intermedio
isPinned: false
growthStage: budding
---
# 🏗️ Construcción de Aplicaciones Docker con IA: Model Runner y Ollama

Guía práctica para ejecutar modelos LLM en Docker usando Docker Model Runner y Ollama.

---

## 🐪 Ollama en Docker

```bash
# Ejecutar Ollama con GPU (si disponible)
docker run -d \
  --name ollama \
  -p 11434:11434 \
  --gpus all \
  -v ollama_data:/root/.ollama \
  ollama/ollama

# Descargar un modelo
docker exec ollama ollama pull llama3.2

# Probar
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "¿Qué es Docker?",
  "stream": false
}'
```

---

## 🐳 Docker Model Runner

```bash
# Inicializar
docker model init

# Descargar modelo
docker model pull ai/llama3.2

# Ejecutar
docker model run ai/llama3.2 "¿Qué es Docker?"
```

---

## 🔗 Notas Relacionadas

- [[01_introduccion_a_docker_e_inteligencia_artificial]] — Fundamentos IA + Docker
- [[03_agente_de_ia_gordon_y_mcp]] — Gordon AI y MCP
- [[MOC_IA_Despliegues]] — Índice de IA y despliegues
