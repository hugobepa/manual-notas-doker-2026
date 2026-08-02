---
title: "Alias Docker a Podman: Comandos Copy-Paste"
description: "Archivo de copia y pega para crear el alias `docker` → `podman` en tu shell. Elige tu sistema y pega los comandos directamente."
createdAt: 2026-08-02
updatedAt: 2026-08-02
tags:
  - podman/alias
  - podman/comandos
  - docker/comandos
type: chuleta
category: podman
complexity: principiante
isPinned: false
growthStage: seedling
---
# 🔗 Alias Docker a Podman: Comandos Copy-Paste

Archivo de **copia y pega** para crear el alias `docker` → `podman` en tu shell. Elige tu sistema y pega los comandos directamente.

---

## 🐚 Bash (Linux, macOS, WSL, Git Bash)

### Opción 1: Alias simple (interactivo)

```bash
# Añadir a ~/.bashrc, ~/.zshrc o ~/.bash_profile
alias docker=podman

# Recargar la configuración
source ~/.bashrc
```

### Opción 2: Función (funciona en scripts)

```bash
# Añadir a ~/.bashrc o ~/.zshrc
docker() {
  podman "$@"
}

# Recargar
source ~/.bashrc
```

### Opción 3: Symlink (la más potente)

```bash
# Crear directorio para binarios locales
mkdir -p ~/.local/bin

# Crear symlink docker -> podman
ln -s "$(command -v podman)" ~/.local/bin/docker

# Añadir ~/.local/bin al PATH (si no está)
export PATH="$HOME/.local/bin:$PATH"
```

---

## 🪟 PowerShell (Windows)

### Opción 1: Alias simple

```powershell
# Añadir al perfil de PowerShell
Set-Alias -Name docker -Value podman

# Aplicar en la sesión actual
. $PROFILE
```

### Opción 2: Función (admite argumentos)

```powershell
# Añadir al perfil de PowerShell
function docker {
    podman @args
}

# Aplicar en la sesión actual
. $PROFILE
```

### Crear el perfil si no existe

```powershell
# Crear el perfil si no existe
if (!(Test-Path $PROFILE)) { New-Item -Path $PROFILE -Type File -Force }

# Abrir el perfil en el editor
notepad $PROFILE
```

---

## ✅ Verificación del alias

```bash
# Debe mostrar la versión de Podman
docker --version

# Debe listar los contenedores de Podman
docker ps

# Comprobar que el alias está activo (Bash)
type docker
# → docker is aliased to podman

# Comprobar que el alias está activo (PowerShell)
Get-Alias docker
```

---

## 📁 Archivos de configuración por shell

| Shell          | Archivo de configuración                                                    | Comando para recargar |
| :------------- | :-------------------------------------------------------------------------- | :-------------------- |
| **Bash**       | `~/.bashrc` o `~/.bash_profile`                                             | `source ~/.bashrc`    |
| **Zsh**        | `~/.zshrc`                                                                  | `source ~/.zshrc`     |
| **PowerShell** | `$PROFILE` (p. ej. `Documents\PowerShell\Microsoft.PowerShell_profile.ps1`) | `. $PROFILE`          |

---

## 🔗 Notas Relacionadas

- [[01_instalacion_de_podman_y_docker_en_windows_11]] — Instalación completa
- [[02_diferencia_entre_podman_y_docker_en]] — Diferencias técnicas y recursos
- [[04_chuleta_de_comandos_basicos_podman]] — Equivalencias de comandos
- [[MOC_Podman]] — Índice de Podman
