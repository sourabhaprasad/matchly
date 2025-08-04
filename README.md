# Matchly – Smart Resume Matching

**Matchly** is a full-stack AI-powered resume intelligence platform that analyzes resumes and job descriptions, generates tailored cover letters, and provides insightful feedback. Built with **Next.js**, **FastAPI**, and containerized microservices.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
- **Vector Database**: [ChromaDB](https://www.trychroma.com/)
- **Containerization**: Docker & Docker Compose
- **Styling**: Tailwind CSS, Google Fonts (Geist)
- **PDF Parsing**: PyMuPDF (via `fitz`)
- **LangChain**: Prompt templating & chaining
- **Ollama (Mistral)**: Local LLM backend

---

## Project Structure

```
TailorMyResume/
├── frontend/           # Next.js frontend app
│   ├── app/            # App router and layout logic
│   ├── components/     # UI components (ResumeUploader, JDInput, etc.)
│   ├── lib/
│   │   └── api.ts      # Frontend API interaction with FastAPI
│   └── ui/             # shadcn/ui components
│
├── backend/            # FastAPI backend
│   ├── main.py         # Application entrypoint
│   ├── resume_utils/   # Resume parsing, embedding, matching logic
│   │   ├── parser.py   # PyMuPDF-based PDF text extraction
│   │   ├── embedder.py # Text embedding for vector comparison
│   │   └── matcher.py  # Matching algorithm between resume and JD
│   └── api/            # FastAPI route handlers
│       └── process.py  # /api/process endpoint
│
├── docker-compose.yml  # Orchestrates containers
└── README.md            # Project documentation
```

---

## Features Implemented

### Frontend

- File upload interface for resumes and job descriptions
- Input fields for job title and hiring manager name
- Editable text area for the generated cover letter
- Copy to clipboard and download as PDF functionality for the cover letter
- Handles FormData submission to FastAPI backend
- Responsive UI built with Tailwind CSS and shadcn/ui components

### Backend

- Resume and JD parsing with PyMuPDF (`fitz`)
- Embedding logic for semantic similarity scoring
- Matching algorithm compares vector similarity between files
- Cover letter generation (currently mocked, LLM integration pending)
- REST API exposed at `/api/process` with CORS enabled
- Tone customization support for cover letter generation (formal, professional, friendly, confident, enthusiastic)
- Prompt templating and chaining using LangChain
- Ollama-powered local inference (Mistral model) for fast and private cover letter generation

### DevOps / Infrastructure

- Dockerized setup for frontend, backend, and ChromaDB
- Local development using Docker Compose
- Environment supports hot reload for both FastAPI and Next.js
- Easy extension for cloud deployment (Render / Railway / Vercel)

---

# Getting Started

This project uses Docker Compose to run the full stack:
Next.js frontend + FastAPI backend + ChromaDB vector store.

## 1. Clone the Repository

```bash
git clone https://github.com/sourabhaprasad/TailorMyResume.git
cd TailorMyResume
```

## 2. Run the Full Stack with Docker Compose

```bash
docker-compose up --build
```

This will:

- Serve the Next.js frontend on http://localhost:3000
- Start the FastAPI backend on http://localhost:8001
- Launch the ChromaDB vector database

### Rebuilding After Changes

If you modify code or dependencies:

```bash
docker-compose down
docker-compose up --build
```

## API Endpoint

### `POST /api/process`

Accepts multipart `FormData` and returns match results and a generated cover letter.

#### Fields:

| Field             | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `resume`          | File   | Yes      | Resume in PDF format                                        |
| `job_description` | String | Yes      | Job description in PDF format                               |
| `job_title`       | String | Optional | Job role title                                              |
| `hiring_manager`  | String | Optional | Hiring manager's name for personalization                   |
| `tone`            | String | Optional | Tone of the cover letter (e.g., "professional", "friendly") |

#### Response:

```json
{
  "match_score": 0.84,
  "matched_skills": ["Python", "Machine Learning", "Data Analysis"],
  "uunmatched_skills": ["Kubernetes", "AWS Lambda"],
  "cover_letter": "Dear Hiring Manager,\nI am excited to apply for the role of..."
}
```

---

## Vector Store: ChromaDB

ChromaDB is used to store and compare semantic embeddings between resumes and job descriptions.

- **Persistence**: Stores vector data locally at `./chroma_db/`
- **In-Process**: No separate service required; runs with FastAPI

To reset embeddings:

```bash
rm -rf backend/chroma_db/
```

---

## Future Enhancements

- Integrate GPT-based or OSS LLMs for:

  - Enhanced resume and JD understanding
  - Dynamic and role-specific cover letter generation

- Improve scoring with custom similarity metrics and weights
- Add user authentication (via Supabase or NextAuth)
- Store upload history, cover letters, and match scores per user
- Production deployment with CI/CD pipelines

---

## UI Preview

<!-- TODO--- -->

## Development Tips

- Install a new shadcn/ui component:

  ```bash
  npx shadcn@latest add <component>
  ```

- Add a frontend dependency without rebuilding the container:

  ```bash
  docker exec -it <frontend-container-id> sh
  npm add <package-name>
  ```

- Common Issues:

  - `Cannot find module 'sonner'`

    - Run: `npm add sonner` inside the frontend directory

  - CORS errors on frontend
    - Ensure CORS middleware is enabled in `main.py` in FastAPI backend

---

## Contributors

- **Sourabha Prasad** – [GitHub](https://github.com/sourabhaprasad)
