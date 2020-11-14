from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()


def sample_user(
        username="Test Super", email="test@test.com", password="password123"):
    return User.objects.create_user(username, email, password)


class AccountModelTests(TestCase):
    def test_create_user(self):
        email = "te@test.com"
        password = "pass123"
        user = sample_user(email=email, password=password)
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_check_email_normalized(self):
        email = "test@TEST.com"
        user = sample_user(email=email)
        self.assertEqual(user.email, email.lower())

    def test_create_superuser(self):
        username = "Test Admin"
        email = "super@user.com"
        password = "superpassword"
        user = User.objects.create_superuser(
            username, email, password
        )

        self.assertEqual(user.email, email)
        self.assertEqual(user.username, username)
        self.assertTrue(user.check_password(password))
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_create_invalid_email(self):
        with self.assertRaises(ValueError):
            sample_user(email=None, password="pass223")
