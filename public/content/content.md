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

4) Descargar YAML Configuration Plugin en este enlace:
```bash
cd ~/Downloads
wget https://github.com/tomzo/gocd-yaml-config-plugin/releases/download/0.4.0/yaml-config-plugin-0.4.0.jar
```
<br/>
5) Agregar volumen /godata
```yaml
version: "3"
services:
  server:
    image: gocd/gocd-server:v17.8.0
    ports:
      - "8153:8153"
      - "8154:8154"
    volumes:
      - ./godata:/godata
  agent:
    depends_on:
      - server
    image: gocd/gocd-agent-alpine-3.5:v17.8.0
    environment:
      - GO_SERVER_URL=https://server:8154/go
```
---
## CI/CD(3)
6) Copiar el jar a la carpeta de plugins externos del server de GoCD
```bash
cp ~/Downloads/yaml-config-plugin-0.4.0.jar [location-of-your-project]/godata/plugins/external
```
<br/>

7) Recrear los servicios
```bash
docker-compose down
docker-compose up
```

---

class: center, middle, subtitle-2

# Secondary heading 2

---

class: center, middle, subtitle-3

# Secondary heading 3
