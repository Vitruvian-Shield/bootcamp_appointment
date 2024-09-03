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
        appointments = Appointment.objects.filter(user=request.user).order_by("-created_date")
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

class AppointmentCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user_info = {'pk': request.user.pk,
                     'email': request.user.email,
                     'username': request.user.username,
                     'first_name': request.user.first_name,
                     'last_name': request.user.last_name,
                     'phone_number': request.user.phone_number
                     }
        return Response(data=user_info, status=status.HTTP_200_OK)
