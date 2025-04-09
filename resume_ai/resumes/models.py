from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import JSONField


def resume_upload_path(instance, filename):
    return f'resumes/{instance.user.id}/{filename}'


class Resume(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.FileField(upload_to=resume_upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_type = models.CharField(max_length=10, blank=True)
    extracted_text = models.TextField(blank=True)
    analysis_result = models.JSONField(null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    feedback = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Resume"
