from django.contrib import admin
from .models import Job

class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'recruiter', 'location', 'created_at')
    search_fields = ('title', 'recruiter__username')
    list_filter = ('location',)

admin.site.register(Job, JobAdmin)
