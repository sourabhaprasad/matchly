import re
from fuzzywuzzy import fuzz
from sentence_transformers import SentenceTransformer, util
import spacy

nlp = spacy.load("en_core_web_sm")

model = SentenceTransformer("all-mpnet-base-v2")

# Synonym dictionary
SYNONYM_MAP = {
    "front-end": "frontend",
    "front end": "frontend",
    "back-end": "backend",
    "back end": "backend",
    "full stack": "fullstack",
    "full-stack": "fullstack",
    "js": "javascript",
    "ts": "typescript",
    "node": "nodejs",
    "node.js": "nodejs",
    "py": "python",
    "ml": "machine learning",
    "ai": "artificial intelligence",
    "cv": "computer vision",
    "nlp": "natural language processing",
    "ux": "user experience",
    "ui": "user interface",
    "ui/ux": "user interface",
    "reactjs": "react",
    "nextjs": "next.js",
    "vuejs": "vue",
    "html5": "html",
    "css3": "css",
    "mongo": "mongodb",
    "postgres": "postgresql",
    "dockerized": "docker",
    "api": "rest api",
    "apis": "rest api",
    "debugging": "bug fixing",
    "problem solving": "problem-solving",
    "attention-to-detail": "attention to detail",
    "git": "version control",
    "github": "version control",
    "unit testing": "testing",
    "integration testing": "testing",
    "jest": "testing",
    "pytest": "testing",
    "oop": "object-oriented programming",
    "agile methodology": "agile",
    "scrum methodology": "scrum"
}

def normalize_text(text: str) -> str:
    text = text.lower()
    for key, val in SYNONYM_MAP.items():
        text = re.sub(rf"\b{re.escape(key)}\b", val, text)
    return text

def keyword_overlap_match(resume_text: str, jd_skill: str, threshold: int = 70) -> bool:
    resume_tokens = resume_text.lower().split()
    jd_tokens = jd_skill.lower().split()
    score = fuzz.token_set_ratio(" ".join(resume_tokens), " ".join(jd_tokens))
    return score >= threshold

def semantic_similarity_match(resume_text: str, jd_skill: str, threshold: float = 0.7) -> bool:
    embeddings = model.encode([resume_text, jd_skill], convert_to_tensor=True)
    sim = util.pytorch_cos_sim(embeddings[0], embeddings[1]).item()
    return sim >= threshold

def extract_skill_phrases(text: str) -> list[str]:
    doc = nlp(text.lower())
    phrases = []

    for chunk in doc.noun_chunks:
        phrases.append(chunk.text.strip())
    for token in doc:
        if token.pos_ in {"NOUN", "PROPN", "ADJ"} and not token.is_stop:
            phrases.append(token.text.strip())
    
    return list(set(phrases))

def get_skill_match(jd: str, resume: str, jd_skills: list[str]) -> dict:
    matched = []
    missing = []

    normalized_resume = normalize_text(resume)
    resume_keywords = extract_skill_phrases(normalized_resume)
    resume_context = " ".join(resume_keywords)

    for skill in jd_skills:
        normalized_skill = normalize_text(skill)

        keyword_match = keyword_overlap_match(resume_context, normalized_skill)
        semantic_match = semantic_similarity_match(resume_context, normalized_skill)

        if keyword_match or semantic_match:
            matched.append(skill)
        else:
            missing.append(skill)

    score = round(len(matched) / len(jd_skills), 2) if jd_skills else 0.0
    return {
        "score": score,
        "matched": matched,
        "missing": missing,
        "potential": matched + missing
    }
