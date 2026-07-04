# GleWorks Static Deploy

Deploys the static GleWorks portfolio to a public VPS.

## Architecture

```text
internet -> Caddy (auto-TLS) -> frontend (nginx static SPA)
```

There is no backend, database, auth service, Prometheus, or Grafana in this
portfolio stack. The previous full-stack app lives in `gleworks-full`.

## Prerequisites

1. A VPS with Docker and the Docker Compose plugin.
2. A domain with a DNS A record pointing to the VPS.
3. Ports 80 and 443 open.

## Manual Deploy

```bash
git clone https://github.com/WillGle/GleWorks.git
cd GleWorks
cp deploy/.env.example deploy/.env
$EDITOR deploy/.env
docker compose -f deploy/docker-compose.yml --env-file deploy/.env up -d --build
```

Visit `https://$DOMAIN`.

## Verify

```bash
curl -fsS https://$DOMAIN/
docker compose -f deploy/docker-compose.yml --env-file deploy/.env ps
```

## Validate Config

```bash
cd deploy
make validate
docker compose -f docker-compose.yml --env-file .env config
```

## Jenkins

Configure the Jenkins pipeline script path as `deploy/Jenkinsfile`.
