from pymongo import MongoClient
import os

def get_mongo_collection():
    client = MongoClient(
        host=os.getenv("MONGO_HOST", "localhost"),
        port=int(os.getenv("MONGO_PORT", 27017)),
        username=os.getenv("MONGO_USER") or None,
        password=os.getenv("MONGO_PASSWORD") or None
    )
    db = client[os.getenv("MONGO_DB", "resume_ai_mongo")]
    return db["resume_analysis"]
