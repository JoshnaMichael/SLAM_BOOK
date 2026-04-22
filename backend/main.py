from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes import entries, admin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://joshnamichael.github.io",
        "http://localhost:5173",
        "*"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(entries.router)
app.include_router(admin.router)