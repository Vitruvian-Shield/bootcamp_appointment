from django.db.migrations import serializer

from . import models
from . import serializers
from rest_framework import views, status, permissions, pagination
from rest_framework.response import Response
from rest_framework_simplejwt import authentication


# Appointments
class Appointments(views.APIView, pagination.PageNumberPagination):
    """ appointment model serializer and paginator and response """

    def get(self, request):
        """ getting all appointments

        Returns:
            all appointments

        """
        appointments = models.Appointment.objects.all().order_by('-created_date')

        page = self.paginate_queryset(appointments, request)
        serializer = serializers.AppointmentSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        """ creating a new appointment """
        data = request.data
        serializer = serializers.AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentDetail(views.APIView, pagination.PageNumberPagination):
    """ specific appointment model serializer and response """

    def get(self, request, pk):
        """ getting specific appointment detail

        Args:
            appointment id
        Returns:
            specific appointment detail

        """
        appointment = models.Appointment.objects.get(id=pk)

        serializer = serializers.AppointmentSerializer(appointment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """ updating specific appointment detail

        Args:
            appointment id

        """
        appointment = models.Appointment.objects.get(id=pk)
        data = request.data
        serializer = serializers.AppointmentSerializer(appointment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """ deleting specific appointment

        Args:
            appointment id

        """
        try:
            appointment = models.Appointment.objects.get(id=pk)
        except models.Appointment.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        appointment.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
