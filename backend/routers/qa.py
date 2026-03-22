from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def qa_root():
    return {"message": "QA router ready"}
