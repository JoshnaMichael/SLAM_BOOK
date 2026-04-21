from fastapi import APIRouter, Depends
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
    roast:              str = ""
    memory:             str
    unsaid:             str
    thoughts:           str

@router.post("/entries")
def submit_entry(data: EntryIn, db: Session = Depends(get_db)):
    entry = Entry(**data.dict())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return {"message": "Entry saved successfully"}
