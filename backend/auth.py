from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY     = "slambook_secret_key_2025!"
ALGORITHM      = "HS256"
ADMIN_PASSWORD = "SRIT"

def verify_password(plain: str) -> bool:
    return plain == ADMIN_PASSWORD

def create_token() -> str:
    expire = datetime.utcnow() + timedelta(hours=24)
    return jwt.encode({"exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> bool:
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except JWTError:
        return False