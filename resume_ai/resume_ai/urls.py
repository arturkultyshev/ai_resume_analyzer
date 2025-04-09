from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import RegisterView
from resumes.views import ResumeUploadView
from jobs.views import JobListCreateView, MatchResumeView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from resumes.views import ResumeListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/resumes/upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('api/jobs/', JobListCreateView.as_view(), name='job-list-create'),
    path('api/jobs/match/', MatchResumeView.as_view(), name='match-resume'),
]

schema_view = get_schema_view(
   openapi.Info(
      title="Resume AI API",
      default_version='v1',
      description="API documentation for Resume Analyzer",
      contact=openapi.Contact(email="support@resumeai.com"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns += [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/resumes/', ResumeListView.as_view(), name='resume-list-cached'),
]