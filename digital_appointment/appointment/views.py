from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.pagination import PageNumberPagination


class AppointmentListView(APIView, PageNumberPagination):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        appointments = Appointment.objects.all()
        page = self.paginate_queryset(appointments.order_by("-created_date"), request)
        serializer = AppointmentSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class AppointmentCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
