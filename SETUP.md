# Milestone 1 — Setup Guide (Windows / PowerShell / VS Code)

## Goal
Get the backend running with a working `/api/health` endpoint, Postgres
running in Docker, migrations applied, and a basic React dashboard that
actually calls the backend. Everything below has been verified to run.

## What's being built
- FastAPI backend skeleton (`backend/`)
- SQLAlchemy models for `users` and `analyses` (tables, not yet used by any route)
- Alembic migrations wired up
- React + TypeScript + Tailwind frontend skeleton (`frontend/`)
- Postgres via Docker Compose

## Prerequisites
- Python 3.11+ installed, on PATH
- Node.js 20+ and npm installed
- Docker Desktop installed and running

---

## 1. Start Postgres

Open PowerShell in the project root (`deepfake-forensics/`):

```powershell
docker compose up -d
```

**Expected output:** Docker pulls `postgres:16-alpine` (first time only)
and starts a container named `deepfake_postgres`.

**Check it's running:**
```powershell
docker ps
```
You should see `deepfake_postgres` with status `Up`.

**Common error:** `error during connect... pipe/dockerDesktopLinuxEngine`
→ Docker Desktop isn't running. Start it from the Start menu and wait
for the whale icon in the system tray to stop animating, then retry.

---

## 2. Backend setup

From the project root:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

**Expected output:** venv activates (prompt shows `(venv)`), then pip
installs ~15 packages with no red error text at the end.

**Common error:** `python : The term 'python' is not recognized` →
Python isn't on PATH. Reinstall Python and check "Add python.exe to
PATH" during setup, or use `py -3.11` instead of `python`.

### Configure environment variables
```powershell
copy .env.example .env
```
Open `.env` in VS Code and replace `JWT_SECRET_KEY` with any long
random string (this isn't used until Milestone 2, but set it now).

### Apply database migrations
```powershell
alembic revision --autogenerate -m "create users and analyses tables"
alembic upgrade head
```

**Expected output:** Alembic prints `Running upgrade -> <hash>, create
users and analyses tables` with no errors.

**Common error:** `sqlalchemy.exc.OperationalError: connection refused`
→ Postgres container isn't up yet, or `DATABASE_URL` in `.env` doesn't
match the Docker Compose credentials (`postgres`/`postgres`/`deepfake_forensics`
on `localhost:5432`). Re-check step 1.

**Common error:** `column "metadata" is reserved` type errors — you
won't hit this because the column is named `analysis_metadata` in code
(SQLAlchemy reserves the attribute name `metadata` on every model), but
if you rename anything, avoid that name.

### Run the API
```powershell
uvicorn app.main:app --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

**Test it:** open http://127.0.0.1:8000/api/health in a browser, or in
a second PowerShell window:
```powershell
curl http://127.0.0.1:8000/api/health
```
Expected JSON:
```json
{"status":"ok","environment":"development","model_loaded":false,"model_note":"No trained model checkpoint yet..."}
```
`model_loaded: false` is correct and expected — there's no trained
model until Milestone 3. Also check http://127.0.0.1:8000/docs — this
is FastAPI's free auto-generated Swagger UI.

Leave this terminal running.

---

## 3. Frontend setup

Open a **new** PowerShell window, from the project root:

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

**Expected output:**
```
VITE ready in ... ms
➜  Local:   http://localhost:5173/
```

Open http://localhost:5173 — it should redirect to `/dashboard`, and
the "Backend Status" panel should show `API status: ok` and
`Model loaded: false`, pulled live from your running backend. If you
see the red "Could not reach the backend" message, check that the
uvicorn terminal from step 2 is still running.

**Common error:** blank page + CORS error in browser console → check
`CORS_ORIGINS` in `backend/.env` includes `http://localhost:5173`
(it does by default).

---

## What's next (Milestone 2)
Authentication: password hashing (`core/security.py`), JWT issuing,
`POST /api/auth/register` and `/login`, wiring the frontend Login/Signup
forms and `ProtectedRoute` to actually check session state instead of
the current placeholder.
