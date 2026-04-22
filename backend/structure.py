from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Entry(Base):
    __tablename__ = "entries"

    id                 = Column(Integer, primary_key=True, index=True)
    name               = Column(String(100))
    call_me            = Column(String(100))
    first_impression   = Column(Text)
    current_impression = Column(Text)
    memory             = Column(Text)
    unsaid             = Column(Text)
    thoughts           = Column(Text)
    created_at         = Column(DateTime, default=datetime.utcnow)