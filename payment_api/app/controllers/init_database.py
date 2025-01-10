
"""
This module initializes the database by normalizing CSV data and inserting it into a MongoDB collection.
Functions:
    init_db(): Asynchronously normalizes CSV data, clears the database, and inserts the normalized data into the MongoDB collection.
    clear_db(): Asynchronously clears the MongoDB collection.
Dependencies:
    normalize_csv: Function from app.controllers.file_controller to normalize CSV data.
    payments_collection: MongoDB collection from app.config.database.
"""

from app.controllers.file_controller import normalize_csv
from app.config.database import payments_collection
    
    
async def init_db():
    # Normalize the CSV data
    normalized_data = normalize_csv('payment_information.csv')
    payments_collection.delete_many({})
    
    if(clear_db()):
        # Insert normalized data into MongoDB
        try:
            if isinstance(normalized_data, list):
                payments_collection.insert_many(normalized_data)
            else:
                payments_collection.insert_one(normalized_data)
            return "Success"
        except Exception as e:
            return f"Failed : {e}"
    

async def clear_db():
    try: 
        payments_collection.delete_many({})
        return True
    except:
        return False