# Lahari Chowdary Talasila — Portfolio

Personal portfolio (frontend + backend) showcasing skills, projects, experience, education, achievements, and an AI chat assistant.

## Structure

- **`frontend/`** — Next.js (React, Tailwind, Framer Motion). All UI; no server-side secrets. **Fetches portfolio data from the backend** on load (GET /api/profile, /api/projects, etc.). Chat widget sends only `messages` to `POST /api/chat`; the system prompt is built on the backend. API client in `lib/api.ts`.
- **`backend/`** — Express (Node). **Single source of truth for data:** portfolio JSON in `data/`, loaded at startup. Serves GET /api/profile, /api/projects, /api/experience, /api/education, /api/achievements, /api/certifications, /api/skills and POST /api/chat, GET /health. The chatbot system prompt is built server-side from this data (no context from frontend). Entry point `server.js`, routes in `routes.js`, chat logic in `services/chat.js`. Environment variables loaded via `dotenv` (local runs).

## Run locally

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env: set OPENROUTER_API_KEY (get one at https://openrouter.ai) and optionally FRONTEND_URL=http://localhost:3000
npm start
```

- The server calls `require('dotenv').config()` on startup, so variables from `.env` are loaded. **Never commit `.env`** (it is gitignored).
- Runs at **http://localhost:4000**.
- Endpoints: `GET /api/profile`, `/api/projects`, `/api/experience`, `/api/education`, `/api/achievements`, `/api/certifications`, `/api/skills`, `POST /api/chat` (body: `{ messages }`), `GET /health`.

### Frontend

```bash
cd frontend
# Optional: .env.local with NEXT_PUBLIC_API_URL=http://localhost:4000 (defaults to this if unset)
npm run dev
```

Open **http://localhost:3000**. The page fetches portfolio data from the backend; **start the backend first** or you’ll see “Failed to load”. The chat widget sends only messages; if the backend is down, it shows “Chat is unavailable.”

## Docker (Run Both Services Together)

Docker is a good choice if you want reproducible setup and simpler deployment to VM/container platforms. If you deploy to Vercel (frontend) + Render (backend), Docker is optional.

From the repository root:

```bash
docker compose up --build
```

This starts:
- Frontend at **http://localhost:3000**
- Backend at **http://localhost:4000**

Stop containers:

```bash
docker compose down
```

If you want chat to work in Docker, provide your API key when starting:

```bash
OPENROUTER_API_KEY=your_key_here docker compose up --build
```

Notes:
- Frontend image is built with `NEXT_PUBLIC_API_URL=http://localhost:4000`.
- Backend CORS in Docker is set with `FRONTEND_URL=http://localhost:3000`.

## Deploy

### Backend (Heroku, Railway, Render, etc.)

1. **Start command**: `npm start` (runs `node server.js`). No need to run `dotenv` manually—platforms inject env vars; we still call `dotenv.config()` so a `.env` file works locally.
2. **Required env vars** (set in the platform’s Config vars / Environment):
   - `OPENROUTER_API_KEY` — from [OpenRouter](https://openrouter.ai). Required for chat; other routes work without it.
   - `FRONTEND_URL` — exact frontend origin, e.g. `https://your-portfolio.vercel.app`. No trailing slash. Used for CORS and OpenRouter referrer.
   - `PORT` — usually set by the platform; default 4000 if unset.
3. **CORS**: Backend allows `http://localhost:3000`, `http://127.0.0.1:3000`, and `process.env.FRONTEND_URL`. Set `FRONTEND_URL` in production so the deployed frontend can call the API.
4. **Health check**: Use `GET /health` for liveness/readiness if the platform supports it.

### Frontend (Vercel, Netlify)

1. **Build**: `npm run build` (output: `.next`).
2. **Env**: Set **at build time** (e.g. in Vercel/Netlify dashboard):
   - `NEXT_PUBLIC_API_URL` — production backend URL, e.g. `https://your-api.herokuapp.com`.
   - Next.js inlines `NEXT_PUBLIC_*` at build; if you don’t set this in production, the client will keep using the default `http://localhost:4000` and chat will fail.
3. Optional: `NEXT_PUBLIC_BASE_URL` for canonical URL (e.g. `https://your-portfolio.vercel.app`).

### Summary

| Where    | Variable                 | Purpose |
|----------|--------------------------|---------|
| Backend  | `OPENROUTER_API_KEY`     | Chat (OpenRouter) |
| Backend  | `FRONTEND_URL`           | CORS + referrer |
| Frontend | `NEXT_PUBLIC_API_URL`    | Backend base URL (must be set for production build) |

## Data

- **Single source of truth:** All portfolio content lives in **`backend/data/`** (profile.json, projects.json, experience.json, education.json, achievements.json, certifications.json, skills.json). Edit only there.
- **Page content:** The frontend fetches this data from the backend API on load (GET /api/profile, etc.). Start the backend before opening the frontend.
- **Chatbot:** The backend builds the chatbot system prompt from `backend/data/` in `services/chat.js` (buildSystemPrompt). The frontend sends only `messages`; the prompt is never sent from the client (better practice: no tampering, smaller payloads).
- Blog: add Markdown under `frontend/content/blog/` and a list/detail route when you’re ready.
