from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import DoctorsModel
from . import models


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LocationModel
        fields = "__all__"


class ServiceSerializer(serializers.Serializer):
    class Meta:
        model = models.ServiceModel
        fields = '__all__'


class DoctorsSerializer(serializers.ModelSerializer):
    """Doctors serializer: Convert data to json"""

    location = LocationSerializer()
    speciality = ServiceSerializer()

    class Meta:
        model = models.DoctorsModel
        fields = "__all__"

    def create(self, validated_data):
        location_data = validated_data.pop("location")
        speciality_data = validated_data.pop("speciality")
        location = LocationSerializer.create(LocationSerializer(), validated_data=location_data)
        speciality = ServiceSerializer.create(ServiceSerializer(), validated_data=speciality_data)
        provider = models.DoctorsModel.objects.create(location=location, speciality=speciality, **validated_data)
        return provider


class DoctorTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT serializer for doctors"""

    username_field = 'username'

    def validate(self, attrs):
        username = attrs.get('username', None)

        if '@' in username:
            self.username_field = 'email'
        elif username.isdigit():
            self.username_field = 'phone_number'
        else:
            self.username_field = 'username'

        if self.username_field != 'username':
            username = DoctorsModel.objects.filter(
                **{self.username_field: username}
            ).values_list('username', flat=True).first()
            self.username_field = 'username'
            attrs['username'] = username

        data = super().validate(attrs)
        return data