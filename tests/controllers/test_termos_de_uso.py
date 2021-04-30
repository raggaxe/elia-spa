from app import app
from unittest import TestCase
from flask import url_for

class TestTermosDeUso(TestCase):
    def setUp(self):
        self.app = app
        self.context = self.app.app_context()
        self.context.push()
        self.client = self.app.test_client()

    def test_status_code_200_route_termos_de_uso(self):
        response = self.client.get(url_for('index_routes.termos'))
        self.assertEqual(response.status_code, 200)

    def test_status_code_200_route_register(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_checkbox_exists_in_the_page(self):
        response = self.client.get('/')
        self.assertIn("termos" ,response.get_data(as_text=True))

    def test_status_code_200_route_politica_de_conduta(self):
        response = self.client.get(url_for('index_routes.politica_de_conduta'))
        self.assertEqual(response.status_code, 200)

    def test_status_code_200_route_privacidade(self):
        response = self.client.get(url_for('index_routes.privacidade'))
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.context.pop()

