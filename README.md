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
- **AI Matching**: (LLM integration planned)

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
- Handles `FormData` submission to FastAPI backend
- Responsive UI built with Tailwind CSS and shadcn/ui components
- Notifications via `sonner`, layout components (`Card`, `Separator`)

### Backend

- Resume and JD parsing with PyMuPDF (`fitz`)
- Embedding logic for semantic similarity scoring
- Matching algorithm compares vector similarity between files
- Cover letter generation (currently mocked, LLM integration pending)
- REST API exposed at `/api/process` with CORS enabled

### DevOps / Infrastructure

- Dockerized setup for frontend, backend, and ChromaDB
- Local development using Docker Compose
- Environment supports hot reload for both FastAPI and Next.js
- Easy extension for cloud deployment (Render / Railway / Vercel)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sourabhaprasad/TailorMyResume.git
cd Matchly
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install   # or yarn
```

### 3. Run the Entire Stack with Docker Compose

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8001](http://localhost:8001)
- ChromaDB: [http://localhost:8000](http://localhost:8000)

> Ensure Docker is running on your system. If you face issues, verify Docker daemon with:
> `docker info` or `sudo systemctl start docker` (on Linux)

---

## API Endpoint

### `POST /api/process`

Accepts multipart `FormData` and returns match results and a generated cover letter.

#### Fields:

| Field             | Type   | Required | Description                               |
| ----------------- | ------ | -------- | ----------------------------------------- |
| `resume`          | File   | Yes      | Resume in PDF format                      |
| `job_description` | String | Yes      | Job description in PDF format             |
| `job_title`       | String | Optional | Job role title                            |
| `hiring_manager`  | String | Optional | Hiring manager's name for personalization |

#### Response:

```json
{
  "match_score": 0.84,
  "summary": "The resume closely aligns with key responsibilities...",
  "cover_letter": "Dear Hiring Manager,\nI am excited to apply for the role of..."
}
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

> Add screenshots under `/public/screenshots/`
> Suggested: Upload screen, Match result, Cover letter display

---

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
    ➤ Run: `npm add sonner` inside the frontend directory

  - CORS errors on frontend
    ➤ Ensure CORS middleware is enabled in `main.py` in FastAPI backend

---

## Contributors

- **Sourabha Prasad** – [GitHub](https://github.com/sourabhaprasad)

---
