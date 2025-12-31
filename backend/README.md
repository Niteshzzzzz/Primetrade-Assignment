# Backend Service

Simple Express + MongoDB backend scaffold for user authentication and task management.

## Prerequisites

- Node.js (16+ recommended)
- MongoDB running or a MongoDB connection URI

## Setup

1. Copy or rename `.env.example` (if you create one) and set environment variables, or set them in your shell.
2. Install dependencies:

```bash
cd backend
npm install
```

## Environment variables

- `PORT` — server port (default: `5000`)
- `MONGO_URI` — MongoDB connection string (default: `mongodb://localhost:27017/myapp`)
- `JWT_SECRET` — secret for signing JWTs

You can export them in PowerShell for development:

```powershell
$env:PORT=5000
$env:MONGO_URI="mongodb://localhost:27017/myapp"
$env:JWT_SECRET="your_jwt_secret"
npm run dev
```

## Available scripts

- `npm start` — start production server
- `npm run dev` — start dev server (uses `nodemon`)

## Start server

```bash
cd backend
npm run dev
```

## API Endpoints (summary)

- POST /api/auth/register — register a new user. Body: `{ name, email, password }`
- POST /api/auth/login — login. Body: `{ email, password }` — returns JWT token
- GET /api/users/profile — get current user profile (requires `Authorization: Bearer <token>`)

- GET /api/tasks — list user's tasks (auth required)
- POST /api/tasks — create a task (auth required)
- GET /api/tasks/:id — get a task (auth required)
- PUT /api/tasks/:id — update a task (auth required)
- DELETE /api/tasks/:id — delete a task (auth required)

## Files of interest

- [backend/src/app.js](src/app.js#L1) — Express app wiring
- [backend/server.js](server.js#L1) — server entry
- [backend/src/config/env.js](src/config/env.js#L1) — environment configuration
- [backend/src/config/db.js](src/config/db.js#L1) — MongoDB connection

## Notes

- The project uses ES modules (`type: "module"` in `package.json`). All imports include the `.js` extension.
- Ensure `MONGO_URI` is reachable before starting the server.
