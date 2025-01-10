
"""
This module provides file handling functionalities for the payment API.
Functions:
    normalize_csv(file_path: str) -> list:
        Reads a CSV file, normalizes its schema, and returns a list of dictionaries representing the rows.
    upload_evidence(payment_id: str, file: UploadFile = File(...)) -> JSONResponse:
        Uploads an evidence file (PDF, PNG, JPG) to GridFS, updates the payment record with the evidence URL, 
        and returns a JSON response with the file ID and download URL.
    download_evidence(file_name: str) -> StreamingResponse:
        Retrieves an evidence file from GridFS by its file name and returns it as a streaming response.
"""

import pandas as pd
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from bson.objectid import ObjectId
from app.config.database import fs, payments_collection

def normalize_csv(file_path: str):
    df = pd.read_csv(file_path)
    # Perform schema normalization
    df["payee_due_date"] = pd.to_datetime(df["payee_due_date"]).dt.strftime("%Y-%m-%d")
    df.fillna({"discount": 0, "tax": 0}, inplace=True)
    df["evidence_url"] = ""
    return df.to_dict(orient="records")


async def upload_evidence(payment_id: str, file: UploadFile = File(...)):
    if not file.filename.endswith((".pdf", ".png", ".jpg")):
        raise HTTPException(status_code=400, detail="Invalid file format")
    
    file_id = fs.put(file.file, filename=file.filename, content_type=file.content_type)
    # Generate a download URL
    download_url = f"/images/{str(file_id)}"
    # Update the payment with the payment_id
    
    result = payments_collection.update_one(
        {"_id": ObjectId(payment_id)},
        {"$set": {"evidence_url": download_url, "payee_payment_status": "completed"}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    return JSONResponse({"file_id": str(file_id), "download_url": download_url})
    

async def download_evidence(file_name: str):
    try:
        # Retrieve the image from GridFS
        file_data = fs.get(ObjectId(file_name))
    except Exception:
        raise HTTPException(status_code=404, detail="Image not found")

    return StreamingResponse(file_data, media_type=file_data.content_type)