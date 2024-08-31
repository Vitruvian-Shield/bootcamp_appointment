from rest_framework import serializers
from . import models
from accounts import serializers as accounts_serializers


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = "__all__"


class ProviderSerializer(serializers.ModelSerializer):
    user = accounts_serializers.UserSerializer()
    location = LocationSerializer()

    class Meta:
        model = models.Provider
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        location_data = validated_data.pop("location")
        user = accounts_serializers.UserSerializer.create(
            accounts_serializers.UserSerializer(), validated_data=user_data)
        location = LocationSerializer.create(
            LocationSerializer(), validated_data=location_data)
        provider, created = models.Provider.objects.update_or_create(
            user=user, location=location, **validated_data)
        return provider


class SpecialitySerializer(serializers.Serializer):
    speciality = serializers.CharField(max_length=255)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Service
        fields = '__all__'
