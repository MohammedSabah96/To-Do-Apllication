from django.conf import settings
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from toodoo.models import Task
from toodoo.serializers import TaskSerializer

User = get_user_model()
TODOS_URL = f"{settings.SITE_URL}/todos/"


def sample_todo(user, **params):
    default_todo = {
        "title": "Buy new TV",
        "description": "Tomorrow",
        "important": True
    }
    default_todo.update(params)
    return Task.objects.create(user=user, **default_todo)


class PublicTodoAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_todos_unauthorized(self):
        res = self.client.get(TODOS_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateTodoAPITest(TestCase):
    def setUp(self):
        payload = {
            "username": "Evo",
            "email": "evo@gmail.com",
            "password": "supercool"
        }
        self.user = User.objects.create_user(**payload)
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_get_todos_successfully(self):
        sample_todo(user=self.user)
        sample_todo(user=self.user, title="Buy Something else.")
        res = self.client.get(TODOS_URL)
        todos = Task.objects.all().order_by("-created_at")
        serializer = TaskSerializer(todos, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_todos_limited_to_user(self):
        payload = {
            "username": "Moh",
            "email": "Moh@gmail.com",
            "password": "superpassword"
        }
        user2 = User.objects.create_user(**payload)
        sample_todo(user=self.user)
        sample_todo(user=user2)
        res = self.client.get(TODOS_URL)
        todos = Task.objects.filter(user=self.user)
        serializer = TaskSerializer(todos, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_specific_todo(self):
        todo = sample_todo(user=self.user)
        res = self.client.get(f"{TODOS_URL}{todo.slug}/")

        serializer = TaskSerializer(todo)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_update_todo(self):
        todo = sample_todo(user=self.user)
        payload = {
            "title": "Buy a Car"
        }
        res = self.client.patch(f"{TODOS_URL}{todo.slug}/", payload)
        todo.refresh_from_db()
        serializer = TaskSerializer(todo)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_delete_todo(self):
        todo = sample_todo(user=self.user)
        res = self.client.delete(f"{TODOS_URL}{todo.slug}/")

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
