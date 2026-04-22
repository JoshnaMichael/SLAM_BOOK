from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from structure import Base
import os

MYSQL_URL = os.getenv("MYSQL_URL", "mysql+pymysql://root:RTEdEzgasJBbNmfniMRDHhpIrWZKWQSS@shinkansen.proxy.rlwy.net:54209/railway")

engine = create_engine(MYSQL_URL)
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)