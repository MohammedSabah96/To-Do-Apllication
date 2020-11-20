from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "title", 'description', 'important', 'complete']
        lookup_fields = 'slug'
        read_only = "id"
