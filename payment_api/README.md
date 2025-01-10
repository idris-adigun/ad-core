# Payment API

## Endpoints

### Payment Routes - prefix with '/payments'

- GET /get-payments/: Retrieve a list of payments with optional status filter, pagination supported.
- POST /create-payment/: Create a new payment.
- PUT /update-payment/{payment_id}: Update an existing payment by its ID.
- DELETE /delete-payment/{payment_id}: Delete a payment by its ID.

### File Routes - prefix with '/evidence'

- POST /upload/: Upload evidence file for a payment.
- GET /download/{file_name}: Download evidence file by its name.

### Database Routes - prefix with '/db'

- GET /initialize/: Initializes the database.
- GET /clear/: Clears the database.

#Usage

```bash
docker-compose up --build -d
```
