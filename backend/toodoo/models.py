from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    important = models.BooleanField(default=False)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
