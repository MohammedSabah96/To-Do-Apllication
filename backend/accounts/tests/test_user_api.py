from django.contrib.auth import get_user_model
from django.conf import settings
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()
CREATE_USER_URL = f"{settings.SITE_URL}/auth/users/"
CREATE_JWT_URL = f"{settings.SITE_URL}/auth/jwt/create/"
USER_URL = f"{settings.SITE_URL}/auth/users/me/"


def create_user(
        username="Moa",
        email="moa@gmail.com",
        password="supersecret"):
    return User.objects.create_user(username, email, password)


class PublicUserAPITests(TestCase):
    def setUp(self):
        self.payload = {
            "username": "Moa",
            "email": "moa@gmail.com",
            "password": "supersecret",
            "re_password": "supersecret"
        }
        self.client = APIClient()

    def test_create_user_successfully(self):
        res = self.client.post(CREATE_USER_URL, self.payload)
        user = User.objects.get(**res.data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['email'], user.email)
        self.assertTrue(user.check_password(self.payload['password']))
        self.assertNotIn('password', res.data)

    def test_create_exists_user(self):
        create_user()
        res = self.client.post(CREATE_USER_URL, self.payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            res.data['email'][0],
            "user account with this email already exists.")

    def test_password_too_short(self):
        self.payload = {
            "username": "Moa",
            "email": "moa@gmail.com",
            "password": "sup",
            "re_password": "sup"
        }
        res = self.client.post(CREATE_USER_URL, self.payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            res.data['password'][0],
            "This password is too short. It must contain at least 8 characters.")

    def test_create_JWT_successfully(self):
        create_user()
        self.payload = {
            "email": "moa@gmail.com",
            "password": "supersecret"
        }
        res = self.client.post(CREATE_JWT_URL, self.payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('access', res.data)

    def test_create_JWT_invalid_credential(self):
        self.payload = {
            "email": "moa@gmail.com",
            "password": "supersecret"
        }
        res = self.client.post(CREATE_JWT_URL, self.payload)
        self.assertEqual(
            res.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotIn('access', res.data)
        self.assertEqual(
            res.data['detail'],
            "No active account found with the given credentials")

    def test_create_JWT_messing_password(self):
        self.payload = {
            "email": "moa@gmail.com",
            "password": ""
        }
        res = self.client.post(CREATE_JWT_URL, self.payload)
        self.assertEqual(
            res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('access', res.data)
        self.assertEqual(
            res.data['password'][0], "This field may not be blank.")

    def test_retrieve_user_unauthorized(self):
        res = self.client.get(USER_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserAPITests(TestCase):
    def setUp(self):
        self.user = create_user()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_user_successfully(self):
        res = self.client.get(USER_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(
            res.data, {
                "username": self.user.username,
                "email": self.user.email,
                "id": self.user.id
            })

    def test_post_user_method_not_allowed(self):
        res = self.client.post(USER_URL, {})
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_successfully(self):
        payload = {
            "username": "django"
        }
        res = self.client.patch(USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], payload['username'])
        self.assertEqual(self.user.username, payload['username'])

    def test_delete_user_successfully(self):
        payload = {
            "current_password": "supersecret"
        }
        res = self.client.delete(USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_user_missing_password(self):
        payload = {
            "current_password": ""
        }
        res = self.client.delete(USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            res.data['current_password'][0],
            "This field may not be blank.")
