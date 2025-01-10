
"""
This module defines the database-related routes for the FastAPI application.
Routes:
    /initialize/ (GET): Initializes the database by calling the init_db function.
    /clear/ (GET): Clears the database by calling the clear_db function.
"""
from fastapi import APIRouter
from app.controllers.init_database import init_db, clear_db

router = APIRouter()

######
@router.get("/initialize/")
async def initialize():
    response = await init_db()
    return response

@router.get("/clear/")
async def initialize():
    response = await clear_db()
    return response