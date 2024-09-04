from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework_simplejwt import authentication
from . import serializers
from .models import Appointment
from django.db.models import Q

class AppointmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.JWTAuthentication]

    def post(self, request):
        serializer = serializers.AppointmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        validate_appointment = Appointment.objects.filter(user=request.user)
        serializer = serializers.AppointmentSerializer(validate_appointment, many=True)
        return Response(serializer.data)

