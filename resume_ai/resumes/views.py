from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from .models import Resume
from .serializers import ResumeUploadSerializer
from rest_framework.permissions import IsAuthenticated
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator

@method_decorator(ratelimit(key='user', rate='10/m', block=True), name='dispatch')
class ResumeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Success with rate limit"})


class ResumeUploadView(generics.CreateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
