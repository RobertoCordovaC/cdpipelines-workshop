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

docker pull gocd/gocd-agent-ubuntu-16.04:v17.8.0 
```
<br>
2) Generar el archivo docker-compose.yml

```yaml
version: "3"
services:
  server:
    image: gocd/gocd-server:v17.8.0
  agent:
    depends_on:
      - server
    build:
      context: .
      dockerfile: Dockerfile.agent
    environment:
      - GO_SERVER_URL=https://server:8154/go
```

---
## Dockerfile

3) Create Dockerfile.agent
```Dockerfile
FROM gocd/gocd-agent-ubuntu-16.04:v17.8.0

RUN apt-get update && \
    apt-get -y install openjdk-8-jdk
```
4) Levantar los servicios
```bash
docker-compose create
docker-compose up
```
---
## CI/CD(2)

5) Descargar YAML Configuration Plugin en este enlace:
```bash
cd ~/Downloads
wget https://github.com/tomzo/gocd-yaml-config-plugin/releases/download/0.4.0/yaml-config-plugin-0.4.0.jar
```
<br/>
6) Agregar volumen /godata
```yaml
version: "3"
services:
  server:
    image: gocd/gocd-server:v17.8.0
    ports:
      - "8153:8153"
    volumes:
      - ./godata:/godata
  agent:
    depends_on:
      - server
    build:
      context: .
      dockerfile: Dockerfile.agent
    environment:
      - GO_SERVER_URL=https://server:8154/go
```
---
## CI/CD(3)
7) Copiar el jar a la carpeta de plugins externos del server de GoCD
```bash
cp ~/Downloads/yaml-config-plugin-0.4.0.jar [location-of-your-project]/godata/plugins/external
```
<br/>

8) Recrear los servicios
```bash
docker-compose down
docker-compose up
```

---

## CI/CD(4)
8) Configuración del pipeline
```xml
<cruise>
  ...
  <config-repos>
    <config-repo plugin="yaml.config.plugin" id="workshop">
      <git url="https://github.com/exarcol/pipeline-pipeline-workshop.git" />
    </config-repo>
  </config-repos>
  <pipelines group="workshops" />
  ...
</cruise>
```
---

## CI/CD(5)
9) Construir el Pipeline (Tests)
```yaml
pipelines:
  workshop-pipeline:
    group: workshops
    materials:
      repo:
        git: https://github.com/exarcol/springboot-workshop-i.git
        branch: master
    stages:
      - Tests:
          jobs:
            unit_tests:
              tasks:
                - exec:
                    command: sh
                    arguments:
                      - -c
                      - ./gradlew clean test
            integration_tests:
              tasks:
                - exec:
                    command: sh
                    arguments:
                      - -c
                      - ./gradlew clean integrationTest
```
 ---
## CI/CD(6)

10) Construir el Pipeline (Build)

```yaml
pipelines:
  workshop-pipeline:
    group: workshops
    materials:
      repo:
        git: https://github.com/exarcol/springboot-workshop-i.git
        branch: master
    stages:
      ...
      - Build:
          jobs: 
            build_fatjar:
              tasks:
                - exec:
                    command: sh
                    arguments:
                      - -c
                      - ./gradlew jar
```

---

## CI/CD(7)
11) Escalamiento de agentes

```bash
docker-compose down
docker-compose create
docker-compose up --scale agent=2
```
