from datetime import datetime
from django.conf import settings
from django.db import models
from django.template.defaultfilters import slugify


class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    important = models.BooleanField(default=False)
    complete = models.BooleanField(default=False)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_date = models.DateTimeField(blank=True, null=True)

    def clean(self):
        if self.complete:
            self.completed_date = datetime.now()
        else:
            self.completed_date = None

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = Task.objects.all().filter(
            slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while queryset:
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = Task.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug
        super(Task, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
