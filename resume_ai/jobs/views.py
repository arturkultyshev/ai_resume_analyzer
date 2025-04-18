from rest_framework.generics import ListCreateAPIView
from .models import Job
from .serializers import JobSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveDestroyAPIView

class JobListCreateAPIView(ListCreateAPIView):
    queryset = Job.objects.all().order_by("-created_at")
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]


class JobDeleteAPIView(RetrieveDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]