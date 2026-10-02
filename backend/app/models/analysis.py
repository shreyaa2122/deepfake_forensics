"""
WHAT: The `analyses` table - one row per image/video a user has analyzed.
`frame_results` is null for images and holds a JSON array of
{frame_idx, timestamp, probability} for videos (built in Milestone 7).

WHY: Needed now so both tables exist in the same initial migration.
Actually populated starting in Milestone 4 (image inference API).
"""

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.db.base import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    filename: Mapped[str] = mapped_column(String, nullable=False)
    media_type: Mapped[str] = mapped_column(String, nullable=False)  # 'image' | 'video'
    prediction: Mapped[str] = mapped_column(String, nullable=False)  # 'REAL' | 'FAKE'
    confidence: Mapped[float] = mapped_column(Float, nullable=False)
    model_version: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    processing_time_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    result_path: Mapped[str | None] = mapped_column(String, nullable=True)
    analysis_metadata: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    frame_results: Mapped[list | None] = mapped_column(JSONB, nullable=True)
