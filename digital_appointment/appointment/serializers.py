from rest_framework import serializers
from .models import Appointment



class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

    def create(self, validated_data):

        # Custom create method if any additional logic is needed
        
        return Appointment.objects.create(**validated_data)