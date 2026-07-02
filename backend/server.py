from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import shutil
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

# ---------------- Setup ----------------
ROOT_DIR = Path(__file__).parent
#load_dotenv(ROOT_DIR / ".env")
load_dotenv()
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

mongo_url = os.getenv("MONGO_URL")
db_name = os.getenv("DB_NAME", "portfolio")

if not mongo_url:
    raise Exception("MONGO_URL missing in .env file")

#client = AsyncIOMotorClient(mongo_url)
client = AsyncIOMotorClient(mongo_url, tlsAllowInvalidCertificates=True)
db = client[db_name]

app = FastAPI(title="Portfolio API")
api = APIRouter(prefix="/api")

# ---------------- Models ----------------
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Profile(BaseModel):
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None

PROFILE_ID = "profile"

ALLOWED_IMG = {".png", ".jpg", ".jpeg", ".webp"}
ALLOWED_DOC = {".pdf"}

# ---------------- Helpers ----------------
#async def get_profile():
    #return await db.profile.find_one({"_id": PROFILE_ID})
async def get_profile():
    try:
        return await db.profile.find_one({"_id": PROFILE_ID})
    except Exception as e:
        print("MongoDB error:", e)
        return None

# ---------------- Routes ----------------
@api.get("/")
async def root():
    return {"message": "API running"}

# -------- PROFILE GET --------
@api.get("/profile", response_model=Profile)
async def profile():
    try:
        doc = await get_profile()
        if not doc:
            return Profile()

        return Profile(
            photo_url=doc.get("photo_url"),
            resume_url=doc.get("resume_url"),
        )
    except Exception as e:
        print("Profile API error:", e)
        return Profile()

# -------- UPLOAD PHOTO --------
@api.post("/profile/photo")
async def upload_photo(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_IMG:
        raise HTTPException(status_code=400, detail="Invalid image type")

    path = UPLOAD_DIR / f"photo{ext}"

    for f in UPLOAD_DIR.glob("photo.*"):
        f.unlink()

    with path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    url = "/api/profile/photo/file"

    await db.profile.update_one(
        {"_id": PROFILE_ID},
        {"$set": {"photo_url": url}},
        upsert=True
    )

    return {"message": "Photo uploaded"}

# -------- UPLOAD RESUME --------
@api.post("/profile/resume")
async def upload_resume(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_DOC:
        raise HTTPException(status_code=400, detail="Only PDF allowed")

    path = UPLOAD_DIR / "resume.pdf"

    with path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    url = "/api/profile/resume/file"

    await db.profile.update_one(
        {"_id": PROFILE_ID},
        {"$set": {"resume_url": url}},
        upsert=True
    )

    return {"message": "Resume uploaded"}

# -------- SERVE FILES --------
@api.get("/profile/photo/file")
async def get_photo():
    for f in UPLOAD_DIR.glob("photo.*"):
        return FileResponse(str(f))
    raise HTTPException(404, "No photo found")


@api.get("/profile/resume/file")
async def get_resume():
    path = UPLOAD_DIR / "resume.pdf"
    if not path.exists():
        raise HTTPException(404, "No resume found")
    return FileResponse(str(path))

# -------- CONTACT --------
@api.post("/contact", response_model=Contact)
async def contact(data: ContactCreate):
    msg = Contact(**data.dict())
    await db.contact.insert_one(msg.dict())
    return msg


@api.get("/contact", response_model=List[Contact])
async def get_contacts():
    items = await db.contact.find({}, {"_id": 0}).to_list(100)
    return items


# ---------------- App ----------------
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Shutdown ----------------
@app.on_event("shutdown")
async def shutdown():
    client.close()
