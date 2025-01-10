from fastapi import FastAPI
from app.routers import payments, file, db

app = FastAPI()

app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(file.router, prefix="/evidence", tags=["File Upload"])
app.include_router(db.router, prefix="/db", tags=["Database Init"])

