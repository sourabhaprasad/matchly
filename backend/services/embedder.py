from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def embed_text(text: str, namespace: str):
    chunks = splitter.split_text(text)

    if not chunks:
        raise ValueError("No text chunks were generated from the input.")

    db = Chroma(persist_directory=f"chroma_store/{namespace}", embedding_function=embedding_model)

    try:
        db.add_texts(chunks)
        db.persist()
        return len(chunks)
    except ValueError as e:
        print(f"Error during embedding: {e}")
        raise ValueError("Embedding failed. Possibly due to empty or malformed embeddings.")
