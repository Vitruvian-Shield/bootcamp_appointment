from rest_framework import serializers
from appointment.models import Appointment
"""
read comment in top of appotinment serializer you get
reason of this comment 

from accounts import serializers as account_serializers
from medicine import serializers as medicine_serializers
"""
class AppointmentSerializer(serializers.ModelSerializer):
    """
    i write this because be like medicine serializer
    but access level be important for me and
    when patient want get appointment access level
    dont permission to us create user provider, service and etc.
    this code only write for competition in this bootcamp
    and this not practical in this policy and say we can
    write a serializer that have power created many model

    user = account_serializers.UserSerializer()
    provider = medicine_serializers.ProviderSerializer()
    service = medicine_serializers.ServiceSerializer()
    """

    class Meta:
        model = Appointment
        fields = '__all__'

    def create(self, validated_data):
        appointment, created = Appointment.objects.update_or_create(**validated_data)
        return appointment
