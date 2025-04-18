from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['recruiter']

    def create(self, validated_data):
        user = self.context['request'].user
        return Job.objects.create(recruiter=user, **validated_data)

