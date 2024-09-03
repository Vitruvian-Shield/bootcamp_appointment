from rest_framework.decorators import api_view
from rest_framework.views import APIView
from . import models
from django.http import JsonResponse
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from rest_framework import permissions, pagination
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_spectacular.utils import extend_schema
#from allauth.socialaccount.providers.oauth2.client import OAuth2Client
#from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
#from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from django.contrib.auth import login
import requests

""" 
this code is base google authenticate way
but i write my api for auth because this
way access to us test login or signup with
this method without need react app

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://127.0.0.1:8000/api/accounts/auth/google/callback/'
    client_class = OAuth2Client
    """

@api_view(['GET'])
def google_callback(request):
    """
    the get api for authenticate with google way
    and do login if have exist account or signup
    if we havent account in one api
    """
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'error': 'No code provided'}, status=400)
    """google token for get access token and work with AUTHORIZATION_CODE"""
    token_url = 'https://oauth2.googleapis.com/token'
    data = {
        'code': code,
        'client_id': settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri': 'http://127.0.0.1:8000/api/accounts/auth/google/callback/',
        'grant_type': 'authorization_code',
    }
    response = requests.post(token_url, data=data)
    response_data = response.json()

    access_token = response_data.get("access_token")
    if not access_token:
        return JsonResponse({'error': 'Failed to obtain access token'}, status=400)
    """get me userinfo for every action we need it occur in database"""
    user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
    user_info_response = requests.get(user_info_url, headers={'Authorization': f'Bearer {access_token}'})
    user_info = user_info_response.json()
    user, created = models.User.objects.get_or_create(
        username=user_info['email'],
        email=user_info['email'],
    )
    if created:
        user.set_unusable_password()
        user.save()
    login(request, user)
    return Response({'message': 'Signup/Login successful', 'user': {'username': user.username, 'email': user.email}},
                    status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer


class User(views.APIView, pagination.PageNumberPagination):
    @extend_schema(tags=['User'], responses=serializers.UserSerializer)
    def get(self, request):
        users = models.User.objects.all().order_by("-created_at")

        page = self.paginate_queryset(users, request)
        serializer = serializers.UserSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = serializers.UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(views.APIView):
    @extend_schema(tags=['User'], responses=serializers.UserSerializer)
    def get(self, request, pk):
        user = models.User.objects.get(id=pk)
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        user = models.User.objects.get(id=pk)
        data = request.data
        serializer = serializers.UserSerializer(user, data=data)
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

    @extend_schema(tags=['User'], responses=serializers.UserSerializer)
    def get(self, request):
        user = request.user
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
