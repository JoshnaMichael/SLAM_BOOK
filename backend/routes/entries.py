from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from structure import Entry
from pydantic import BaseModel

router = APIRouter()

class EntryIn(BaseModel):
    name:               str
    call_me:            str
    first_impression:   str
    current_impression: str
    memory:             str
    unsaid:             str
    thoughts:           str

@router.options("/entries")
def options_entries():
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )

@router.post("/entries")
def submit_entry(data: EntryIn, db: Session = Depends(get_db)):
    entry = Entry(**data.dict())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return JSONResponse(
        content={"message": "Entry saved successfully"},
        headers={"Access-Control-Allow-Origin": "*"}
    )