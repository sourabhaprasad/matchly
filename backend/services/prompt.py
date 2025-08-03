import os
from langchain_ollama import OllamaLLM
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from services.utils import sanitize_prompt_input


template = """
{greeting}

Based on the job description and resume below, write a personalized cover letter for the position of {job_title} at {company}.
The letter should be tailored, formal, and under 300 words.

Job Description:
{jd}

Resume:
{resume}

Cover Letter:
"""

prompt = PromptTemplate.from_template(template)

base_url = os.getenv("OLLAMA_API_URL", "http://localhost:11434")  # default to local for non-Docker
llm = OllamaLLM(model="mistral", base_url=base_url)

def generate_cover_letter(
    jd: str,
    resume: str,
    company: str,
    job_title: str,
    hiring_manager: str = None
) -> str:
    # Sanitize all inputs
    jd = jd.strip()
    resume = resume.strip()
    company = sanitize_prompt_input(company)
    job_title = sanitize_prompt_input(job_title)
    greeting = f"Dear {sanitize_prompt_input(hiring_manager)}," if hiring_manager else "Dear Hiring Manager,"

    chain = LLMChain(prompt=prompt, llm=llm)
    return chain.run({
        "jd": jd,
        "resume": resume,
        "company": company,
        "job_title": job_title,
        "greeting": greeting
    })
