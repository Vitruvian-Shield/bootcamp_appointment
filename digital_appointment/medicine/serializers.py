from rest_framework import serializers
from . import models


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = '__all__'
