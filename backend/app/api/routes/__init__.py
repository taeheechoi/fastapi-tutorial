from fastapi import APIRouter

from app.api.routes.contacts import router as contacts_router

router = APIRouter()

router.include_router(contacts_router, prefix="/contacts", tags=["contacts"])