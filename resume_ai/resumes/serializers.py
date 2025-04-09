from rest_framework import serializers
from .models import Resume
from .utils import extract_text_from_pdf, extract_text_from_docx
from .ai import analyze_resume
from .feedback import generate_resume_feedback
from .mongo_connector import get_mongo_collection
from .pydantic_models import ResumeAnalysis

class ResumeUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ('id', 'file', 'uploaded_at', 'extracted_text', 'analysis_result', 'score', 'feedback')

    def create(self, validated_data):
        resume = super().create(validated_data)
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
        resume.analysis_result = result
        resume.score = result.get("score", 0)

        result = analyze_resume(resume.extracted_text)
        validated_data = ResumeAnalysis(**result)

        resume.analysis_result = validated_data.dict()
        resume.score = validated_data.score

        # Фидбек
        feedback = generate_resume_feedback(resume.extracted_text)
        resume.feedback = feedback

        resume.save()

        # Сохраняем в MongoDB
        collection = get_mongo_collection()
        collection.insert_one({
            "resume_id": resume.id,
            "user": resume.user.username,
            "skills": result.get("skills"),
            "experience_years": result.get("experience_years"),
            "education": result.get("education"),
            "score": result.get("score"),
            "feedback": feedback,
        })

        return resume

