"""
WHAT: Declares the SQLAlchemy declarative Base that every ORM model
(User, Analysis) inherits from.

WHY: Alembic (migrations) and SQLAlchemy both need one shared Base so
they know about every table that exists in the app.

HOW IT CONNECTS: app/models/*.py import Base from here. alembic/env.py
will import Base.metadata to autogenerate migrations.
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
