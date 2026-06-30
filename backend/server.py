from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import shutil
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

UPLOAD_DIR = ROOT_DIR / 'uploads'
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Shikha Yadav Portfolio API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProfileAssets(BaseModel):
    photo_url: Optional[str] = None
    resume_url: Optional[str] = None
    photo_filename: Optional[str] = None
    resume_filename: Optional[str] = None
    updated_at: Optional[datetime] = None


# ---------------- Helpers ----------------
PROFILE_DOC_ID = "shikha-portfolio-profile"
ALLOWED_IMAGE_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
ALLOWED_DOC_EXT = {".pdf", ".doc", ".docx"}


async def get_profile_doc():
    return await db.portfolio_profile.find_one({"_id": PROFILE_DOC_ID})


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Shikha Yadav Portfolio API"}


@api_router.get("/profile", response_model=ProfileAssets)
async def get_profile():
    doc = await get_profile_doc()
    if not doc:
        return ProfileAssets()
    return ProfileAssets(
        photo_url=doc.get("photo_url"),
        resume_url=doc.get("resume_url"),
        photo_filename=doc.get("photo_filename"),
        resume_filename=doc.get("resume_filename"),
        updated_at=doc.get("updated_at"),
    )


@api_router.post("/profile/photo", response_model=ProfileAssets)
async def upload_photo(file: UploadFile = File(...)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_IMAGE_EXT:
        raise HTTPException(status_code=400, detail=f"Invalid image type. Allowed: {sorted(ALLOWED_IMAGE_EXT)}")
    target = UPLOAD_DIR / f"profile_photo{ext}"
    # Remove any existing photo with different extension
    for old in UPLOAD_DIR.glob("profile_photo.*"):
        try:
            old.unlink()
        except Exception:
            pass
    with target.open("wb") as f:
        shutil.copyfileobj(file.file, f)
    photo_url = f"/api/profile/photo/file?ts={int(datetime.now(timezone.utc).timestamp())}"
    update = {
        "photo_url": photo_url,
        "photo_filename": target.name,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.portfolio_profile.update_one(
        {"_id": PROFILE_DOC_ID}, {"$set": update}, upsert=True
    )
    doc = await get_profile_doc()
    return ProfileAssets(**{k: doc.get(k) for k in ["photo_url", "resume_url", "photo_filename", "resume_filename", "updated_at"]})


@api_router.post("/profile/resume", response_model=ProfileAssets)
async def upload_resume(file: UploadFile = File(...)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_DOC_EXT:
        raise HTTPException(status_code=400, detail=f"Invalid resume type. Allowed: {sorted(ALLOWED_DOC_EXT)}")
    target = UPLOAD_DIR / f"resume{ext}"
    for old in UPLOAD_DIR.glob("resume.*"):
        try:
            old.unlink()
        except Exception:
            pass
    with target.open("wb") as f:
        shutil.copyfileobj(file.file, f)
    resume_url = f"/api/profile/resume/file?ts={int(datetime.now(timezone.utc).timestamp())}"
    update = {
        "resume_url": resume_url,
        "resume_filename": target.name,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.portfolio_profile.update_one(
        {"_id": PROFILE_DOC_ID}, {"$set": update}, upsert=True
    )
    doc = await get_profile_doc()
    return ProfileAssets(**{k: doc.get(k) for k in ["photo_url", "resume_url", "photo_filename", "resume_filename", "updated_at"]})


@api_router.get("/profile/photo/file")
async def serve_photo():
    doc = await get_profile_doc()
    if not doc or not doc.get("photo_filename"):
        raise HTTPException(status_code=404, detail="No profile photo uploaded")
    path = UPLOAD_DIR / doc["photo_filename"]
    if not path.exists():
        raise HTTPException(status_code=404, detail="Photo file missing")
    return FileResponse(str(path))


@api_router.get("/profile/resume/file")
async def serve_resume():
    doc = await get_profile_doc()
    if not doc or not doc.get("resume_filename"):
        raise HTTPException(status_code=404, detail="No resume uploaded")
    path = UPLOAD_DIR / doc["resume_filename"]
    if not path.exists():
        raise HTTPException(status_code=404, detail="Resume file missing")
    return FileResponse(
        str(path),
        filename=f"Shikha_Yadav_Resume{Path(doc['resume_filename']).suffix}",
        media_type="application/octet-stream",
    )


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
