from rest_framework import serializers
from . import models


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Provider
        fields = "__all__"


class SpecialitySerializer(serializers.Serializer):
    speciality = serializers.CharField()
