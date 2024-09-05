from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import DoctorsModel, ServiceModel, LocationModel
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

    location = serializers.PrimaryKeyRelatedField(queryset=LocationModel.objects.all())
    speciality = serializers.PrimaryKeyRelatedField(queryset=ServiceModel.objects.all())

    class Meta:
        model = models.DoctorsModel
        fields = "__all__"

    def create(self, validated_data):
        location = validated_data.pop("location")
        speciality = validated_data.pop("speciality")
        doctor = models.DoctorsModel.objects.create(location=location, speciality=speciality, **validated_data)
        return doctor


class DoctorTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT serializer for doctors"""

    username_field = 'username'

    def validate(self, attrs):
        username = attrs.get('username', None)
        password = attrs.get('password', None)

        if '@' in username:
            self.username_field = 'email'
        elif username.isdigit():
            self.username_field = 'phone_number'
        else:
            self.username_field = 'username'

        doctor = DoctorsModel.objects.filter(
            **{self.username_field: username}
        ).first()

        if doctor is None:
            raise serializers.ValidationError('Doctor not found.')

        if not check_password(password, doctor.password):
            raise serializers.ValidationError('Incorrect password.')

        data = {}
        refresh = self.get_token(doctor)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data
