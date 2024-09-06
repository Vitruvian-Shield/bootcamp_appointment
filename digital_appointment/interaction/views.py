from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt import authentication
from . import serializers, models
from drf_spectacular.utils import extend_schema


class Comment(APIView):
    """
    save patient comment about provider
    """
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [IsAuthenticated]
    """save Schema of api for guide other Distributor"""
    @extend_schema(tags=['Comments'], responses=serializers.CommentSerializer)
    def post(self, request):
        serializer = serializers.CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)