from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt import authentication
from . import serializers, models


class Comment(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = serializers.CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)