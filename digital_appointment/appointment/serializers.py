from rest_framework import serializers
from .models import Appointment
from medicine.models import Service, Provider

class AppointmentSerializer(serializers.ModelSerializer):
    provider = Provider()
    service = Service()
    class Meta:
        model = Appointment
        fields = "__all__"
