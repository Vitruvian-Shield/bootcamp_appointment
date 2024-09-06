from datetime import datetime
from django.core.cache import cache
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from . import models
from django.http import JsonResponse
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from . import serializers, utils
from rest_framework import permissions, pagination
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from drf_spectacular.utils import extend_schema
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from dj_rest_auth.registration.views import SocialLoginView
from django.conf import settings
from django.contrib.auth import login, authenticate
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


class GoogleAuthInit(APIView):
    """
    with this api front developer can use
    google authenticate very easy
    """

    def post(self, request):
        google_auth_url = (
                "https://accounts.google.com/o/oauth2/v2/auth"
                "?redirect_uri=http://127.0.0.1:8000/api/accounts/auth/google/callback/"
                "&prompt=consent"
                "&response_type=code"
                "&client_id=" + settings.GOOGLE_CLIENT_ID +
                "&scope=openid%20email%20profile"
                "&access_type=offline"
        )
        return Response(google_auth_url)


class GoogleCallback(APIView):
    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['GoogleAuth'])
    def get(self, request):
        """
          the get api for authenticate with google way
          and do login if have exist account or signup
          if we have an account in one api
          """
        code = request.GET.get('code')
        if not code:
            return Response({'error': 'No code provided'}, status=400)
        """google token for get access token and work with AUTHORIZATION_CODE"""
        token_url = 'https://oauth2.googleapis.com/token'
        data = {
            'code': code,
            'client_id': settings.GOOGLE_CLIENT_ID,
            'client_secret': settings.GOOGLE_CLIENT_SECRET,
            'redirect_uri': 'http://127.0.0.1:8000/api/accounts/auth/google/callback/',
            'grant_type': 'authorization_code',
        }
        try:
            response = requests.post(token_url, data=data)
        except requests.RequestException as e:
            return Response({'error': str(e),'message':'please try again now with better internet'}, status=400)
        response_data = response.json()
        access_token = response_data.get("access_token")
        if not access_token:
            return Response({'error': 'Failed to obtain access token','message':'please try again now with better internet'}, status=400)
        """get me userinfo for every action we need it occur in database"""
        user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
        try:
            user_info_response = requests.get(user_info_url, headers={'Authorization': f'Bearer {access_token}'})
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=400)
        user_info = user_info_response.json()
        user, created = models.User.objects.get_or_create(
            username=user_info['email'],
            email=user_info['email'],
            first_name=user_info['given_name'],
            last_name=user_info['family_name'],

        )
        if created:
            user.set_unusable_password()
            user.is_active = True
            user.save()
        login(request, user)
        """build jwt token for access user"""
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            'message': 'Signup/Login successful',
            'user': {'username': user.username, 'email': user.email},
            'tokens': {
                'refresh': str(refresh),
                'access': access_token,
            }
        }, status=status.HTTP_200_OK)


class SmsAuthentication(APIView):
    """
    generate authentication code for select mobile number
    """
    permission_classes = [permissions.AllowAny]
    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['sms'], responses=serializers.SmsSerializer)
    def post(self, request):
        serializer_data = serializers.SmsSerializer(request.data)
        mobile = serializer_data.mobile
        """send sms message with auth code"""
        response = utils.send_quick_otp(mobile)
        if response is not None:
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Failed to send quick otp'}, status=status.HTTP_400_BAD_REQUEST)


class VerifyCodeSmsAuthentication(APIView):
    """
    verify mobile number with code stored in cache
    """
    permission_classes = [permissions.AllowAny]
    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['sms'], responses=serializers.SmsSerializer)
    def post(self, request):
        serializer_data = serializers.SmsSerializer(request.data)
        code = serializer_data.code
        mobile = serializer_data.mobile
        if not code:
            """compare user code send with code in cache"""
            if utils.verify_sms_code(mobile, code):
                user, created = models.User.objects.get_or_create(
                    username=mobile,
                    phone_number=mobile,
                )
                if created:
                    user.set_unusable_password()
                    user.is_active = True
                    user.save()

                login(request, user)
                """build jwt token for access user"""
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                return Response({
                    'message': 'Signup/Login successful',
                    'user': {'username': user.username, 'email': user.email},
                    'tokens': {
                        'refresh': str(refresh),
                        'access': access_token,
                    }
                }, status=status.HTTP_200_OK)
        return Response({'error': 'Failed to send quick otp'}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer


class LogOutViewWithToken(APIView):
    """logout class view for expire token"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            for token in request.user.tokens.all():
                BlacklistedToken.objects.create(token=token)
            return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class User(views.APIView, pagination.PageNumberPagination):
    """save Schema of api for guide other Distributor"""

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
    """save Schema of api for guide other Distributor"""

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
    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['User'], responses=serializers.UserSerializer)
    def get(self, request):
        user = request.user
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
