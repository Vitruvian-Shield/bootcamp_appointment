from . import models
from . import serializers
from medicine.models import Provider
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework import permissions, pagination
from rest_framework_simplejwt import authentication


class Appointment(views.APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Returns a list of appointments for the authenticated user.
        """    
        appointments = models.Appointment.objects.filter(user=request.user).order_by("-date")
        page = self.paginate_queryset(appointments, request)
        serializer = serializers.AppointmentSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        """
        Creates a new appointment for the authenticated user.
        """
        data = request.data
        data["user"] = request.user
        
        # Validate provider ID
        provider_id = data.get("provider", None)
        if provider_id:
            try:
                data["provider"] = Provider.objects.get(pk=provider_id)
            except Provider.DoesNotExist:
                return Response({"error": "Provider does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Validate and save appointment data
        serializer = serializers.AppointmentSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request):
        """
        Updates an appointment by ID if it belongs to the authenticated user.
        """
        appointment_id = request.data.get('id')
        if not appointment_id:
            return Response({"error": "Appointment ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            appointment = models.Appointment.objects.get(pk=appointment_id)
        except models.Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

        if appointment.user != request.user:
            return Response({"error": "You are not authorized to update this appointment"}, status=status.HTTP_403_FORBIDDEN)

        serializer = serializers.AppointmentSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request):
        """
        Deletes an appointment by ID if it belongs to the authenticated user.
        """
        appointment_id = request.data.get('id')
        if not appointment_id:
            return Response({"error": "Appointment ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            appointment = models.Appointment.objects.get(pk=appointment_id)
        except models.Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

        if appointment.user != request.user:
            return Response({"error": "You are not authorized to delete this appointment"}, status=status.HTTP_403_FORBIDDEN)

        appointment.delete()
        return Response({"status": "deleted"}, status=status.HTTP_200_OK)
