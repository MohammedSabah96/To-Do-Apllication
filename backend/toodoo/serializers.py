from datetime import datetime
from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["slug", "title", 'description', 'important',
                  'complete', 'created_at', 'completed_date']
        lookup_fields = 'slug'
        read_only_fields = ("slug", "created_at", "completed_date")

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'desinstance.description', instance.description)
        instance.important = validated_data.get(
            'important', instance.important)
        instance.complete = validated_data.get('complete', instance.complete)
        if instance.complete:
            instance.completed_date = datetime.now()
        else:
            instance.completed_date = None
        instance.save()
        return instance
