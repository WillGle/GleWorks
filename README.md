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

## Docker

Build and run the static site:

```bash
docker build -t glework-frontend:latest .
docker run -p 8080:80 glework-frontend:latest
```

Or with Compose:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:8080
```

## Deploy

The deploy stack is static-only:

```text
internet -> Caddy -> frontend nginx container
```

Use the files under `deploy/` for VPS deployment with automatic HTTPS.
