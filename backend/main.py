from fastapi import FastAPI
from routes import process  # Make sure this import path is correct
from fastapi import UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
def test_route():
    return {"message": "API is working"}


app.include_router(process.router, prefix="/api")
