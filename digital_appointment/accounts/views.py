from . import models
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from rest_framework import permissions, pagination
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    

class LoginCode(views.APIView):
    def post(self, request):
        print("hello")
        phone_number = request.data["phone_number"]
        try:
            user = models.User.objects.get(phone_number=phone_number)
            models.ConfirmCode(user=user).save()
            return Response({"status": "code sent."}, status=status.HTTP_200_OK)
            
        except:
            return Response({"status": "error:phone number not found."}, status=status.HTTP_404_NOT_FOUND)


class Login(views.APIView):
    def post(self, request):
        phone_number = request.data["phone_number"]
        code = request.data["code"]
        try:
            user = models.User.objects.get(phone_number=phone_number)
            code_ = models.ConfirmCode.get_code(user)
            if code == code_:
                data = get_tokens_for_user(user)
                data["is_doctor"] = False
                if user.provider.pk:
                    data["is_doctor"] = True
                    
                
                print(data)
                return Response(data, status=status.HTTP_200_OK)
            
        except:
            return Response({"status": "error:invalid input."}, status=status.HTTP_404_NOT_FOUND)


class User(views.APIView):
    
    # def get(self, request):
    #     users = models.User.objects.all().order_by("-created_at")

    #     page = self.paginate_queryset(users, request)
    #     serializer = serializers.UserSerializer(page, many=True)
    #     return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = serializers.UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserNameIsAvalable(views.APIView):
    def post(self, request, username=None):
        if models.User.objects.filter(username=username).exists():
            return Response({"status":"bad"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"status":"ok"}, status=status.HTTP_200_OK)
        
        
class EmailIsAvalable(views.APIView):
    def post(self, request, email=None):
        if models.User.objects.filter(email=email).exists():
            return Response({"status":"bad"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"status":"ok"}, status=status.HTTP_200_OK)
    
    
class UserDetail(views.APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        
        user = request.user
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        data = request.data
        print(data)
        serializer = serializers.UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
      
        request.user.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
    