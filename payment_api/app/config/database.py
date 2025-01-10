from pymongo import MongoClient
from gridfs import GridFS
MONGO_DETAILS = "mongodb://mongo:27017"

client = MongoClient(MONGO_DETAILS)
database = client["payment_system"]
fs = GridFS(database)
payments_collection = database.get_collection("payments")