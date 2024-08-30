from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from . import models, serializers
from medicine.models import Provider

class AppointmentView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        appointments = models.Appointment.objects.filter(user=request.user)
        page = self.paginate_queryset(appointments.order_by("-created_date"), request)
        serializer = serializers.AppointmentSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        data["user"] = request.user
        provider_id = data.get("provider",None)
        if provider_id:
            try:
                 data["provider"] = Provider.objects.get(pk=provider_id)
            except Provider.DoesNotExist:
                return Response({"error":"provider does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.AppointmentSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        appointment_id = request.data.get('id')
        if appointment_id:
            try:
                appointment = models.Appointment.objects.get(pk=appointment_id)
                if appointment.user == request.user:
                    appointment.delete()
                    return Response({"status": "deleted"}, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "not authorized"}, status=status.HTTP_403_FORBIDDEN)
            except models.Appointment.DoesNotExist:
                return Response({"status": "appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"status": "id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request):
        appointment_id = request.data.get('id')
        if appointment_id:
            try:
                appointment = models.Appointment.objects.get(pk=appointment_id)
                if appointment.user == request.user:
                    serializer = serializers.AppointmentSerializer(appointment, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"status": "not authorized"}, status=status.HTTP_403_FORBIDDEN)
            except models.Appointment.DoesNotExist:
                return Response({"status": "appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"status": "id is required"}, status=status.HTTP_400_BAD_REQUEST)