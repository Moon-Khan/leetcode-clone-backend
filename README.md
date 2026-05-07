# LeetCode Clone (Backend) — In Development

This repository is a work-in-progress **LeetCode clone** project. The main focus right now is the **backend API** (Node.js + TypeScript + Express) that will power features like authentication, problems, submissions, and judging.

## Status

🚧 **Development Phase:** This project is actively being built and is not production-ready yet. APIs, database schema, and project structure may change frequently.

## Tech Stack (Backend)

- Node.js + TypeScript
- Express
- Prisma (ORM)
- dotenv (environment variables)
- CORS

## Project Structure

- `Backend/` — Backend API (TypeScript + Express)
- `Frontend/` — Frontend (planned/under development)

## Getting Started (Backend)

From the repo root:

```bash
cd Backend
npm install
npm run dev
```

The server defaults to port `5000` (or uses `PORT` from `.env`).

## Available Scripts (Backend)

Run inside `Backend/`:

- `npm run dev` — start dev server (nodemon + ts-node)
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled server from `dist/`

## API

Current endpoints:

- `GET /health` — health check

## Notes

- Environment variables are loaded from `Backend/.env`.
- Prisma is included as a dependency; database setup/migrations will be added as the backend grows.

