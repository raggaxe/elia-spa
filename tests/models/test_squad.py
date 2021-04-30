from bson.objectid import ObjectId
import unittest2 as unittest
from Models.Overlay import  Overlay

class TestSquad(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        id_user = ObjectId()
        cls.overlay = Overlay(id_user)

    def test_method_to_dict_exists(self):
        self.assertTrue(hasattr(self.overlay, 'to_dict'))

    def test_method_to_datafields_is_dict(self):
        self.assertTrue(isinstance(self.overlay.data_fields(), dict))

    def test_method_to_datafields_has_same_fields(self):
        fields = {
                'Partidas':0,
                'Tempo Stream':0,
                'vitorias':0,
                'top_10':0,
                'top_25':0,
                'kills':0,
                'KD':0,
                'AVG_LIFE':0
                }

        self.assertEqual(fields.keys(), self.overlay.data_fields().keys())

    def test_method_to_dict_is_dict(self):
        self.assertTrue(isinstance(self.overlay.to_dict(), dict))

    def test_method_data_fields_exists(self):
        self.assertTrue(hasattr(self.overlay, 'data_fields'))

    def test_valid_owner_field(self):
        try:
            Overlay('any_id')
        except Exception as e:
            msg = 'invalid id_user, use like ObjectId'
            self.assertEqual(str(e), msg)
