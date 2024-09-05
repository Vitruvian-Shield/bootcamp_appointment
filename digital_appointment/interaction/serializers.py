from rest_framework import serializers
from accounts.models import User
from medicine.models import Provider
from .models import Comment
from accounts.serializers import UserSerializer
from medicine.serializers import ProviderSerializer


class CommentSerializer(serializers.ModelSerializer):
    provider = ProviderSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    provider_id = serializers.PrimaryKeyRelatedField(
        queryset=Provider.objects.all(),
        source='provider',
        write_only=True,
    )
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
        write_only=True,
    )

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)
