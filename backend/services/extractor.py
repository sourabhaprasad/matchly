import fitz 
from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate
import json
from fastapi import UploadFile
import os

def extract_text_from_pdf(file_path: str) -> str:
    doc = fitz.open(file_path)
    return " ".join(page.get_text() for page in doc)

def get_text_or_file(file: UploadFile = None, text: str = "") -> str:
    """Handle either uploaded PDF or plain text."""
    if file:
        os.makedirs("temp", exist_ok=True)  
        path = f"temp/{file.filename}"
        with open(path, "wb") as f:
            f.write(file.file.read())
        return extract_text_from_pdf(path)
    return text.strip()

def extract_skills_from_jd(jd_text: str) -> list[str]:
    prompt = PromptTemplate.from_template("""
You are a helpful assistant that extracts relevant skills from job descriptions.

Job Description:
\"\"\"{jd}\"\"\"

List only the skills (technical and soft skills) mentioned in the job description.
Return the output as a JSON array of strings with no extra text.
""")
    base_url = os.getenv("OLLAMA_API_URL", "http://localhost:11434")  # fallback for local testing

    model = ChatOllama(model="mistral", base_url=base_url)
    chain = prompt | model
    response = chain.invoke({"jd": jd_text})

    try:
        return json.loads(response.content.strip())
    except json.JSONDecodeError:
        print("[WARN] Could not parse skills:", response.content)
        return []
