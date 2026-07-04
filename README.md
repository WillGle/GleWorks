# GleWorks (Lite)

Static React + TypeScript portfolio for GleWorks.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Vitest and Testing Library
- ESLint
- Nginx for the production image

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Run checks:

```bash
npm run lint
npm run type-check
npm run test:run
npm run build
```

## Project Structure

- `src/components/Landing`
  Home page.
- `src/components/Archive`
  Static gallery of past GleWorks work.
- `src/components/Policies`
  Public policy pages kept from the previous site.
- `src/components/ServicePaused.tsx`
  Static commission pause page.
- `src/assets`
  Image assets used by the public site.

## Deploy

The deploy stack is static-only:

```text
internet -> Caddy -> frontend nginx container
```

All Docker, Compose, Jenkins, and Ansible files live under [`deploy/`](deploy/README.md).
Run everything from the repo root, e.g.:

```bash
docker compose -f deploy/docker-compose.yml --env-file deploy/.env up -d --build
```

See `deploy/README.md` for the full setup and verification steps.
