"""
WHAT: The FastAPI application entrypoint. Creates the app, wires up CORS,
and includes route modules.

WHY: Kept intentionally thin - per the project's code-quality rules, no
business logic lives directly in main.py. It only assembles pieces
defined elsewhere.

HOW IT CONNECTS: Run with `uvicorn app.main:app --reload` from backend/.
Auth/analysis/history routers get added here in later milestones as they
are built (api/routes/auth.py in Milestone 2, etc).
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health
from app.core.config import settings

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix=settings.API_PREFIX)
