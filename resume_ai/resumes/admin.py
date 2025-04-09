from django.contrib import admin
from .models import Resume

class ResumeAdmin(admin.ModelAdmin):
    list_display = ('user', 'file_type', 'score', 'uploaded_at')
    search_fields = ('user__username',)
    list_filter = ('file_type',)

admin.site.register(Resume, ResumeAdmin)
