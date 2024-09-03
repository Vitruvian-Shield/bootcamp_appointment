from rest_framework.views import APIView
from rest_framework import pagination, permissions
from rest_framework_simplejwt import authentication
from . import models
from .serializers import CommentSerializer, AppointmentSerializer
from rest_framework.response import Response
from rest_framework import status


class AppointmentView(APIView, pagination.PageNumberPagination):
    """ API for appointment """
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentsView(APIView, pagination.PageNumberPagination):
    """ API for comments """

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        comments = models.CommentsModel.objects.all()

        doctor = request.query_params.get('doctor')
        if doctor:
            comments = comments.filter(doctor__icontains=doctor)

        page = self.paginate_queryset(comments.order_by("-created"), request)
        serializer = CommentSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
