"""
This module defines the payment-related API routes for the FastAPI application.
Routes:
    - GET /get-payments/: Retrieve a list of payments with optional status filter, pagination supported.
    - POST /create-payment/: Create a new payment.
    - PUT /update-payment/{payment_id}: Update an existing payment by its ID.
    - DELETE /delete-payment/{payment_id}: Delete a payment by its ID.
Dependencies:
    - app.models.models: Contains the PaymentCreate and PaymentUpdate models.
    - app.controllers.payment_controller: Contains the controller functions for handling payment operations.
"""

from typing import Optional
from app.models.models import PaymentCreate, PaymentUpdate
from fastapi import APIRouter
from app.controllers.payment_controller import get_payments_controller, create_payment_controller, update_payment_controller, delete_payment_controller

router = APIRouter()

@router.get("/get-payments/")
async def get_payments(keyword: Optional[str] = None, page: int = 1, limit: int = 10):
    payments = await get_payments_controller(keyword, page, limit)
    return payments

@router.post("/create-payment/")
async def create_payment(payment: PaymentCreate):
    result = await create_payment_controller(payment)
    return result

@router.put("/update-payment/{payment_id}")
async def update_payment(payment_id: str, payment_update: PaymentUpdate):
    result = await update_payment_controller(payment_id, payment_update)
    return result

@router.delete("/delete-payment/{payment_id}")
async def delete_payment(payment_id: str):
    result = await delete_payment_controller(payment_id)
    return result
    
