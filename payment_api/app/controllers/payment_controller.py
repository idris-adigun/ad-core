from typing import Optional
from app.config.database import payments_collection
from app.models.models import PaymentCreate, PaymentUpdate
from fastapi import HTTPException, Query

async def get_payments_controller(status: Optional[str] = None, page: int = 1, limit: int = 10):
    skip = (page - 1) * limit
    query = {}
    if status:
        query["payee_payment_status"] = status

    payments = payments_collection.find(query).skip(skip).limit(limit).to_list(length=limit)
    for payment in payments:
        payment["_id"] = str(payment["_id"])
    return payments


async def create_payment_controller(payment: PaymentCreate):
    result = await payments_collection.insert_one(payment.dict())
    return {"id": str(result.inserted_id)}


async def update_payment_controller(payment_id: str, payment_update: PaymentUpdate):
    if payment_update.status == "completed" and not payment_update.evidence_file:
        raise HTTPException(400, "Evidence file required for 'completed' status")
    result = await payments_collection.update_one({"_id": payment_id}, {"$set": payment_update.dict()})
    return {"success": result.modified_count > 0}


async def delete_payment_controller(payment_id: str):
    result = await payments_collection.delete_one({"_id": payment_id})
    return {"success": result.deleted_count > 0}