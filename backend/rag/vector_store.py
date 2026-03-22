from pathlib import Path

from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

DATA_DIR = Path(__file__).parent.parent / "data"
CHROMA_DIR = DATA_DIR / "chroma"


def get_vector_store(api_key: str) -> Chroma:
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=api_key,
    )
    return Chroma(
        collection_name="fushun_portfolio",
        embedding_function=embeddings,
        persist_directory=str(CHROMA_DIR),
    )
