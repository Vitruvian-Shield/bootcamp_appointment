from rest_framework import serializers
from accounts import serializers as accounts_serializers
from accounts.models import User
from medicine.models import DoctorsModel
from medicine import serializers as medicine_serializers
from . import models


class AppointmentSerializer(serializers.ModelSerializer):
    """ serializer for appointment table """

    user = accounts_serializers.UserSerializer()
    doctor = medicine_serializers.DoctorsSerializer()
    service = medicine_serializers.ServiceSerializer()

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


