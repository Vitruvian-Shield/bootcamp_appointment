from . import models
from . import serializers
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import permissions, pagination
from rest_framework_simplejwt import authentication


class Appointment(views.APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

            appointments = models.Appointment.objects.filter(user=request.user).order_by("-date")
            page = self.paginate_queryset(appointments, request)
            serializer = serializers.AppointmentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
