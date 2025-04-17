from rest_framework import generics, permissions
from .models import Resume
from .serializers import ResumeUploadSerializer
from rest_framework.permissions import IsAuthenticated
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from rest_framework.generics import ListAPIView

@method_decorator(ratelimit(key='user', rate='10/m', block=True), name='dispatch')
class ResumeListView(ListAPIView):
    serializer_class = ResumeUploadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user)


class ResumeUploadView(generics.CreateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
