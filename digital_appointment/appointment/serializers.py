from rest_framework import serializers
from accounts.models import User
from medicine.models import DoctorsModel, ServiceModel
from . import models


class AppointmentSerializer(serializers.ModelSerializer):
    """ serializer for appointment table """

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=DoctorsModel.objects.all())
    service = serializers.PrimaryKeyRelatedField(queryset=ServiceModel.objects.all())

    class Meta:
        model = models.AppointmentModel
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    """serializer for comments in profile page"""

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    doctor = serializers.PrimaryKeyRelatedField(queryset=DoctorsModel.objects.all())

    class Meta:
        model = models.CommentsModel
        fields = "__all__"


