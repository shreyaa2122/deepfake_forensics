"""
WHAT: Creates the SQLAlchemy engine + session factory, and a `get_db`
FastAPI dependency that route handlers use to talk to Postgres.

WHY: We open one DB session per request and always close it, even if the
request raises an exception - this dependency pattern guarantees that.

HOW IT CONNECTS: api/routes/*.py will do
    def some_route(db: Session = Depends(get_db)): ...
to get a working, auto-closed database session.
"""

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
