def get_skill_match(jd_text: str, resume_text: str, skills: list[str]) -> dict:
    matched = [skill for skill in skills if skill.lower() in resume_text.lower()]
    unmatched = list(set(skills) - set(matched))
    score = round(len(matched) / len(skills) * 100, 2) if skills else 0
    return {
        "score": score,
        "matched": matched,
        "missing": unmatched
    }
