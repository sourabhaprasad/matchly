from fastapi import APIRouter, UploadFile, Form, File
from typing import Optional
from services.extractor import get_text_or_file, extract_skills_from_jd
from services.embedder import embed_text
from utils.score import get_skill_match
from services.prompt import generate_cover_letter

router = APIRouter()

@router.post("/process")
async def process_resume(
    resume_file: Optional[UploadFile] = File(None),
    resume_text: str = Form(""),
    jd_file: Optional[UploadFile] = File(None),
    jd_text: str = Form(""),
    company: str = Form(""),
    job_title: str = Form(""),
    hiring_manager: Optional[str] = Form(None),
):
    jd = get_text_or_file(jd_file, jd_text)
    resume = get_text_or_file(resume_file, resume_text)

    embed_text(resume, "resume")
    embed_text(jd, "jd")

    skill_list = extract_skills_from_jd(jd)
    skill_result = get_skill_match(jd, resume, skill_list)

    cover_letter = generate_cover_letter(
        jd=jd,
        resume=resume,
        company=company,
        job_title=job_title,
        hiring_manager=hiring_manager
    )

    return {
        "score": skill_result["score"],
        "matched": skill_result["matched"],
        "missing": skill_result["missing"],
        "suggested": skill_result.get("suggested", []),
        "skills_extracted": skill_list,
        "cover_letter": cover_letter
    }
