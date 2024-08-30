from rest_framework import serializers
from .models import Appointment
from medicine.models import Service

class AppointmentSerializer(serializers.ModelSerializer):
    service = Service()
    class Meta:
        model = Appointment
        fields = "__all__"
