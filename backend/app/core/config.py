"""
Central configuration for the app.

WHAT: Loads all environment-dependent settings (DB URL, JWT secret, CORS
origins, upload limits) from environment variables / a .env file into a
single typed object.

WHY: Nothing that changes between dev/staging/prod, and nothing secret
(passwords, keys), should ever be hardcoded in application code. This is
the single place that reads os.environ, via pydantic-settings.

HOW IT CONNECTS: Every other module that needs config (db/session.py,
core/security.py, main.py for CORS) imports `settings` from here.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # --- App ---
    APP_NAME: str = "DeepFake Forensics API"
    ENVIRONMENT: str = "development"  # development | production
    API_PREFIX: str = "/api"

    # --- Database ---
    DATABASE_URL: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/deepfake_forensics"

    # --- Auth ---
    JWT_SECRET_KEY: str = "CHANGE_ME_IN_ENV_FILE"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # --- CORS ---
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]  # Vite dev server

    # --- Uploads ---
    MAX_IMAGE_SIZE_MB: int = 10
    MAX_VIDEO_SIZE_MB: int = 100
    UPLOAD_DIR: str = "uploads"
    RESULTS_DIR: str = "results"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
