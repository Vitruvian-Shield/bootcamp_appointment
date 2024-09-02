from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from . import serializers


class ContactUsView(APIView, pagination.PageNumberPagination):
    """contact us view: create users comments in database"""
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = serializers.ContactUsSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
