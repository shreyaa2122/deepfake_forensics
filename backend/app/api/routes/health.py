"""
WHAT: A simple liveness endpoint, GET /api/health.

WHY: Standard practice for any deployed API - load balancers, uptime
monitors, and your own frontend can check this without authentication.
It also reports whether the ML model file exists yet, which is directly
useful right now since the model hasn't been trained (Milestone 3) -
this endpoint will honestly say `"model_loaded": false` until then,
instead of silently pretending everything works.

HOW IT CONNECTS: Included in main.py. The frontend dashboard can poll
this to show a "model not ready" banner if needed.
"""

import os

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(tags=["health"])

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", "models", "deepfake_model.keras")


@router.get("/health")
def health_check() -> dict:
    model_loaded = os.path.exists(MODEL_PATH)
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
        "model_loaded": model_loaded,
        "model_note": (
            "Model file present." if model_loaded
            else "No trained model checkpoint yet - inference endpoints will "
                 "report unavailable until Milestone 3 (training) is complete."
        ),
    }
