from rest_framework import generics, permissions
from .models import Job
from .serializers import JobSerializer
from resumes.models import Resume
from .matcher import match_resume_to_job
from rest_framework.response import Response
from rest_framework.views import APIView

class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)


class MatchResumeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        resume_id = request.data.get("resume_id")
        job_id = request.data.get("job_id")

        from resumes.models import Resume
        from jobs.models import Job

        resume = Resume.objects.get(id=resume_id, user=request.user)
        job = Job.objects.get(id=job_id)

        score = match_resume_to_job(resume.extracted_text, job.description)

        return Response({
            "match_score": score,
            "resume_id": resume.id,
            "job_id": job.id
        })
