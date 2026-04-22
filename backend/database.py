from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from structure import Base
import os

MYSQL_URL = os.environ.get(
    "MYSQL_URL",
    "mysql+pymysql://root:RTEdEzgasJBbNmfniMRDHhpIrWZKWQSS@shinkansen.proxy.rlwy.net:54209/railway"
)

# Replace mysql:// with mysql+pymysql://
if MYSQL_URL.startswith("mysql://"):
    MYSQL_URL = MYSQL_URL.replace("mysql://", "mysql+pymysql://", 1)

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