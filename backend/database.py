from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker
from structure import Base

MYSQL_URL = "mysql+pymysql://root:Nous%4012345@localhost:3306/slambook"

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
    inspector = inspect(engine)
    if "entries" in inspector.get_table_names():
        entry_columns = {col["name"] for col in inspector.get_columns("entries")}
        if "call_me" not in entry_columns:
            with engine.begin() as conn:
                conn.execute(text("ALTER TABLE entries ADD COLUMN call_me VARCHAR(100)"))
