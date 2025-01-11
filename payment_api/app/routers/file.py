"""
This module defines the API endpoints for file upload and download operations.
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.controllers import file_controller
# from app.db.mongodb import get_database

router = APIRouter()

@router.post("/upload/{payment_id}")
async def upload_evidence(payment_id: str, file: UploadFile = File(...)):
    response = await file_controller.upload_evidence(payment_id, file)
    return response

@router.get("/download/{file_name}")
async def download_evidence(file_name: str):
    response = await file_controller.download_evidence(file_name)
    return response
