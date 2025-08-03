import os
import chromadb

chroma_host = os.getenv("CHROMA_HOST", "localhost")
chroma_port = os.getenv("CHROMA_PORT", "8000")

client = chromadb.HttpClient(host=chroma_host, port=int(chroma_port))

collection = client.get_or_create_collection(name="resume_embeddings")
