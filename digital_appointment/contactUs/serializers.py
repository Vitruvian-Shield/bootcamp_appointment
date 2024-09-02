from rest_framework import serializers
from . import models


class ContactUsSerializers(serializers.ModelSerializer):
    """contact us serializer: convert data to json"""
    class Meta:
        model = models.ContactUsModel
        fields = "__all__"
