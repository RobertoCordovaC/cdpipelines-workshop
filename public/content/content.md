class: center, middle, main-title

# CD Pipelines Workshop

By Armando & FaustoC

---

class: center, middle, subtitle-1

# Contexto

---

class: center, middle, subtitle-2

# CI/CD 

---

## CI/CD(1)

1) Descargar gocd server y gocd agent

```bash
docker pull gocd/gocd-server:v17.8.0

docker pull gocd/gocd-agent-alpine-3.5:v17.8.0 
```
<br>
2) Generar el archivo docker-compose.yml

```yaml
version: "3"
services:
  server:
    image: gocd/gocd-server:v17.8.0
  agent:
    image: gocd/gocd-agent-alpine-3.5:v17.8.0
```
<br/>
3) Levantar los servicios
```bash
docker-compose create
docker-compose up
```
---
## CI/CD(2)

1) Descargar gocd server y gocd agent

```bash
docker pull gocd/gocd-server:v17.8.0

docker pull gocd/gocd-agent-alpine-3.5:v17.8.0 
```

---

class: center, middle, subtitle-2

# Secondary heading 2

---

class: center, middle, subtitle-3

# Secondary heading 3
