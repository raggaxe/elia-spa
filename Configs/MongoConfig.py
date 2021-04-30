import pymongo
import os


class MongoConfig:
    def __init__(self):
        mongo_uri = os.getenv("DATABASE_URL")
        self.conn = pymongo.MongoClient(mongo_uri, connect=False)

    def get_connect(self):
        return self.conn
