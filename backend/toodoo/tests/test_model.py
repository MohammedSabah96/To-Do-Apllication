from django.test import TestCase
from toodoo.models import Task


class ModelTaskTests(TestCase):
    def setUp(self):
        self.task_test = Task.objects.create(
            title="Buy an Apple",
            description="Before 7:00 clock",
            important=True
        )

    def test_slug(self):
        task = Task.objects.get(id=1)
        slug = task.slug
        self.assertEqual(slug, self.task_test.slug)

    def test_important_task(self):
        task = Task.objects.get(id=1)
        important = task.important
        self.assertEqual(important, self.task_test.important)
        self.assertTrue(important)

    def test_created_date_task(self):
        task = Task.objects.get(id=1)
        created_date = task.created_at
        self.assertEqual(created_date, self.task_test.created_at)

    def test_completed_date_task(self):
        task = Task.objects.get(id=1)
        completed_date = task.completed_date
        self.assertEqual(completed_date, self.task_test.completed_date)
        self.assertFalse(completed_date)
