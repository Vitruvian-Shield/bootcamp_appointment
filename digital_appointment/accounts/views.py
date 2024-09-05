from . import models
from rest_framework import views
from rest_framework import status
from . import serializers
from rest_framework import permissions, pagination
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from .serializers import LoginSerializer
import random

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer


class User(views.APIView, pagination.PageNumberPagination):
    def get(self, request):
        users = models.User.objects.all().order_by("-created_at")
        page = self.paginate_queryset(users, request)
        serializer = serializers.UserSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = serializers.UserSerializer(data=data)

        if serializer.is_valid():
            # Save the new user if validations pass
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)

        # Return validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(views.APIView):
    def get(self, request, pk):
        user = models.User.objects.get(id=pk)
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        user = models.User.objects.get(id=pk)
        data = request.data
        serializer = serializers.UserViewSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            user = models.User.objects.get(id=pk)
        except models.User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)


class ProfileView(views.APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


MyUser = get_user_model()

class SendCodeView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        try:
            user = MyUser.objects.get(phone_number=phone_number)
            # Generate a code (a random 4-digit number)
            code = str(random.randint(1000, 9999))
            user.code = code
            user.save()
            # Print the code to the console for testing
            print(f"Verification code for {phone_number} is: {code}")
            return Response({"success": "Code sent (check console)!"})
        except ObjectDoesNotExist:
            return Response({"error": "Phone number not registered."}, status=400)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            user.code = str(random.randint(1000, 9999))
            user.save()
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=400)
