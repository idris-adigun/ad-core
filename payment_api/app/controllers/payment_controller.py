import datetime
from typing import Optional
from app.config.database import payments_collection
from app.models.models import PaymentCreate, PaymentUpdate
from fastapi import HTTPException, Query
from bson import ObjectId


async def get_payments_controller(keyword: Optional[str] = None, page: int = 1, limit: int = 10):
    skip = (page - 1) * limit
    query = {}
    if keyword:
        query = {"$or": [
            {"payee_first_name": {"$regex": keyword, "$options": "i"}},
            {"payee_last_name": {"$regex": keyword, "$options": "i"}},
            {"payee_payment_status": {"$regex": keyword, "$options": "i"}},
            {"payee_email": {"$regex": keyword, "$options": "i"}}
        ]}

    total_payments = payments_collection.count_documents(query)
    payments =  payments_collection.find(query).skip(skip).limit(limit).to_list(length=limit)
    for payment in payments:
        payment["_id"] = str(payment["_id"])
    if not payments:
        raise HTTPException(status_code=404, detail="No payments found")
    
    for payment in payments:
        due_amount = payment["due_amount"]
        discount_percent = payment["discount_percent"]
        discount_amount = payment['due_amount'] * (discount_percent / 100)
        tax_amount = payment['due_amount']  * (payment['tax_percent'] / 100)
        total_due = due_amount - discount_amount + tax_amount

        payment["total_due"] = total_due
        if payment.get("payee_due_date"):
            payee_due_date = payment["payee_due_date"]
            if payee_due_date.date() == datetime.datetime.today().date():
                payment["payee_payment_status"] = "due_now"
            elif payee_due_date.date() < datetime.datetime.today().date():
                payment["payee_payment_status"] = "overdue"
    total_pages = total_payments  # Calculate total number of pages
    return {"payments": payments, "total_pages": total_pages}


async def create_payment_controller(payment: PaymentCreate):
    payment_data = payment.dict()
    for key, value in payment_data.items():
        if isinstance(value, datetime.date):
            payment_data[key] = datetime.datetime.combine(value, datetime.datetime.min.time())
    result = payments_collection.insert_one(payment_data)
    if result.inserted_id:
        return {"id": str(result.inserted_id)}
    else:
        raise HTTPException(status_code=500, detail="Payment creation failed")


async def update_payment_controller(payment_id: str, payment_update: PaymentUpdate):
    payment_data = payment_update.dict(exclude_unset=True)
    if payment_data.get("payee_due_date"):
        payment_data["payee_due_date"] = datetime.datetime.combine(payment_data["payee_due_date"], datetime.datetime.min.time())
    result = payments_collection.update_one({"_id": ObjectId(payment_id)}, {"$set": payment_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"success": True}


async def delete_payment_controller(payment_id: str):

    result = payments_collection.delete_one({"_id": ObjectId(payment_id)})
    if result.deleted_count > 0:
        return {"success": True}
    else:
        raise HTTPException(status_code=404, detail="Payment not found")