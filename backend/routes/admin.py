from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import get_db
from structure import Entry
from auth import verify_password, create_token, verify_token
from pydantic import BaseModel

router = APIRouter()

class LoginIn(BaseModel):
    password: str


def require_admin_token(authorization: str) -> None:
    token = authorization.replace("Bearer ", "")
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.post("/admin/login")
def login(data: LoginIn):
    if not verify_password(data.password):
        raise HTTPException(status_code=401, detail="Wrong password")
    return {"token": create_token()}

@router.get("/admin/entries")
def get_entries(
    authorization: str = Header(...),
    db: Session = Depends(get_db)
):
    require_admin_token(authorization)
    entries = db.query(Entry).order_by(Entry.created_at.desc()).all()
    return entries

@router.delete("/admin/entries/{entry_id}")
def delete_entry(
    entry_id: int,
    authorization: str = Header(...),
    db: Session = Depends(get_db)
):
    require_admin_token(authorization)

    entry = db.query(Entry).filter(Entry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")

    db.delete(entry)
    db.commit()
    return {"ok": True, "deleted_id": entry_id}
