from fastapi import FastAPI
from routes import process  # Make sure this import path is correct
from fastapi import UploadFile, File, Form

app = FastAPI()

# Health check/test route
@app.get("/test")
def test_route():
    return {"message": "API is working"}

# Mount the process router
app.include_router(process.router, prefix="/api")
