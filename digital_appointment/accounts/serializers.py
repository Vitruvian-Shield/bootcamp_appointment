from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models
import string


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """json web token serializer"""

    username_field = 'username'

    def validate(self, attrs):
        username = attrs.get('username', None)

        if '@' in username:
            self.username_field = 'email'
        elif username.isdigit():
            self.username_field = 'phone_number'
        else:
            self.username_field = 'username'

        if self.username_field != 'username':
            username = models.User.objects.filter(
                **{self.username_field: username}
            ).values_list('username', flat=True).first()
            self.username_field = 'username'
            attrs['username'] = username

        data = super().validate(attrs)
        return data


class UserSerializer(serializers.ModelSerializer):
    """User model serializer: Convert data to json"""
    class Meta:
        model = models.User
        exclude = ('is_superuser', 'is_staff', 'is_active', 'is_admin')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")

        if not any(char in string.ascii_uppercase for char in value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter")

        if not any(char in string.ascii_lowercase for char in value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter")

        if not any(char in string.digits for char in value):
            raise serializers.ValidationError("Password must contain at least one digit")

        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = models.User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        return super().update(instance, validated_data)


