from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from django.db.models import Q
from django.db.models.manager import Manager
from . import models, serializers


class DoctorsView(APIView, pagination.PageNumberPagination):
    """Doctors view for read and create information"""

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        doctors = models.DoctorsModel.objects.all()

        speciality = request.query_params.get("speciality")
        if speciality:
            doctors = doctors.filter(speciality__icontains=speciality)

        location = request.query_params.get("location")
        if location:
            doctors = doctors.filter(
                Q(location__province__icontains=location) |
                Q(location__city__icontains=location)
            )

        if isinstance(doctors, Manager):
            doctors = doctors.all()

        page = self.paginate_queryset(
            doctors.order_by("-created_date"), request)
        serializer = serializers.DoctorsSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = serializers.DoctorsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SpecialtyListView(APIView, pagination.PageNumberPagination):
    """speciality view for read the doctors speciality information"""

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        specialities = models.DoctorsModel.objects.values('speciality').distinct()
        page = self.paginate_queryset(specialities, request)
        serializer = serializers.ServiceSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class DoctorProfileView(APIView):
    """doctor profile information"""

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        doctor = request.user
        serializer = serializers.DoctorsSerializer(doctor)
        return Response(serializer.data, status=status.HTTP_200_OK)
