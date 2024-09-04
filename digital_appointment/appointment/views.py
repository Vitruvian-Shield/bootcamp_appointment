from . import models
from accounts.serializers import serializers
from medicine.models import Provider
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from . import serializers

class AppointmentView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        appointments = models.Appointment.objects.filter(user=request.user).order_by("-date")
        serializer = serializers.AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id

        provider_id = data.get("provider", None)
        if provider_id:
            try:
                data["provider"] = Provider.objects.get(pk=provider_id).id
            except Provider.DoesNotExist:
                return Response({"error": "Provider does not exist"}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        appointment_id = request.data.get('id')
        if not appointment_id:
            return Response({"error": "Appointment ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        appointment, error_response = self.get_appointment(appointment_id, request.user)
        if error_response:
            return error_response

        serializer = serializers.AppointmentSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        appointment_id = request.data.get('id')
        if not appointment_id:
            return Response({"error": "Appointment ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        appointment, error_response = self.get_appointment(appointment_id, request.user)
        if error_response:
            return error_response

        appointment.delete()
        return Response({"status": "deleted"}, status=status.HTTP_200_OK)