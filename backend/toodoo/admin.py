from django.contrib import admin
from .models import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'important',
                    'complete', 'created_at', 'completed_date']
    list_editable = ['complete', 'important']
    readonly_fields = ['slug', 'created_at', 'completed_date']


admin.site.register(Task, TaskAdmin)
