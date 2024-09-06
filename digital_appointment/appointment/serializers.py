from rest_framework import serializers
from appointment.models import Appointment
from accounts import serializers as account_serializers
from medicine import serializers as medicine_serializers
from accounts.models import User
from medicine.models import *

class AppointmentSerializer(serializers.ModelSerializer):
    """
    this type of code style is for bootcamp competition
    but we dont need write required
    """
    user = account_serializers.UserSerializer(read_only=True)
    provider = medicine_serializers.ProviderSerializer(read_only=True)
    service = medicine_serializers.ServiceSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
        write_only=True,
    )
    provider_id = serializers.PrimaryKeyRelatedField(
        queryset=Provider.objects.all(),
        source='provider',
        write_only=True,
    )
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(),
        source='service',
        write_only=True,
    )

    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        appointment, created = Appointment.objects.update_or_create(**validated_data)
        return appointment
