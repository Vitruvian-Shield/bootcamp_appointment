from rest_framework import serializers
from . import models


# location

class AppointmentSerializer(serializers.ModelSerializer):
    """ serializer for appointment """

    class Meta:
        model = models.Appointment
        fields = '__all__'
