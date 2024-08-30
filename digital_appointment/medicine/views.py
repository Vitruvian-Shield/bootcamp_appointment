from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from django.db.models import Q
from django.db.models.manager import Manager
from . import models, serializers


class Provider(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        providers = models.Provider.objects

        speciality = request.query_params.get("speciality")
        if speciality:
            providers = providers.filter(speciality__icontains=speciality)

        location = request.query_params.get("location")
        if location:
            providers = providers.filter(
                Q(location__name__icontains=location) |
                Q(location__address__icontains=location) |
                Q(location__city__icontains=location) |
                Q(location__state__icontains=location)
            )

        if isinstance(providers, Manager):
            providers = providers.all()

        page = self.paginate_queryset(
            providers.order_by("-created_date"), request)
        serializer = serializers.ProviderSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        data = request.data
        serializer = serializers.ProviderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class SpecialtyListView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        specialities = models.Provider.objects.values(
            'speciality').distinct()
        page = self.paginate_queryset(specialities, request)

        serializer = serializers.SpecialitySerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class LocationApi(APIView):
    """
    Location Api to interact with locations data
    """
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        """
        get locations for select a provider
        """
        locations = models.Location.objects.all()
        serializer = serializers.LocationSerializer(locations, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        serializer.is_valid(raise_exception=True) this code for
        validate serializer and not different with code in line 43
        """
        data = request.data
        serializer = serializers.LocationSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
