from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import qa

app = FastAPI(title="Fushun RAG API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: 上線後改為前端網域
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(qa.router, prefix="/api/qa", tags=["QA"])


@app.get("/health")
async def health():
    return {"status": "ok"}
