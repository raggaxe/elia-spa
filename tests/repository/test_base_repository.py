import mongomock
import datetime
import unittest2 as unittest
from mongoengine import connect, get_connection
from Repository.BaseRepository import BaseRepository

class User:
    def __init__(self, name):
        self.collection_name = 'users'
        self.name = name
        self.created_at = datetime.datetime.now()
        self.updated_at = datetime.datetime.now()

class TestBaseRepository(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        conn = mongomock.MongoClient()
        cls.repository = BaseRepository(conn.db)

    def test_method_find_one_exists(self):
        self.assertTrue(hasattr(self.repository, 'find_one'))

    def test_method_create_exists(self):
        self.assertTrue(hasattr(self.repository, 'create'))

    def test_method_find_exists(self):
        self.assertTrue(hasattr(self.repository, 'find'))

    def test_method_update_one_exists(self):
        self.assertTrue(hasattr(self.repository, 'update_one'))

    def test_create_one(self):
        user = User('jose')
        result = self.repository.create(user)
        self.assertEqual(user.name, result['name'])

    def test_find(self):
        user = User('maria')
        self.repository.create(user)
        users = self.repository.find('users')
        self.assertEqual(len(list(users)), 2)

    def test_update_a_model(self):
        user = User('joaquina')
        new_user = self.repository.create(user)
        new_name = {'name': 'joana'}
        updated_user = self.repository.update_one('users', {'_id': new_user['_id']}, new_name) 
        self.assertEqual(updated_user['name'], new_name['name'])
        self.assertTrue(abs(user.updated_at - updated_user['updated_at']) < datetime.timedelta(seconds=1))
