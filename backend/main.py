from fastapi import FastAPI
from chroma_client import collection

app = FastAPI()

@app.get("/test-chroma")
def test_chroma():
    # Insert a test embedding
    collection.add(
        documents=["Example resume text"],
        embeddings=[[0.1]*768],  # Dummy embedding of length 768
        ids=["example_1"]
    )
    return {"status": "Added test embedding"}
