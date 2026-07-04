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
cd GleWorks/deploy
cp .env.example .env
$EDITOR .env
docker compose -f docker-compose.fallback.yml --env-file .env up -d --build
```

Visit `https://$DOMAIN`.

## Verify

```bash
curl -fsS https://$DOMAIN/
docker compose -f docker-compose.fallback.yml --env-file .env ps
```

## Validate Config

```bash
cd deploy
make validate
docker compose -f docker-compose.fallback.yml --env-file .env config
```
