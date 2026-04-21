from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from structure import Base

MYSQL_URL = "mysql+pymysql://root:DPLeSUhAqohZgeieJfNhMpufgyxDfqSB@roundhouse.proxy.rlwy.net:44411/railway"

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