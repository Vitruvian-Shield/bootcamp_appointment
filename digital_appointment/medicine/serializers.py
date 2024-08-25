from rest_framework import serializers
from . import models


# location

class LocationSerializer(serializers.ModelSerializer):
    """ serializer for location """

    class Meta:
        model = models.Location
        fields = '__all__'


# provider
class ProviderSerializer(serializers.ModelSerializer):
    """ serializer for provider """

    class Meta:
        model = models.Provider
        fields = '__all__'


# service

class ServiceSerializer(serializers.ModelSerializer):
    """ serializer for service """

    class Meta:
        model = models.Service
        fields = '__all__'
