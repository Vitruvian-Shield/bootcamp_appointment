from rest_framework import serializers
import string
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters')

        if not any(char in string.ascii_uppercase for char in value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter")

        if not any(char in string.ascii_lowercase for char in value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter")

        if not any(char in string.digits for char in value):
            raise serializers.ValidationError("Password must contain at least one digit")

        return value

    def update(self, instance, validated_data):
        password = validated_data.pop('password')
        if password:
            instance.set_password(password)
            return super().update(instance, validated_data)