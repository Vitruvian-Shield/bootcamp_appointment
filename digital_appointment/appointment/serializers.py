from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models
from medicine.serializers import ServiceSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    service = serializers.StringRelatedField()
    user = serializers.StringRelatedField()
    class Meta:
        model = models.Appointment
        fields = '__all__'




