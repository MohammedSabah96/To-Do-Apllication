from datetime import datetime
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from toodoo.models import Task

User = get_user_model()


def sample_todo(user, **params):
    default_todo = {
        "title": "Buy an Apple",
        "description": "Before 7:00 clock",
        "important": True
    }
    default_todo.update(params)
    return Task.objects.create(user=user, **default_todo)


class ModelTaskTests(TestCase):
    def setUp(self):
        payload = {
            "username": "Evo",
            "email": "evo@gmail.com",
            "password": "supercool"
        }
        self.user = User.objects.create_user(**payload)
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_slug_task(self):
        todo = sample_todo(user=self.user)
        title = todo.title.lower().split(" ")
        slug = "-".join(title)
        self.assertEqual(slug, todo.slug)

    def test_important_task(self):
        todo = sample_todo(user=self.user)
        important = todo.important
        self.assertTrue(important)

    def test_created_date_task(self):
        todo = sample_todo(user=self.user) 
        self.assertTrue(todo.created_at)
        self.assertFalse(todo.completed_date)

    def test_completed_date_task(self):
        todo = sample_todo(user=self.user)
        todo.complete = True
        todo.completed_date = datetime.now()
        self.assertTrue(todo.created_at)
        self.assertTrue(todo.complete)
        self.assertTrue(todo.completed_date)
