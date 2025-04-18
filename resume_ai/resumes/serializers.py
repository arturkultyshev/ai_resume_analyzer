from rest_framework import serializers
from .models import Resume
from .utils import extract_text_from_pdf, extract_text_from_docx
from .ai import analyze_resume
from .feedback import generate_resume_feedback
from .mongo_connector import get_mongo_collection
from .pydantic_models import ResumeAnalysis
from jobs.models import Job

class ResumeUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ('id', 'file', 'uploaded_at', 'extracted_text', 'analysis_result', 'score', 'feedback')

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data.pop("user", None)

        resume = Resume.objects.create(user=user, **validated_data)
        path = resume.file.path

        # Извлечение текста
        if path.endswith('.pdf'):
            resume.extracted_text = extract_text_from_pdf(path)
            resume.file_type = 'pdf'
        elif path.endswith('.docx'):
            resume.extracted_text = extract_text_from_docx(path)
            resume.file_type = 'docx'
        else:
            raise serializers.ValidationError("Unsupported file format")

        # AI анализ
        result = analyze_resume(resume.extracted_text)
        validated_data = ResumeAnalysis(**result)
        resume.analysis_result = validated_data.dict()
        resume.score = validated_data.score

        # 🔍 Подбор подходящих вакансий
        user_skills = set(validated_data.skills)
        matching_jobs = []

        for job in Job.objects.all():
            job_skills = set(job.required_skills)
            match_count = len(user_skills & job_skills)
            total_required = len(job_skills)
            match_score = match_count / total_required if total_required else 0

            if match_score >= 0.5:  # порог совпадения 50%
                matching_jobs.append({
                    "id": job.id,
                    "title": job.title,
                    "location": job.location,
                    "match_score": round(match_score * 100),
                })

        resume.analysis_result["matching_jobs"] = matching_jobs

        # Фидбек
        feedback = generate_resume_feedback(resume.extracted_text)
        resume.feedback = feedback

        resume.save()

        # Сохраняем в MongoDB
        collection = get_mongo_collection()
        collection.insert_one({
            "resume_id": resume.id,
            "user": user.username,
            "skills": result.get("skills"),
            "experience_years": result.get("experience_years"),
            "education": result.get("education"),
            "score": result.get("score"),
            "feedback": feedback,
            "matching_jobs": matching_jobs,
        })

        return resume
