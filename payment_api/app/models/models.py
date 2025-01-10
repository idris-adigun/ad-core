
"""
This module defines the data models for the payment API using Pydantic.
Classes:
    PaymentBase: Base model for payment details.
    PaymentCreate: Model for creating a new payment, inherits from PaymentBase.
    PaymentUpdate: Model for updating payment details.
    FileResponse: Model for file response details.
Attributes of PaymentBase:
    payee_first_name (str): First name of the payee.
    payee_last_name (str): Last name of the payee.
    payee_payment_status (str): Payment status of the payee. Options: completed, due_now, overdue, pending.
    payee_added_date_utc (datetime): UTC timestamp when the payee was added.
    payee_due_date (date): Due date for the payment in YYYY-MM-DD format.
    payee_address_line_1 (str): First line of the payee's address.
    payee_address_line_2 (Optional[str]): Second line of the payee's address, optional.
    payee_city (str): City of the payee.
    payee_country (str): Country of the payee, ISO 3166-1 alpha-2 code.
    payee_province_or_state (Optional[str]): Province or state of the payee, optional.
    payee_postal_code (str): Postal code of the payee.
    payee_phone_number (str): Phone number of the payee in E.164 format.
    payee_email (EmailStr): Email address of the payee.
    currency (str): Currency code, ISO 4217.
    discount_percent (Optional[float]): Discount percentage, optional, default is 0, range 0-100.
    tax_percent (Optional[float]): Tax percentage, optional, default is 0, range 0-100.
    due_amount (float): Due amount, mandatory.
    total_due (Optional[float]): Total due amount, optional, default is 0.
    evidence_url (Optional[str]): URL for evidence, optional.
Attributes of PaymentUpdate:
    status (Optional[str]): Updated status of the payment, optional.
    evidence_file (Optional[str]): File path for evidence, optional.
Attributes of FileResponse:
    file_name (str): Name of the file.
    download_url (str): URL to download the file.
"""

from pydantic import BaseModel, Field
from typing import Optional
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import date, datetime

class PaymentBase(BaseModel):
    payee_first_name: str
    payee_last_name: str
    payee_payment_status: str  # Options: completed, due_now, overdue, pending
    payee_added_date_utc: datetime  # UTC timestamp
    payee_due_date: date  # Format: YYYY-MM-DD
    payee_address_line_1: str
    payee_address_line_2: Optional[str] = None
    payee_city: str
    payee_country: str  # ISO 3166-1 alpha-2
    payee_province_or_state: Optional[str] = None
    payee_postal_code: str
    payee_phone_number: str  # E.164 format
    payee_email: EmailStr
    currency: str  # ISO 4217
    discount_percent: Optional[float] = Field(default=0, ge=0, le=100)  # Percentage, 2 decimal points
    tax_percent: Optional[float] = Field(default=0, ge=0, le=100)  # Percentage, 2 decimal points
    due_amount: float  # Mandatory, 2 decimal points
    total_due: Optional[float] = Field(default=0)  # Calculated, 2 decimal points
    evidence_url: Optional[str] = None

    class Config:
        orm_mode = True


class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(BaseModel):
    status: Optional[str] = None
    evidence_file: Optional[str] = None

class FileResponse(BaseModel):
    file_name: str
    download_url: str
