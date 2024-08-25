from django.db.migrations import serializer

from . import models
from . import serializers
from rest_framework import views, status, permissions, pagination
from rest_framework.response import Response
from rest_framework_simplejwt import authentication


# Locations
class Locations(views.APIView, pagination.PageNumberPagination):
    """ location model serializer and paginator and response """

    def get(self, request):
        """ getting all locations

        Returns:
            all locations

        """
        locations = models.Location.objects.all().order_by('-created_date')

        page = self.paginate_queryset(locations, request)
        serializer = serializers.LocationSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        """ creating a new location """
        data = request.data
        serializer = serializers.LocationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LocationDetail(views.APIView, pagination.PageNumberPagination):
    """ specific location model serializer and response """

    def get(self, request, pk):
        """ getting specific location detail

        Args:
            location id
        Returns:
            specific location detail

        """
        location = models.Location.objects.get(id=pk)

        serializer = serializers.LocationSerializer(location)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """ updating specific location detail

        Args:
            location id

        """
        location = models.Location.objects.get(id=pk)
        data = request.data
        serializer = serializers.LocationSerializer(location, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """ deleting specific location

        Args:
            location id

        """
        try:
            location = models.Location.objects.get(id=pk)
        except models.Location.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        location.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)


# Providers
class Providers(views.APIView, pagination.PageNumberPagination):
    """ provider model serializer and paginator and response """

    def get(self, request):
        """ getting all providers

        Returns:
            all providers

        """
        providers = models.Provider.objects.all().order_by('-created_date')

        page = self.paginate_queryset(providers, request)
        serializer = serializers.ProviderSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        """ creating a new provider """
        data = request.data
        serializer = serializers.ProviderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProviderDetail(views.APIView, pagination.PageNumberPagination):
    """ specific provider model serializer and response """

    def get(self, request, pk):
        """ getting specific provider detail

        Args:
            providers id
        Returns:
            specific provider detail

        """
        provider = models.Provider.objects.get(id=pk)

        serializer = serializers.ProviderSerializer(provider)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """ updating specific provider detail

        Args:
            provider id

        """
        provider = models.Provider.objects.get(id=pk)
        data = request.data
        serializer = serializers.ProviderSerializer(provider, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """ deleting specific provider

        Args:
            provider id

        """
        try:
            provider = models.Provider.objects.get(id=pk)
        except models.Provider.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        provider.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)


# Services
class Services(views.APIView, pagination.PageNumberPagination):
    """ service model serializer and paginator and response """

    def get(self, request):
        """ getting all services

        Returns:
            all services

        """
        services = models.Service.objects.all().order_by('-created_date')

        page = self.paginate_queryset(services, request)
        serializer = serializers.ServiceSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        """ creating a new service """
        data = request.data
        serializer = serializers.ServiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServiceDetail(views.APIView, pagination.PageNumberPagination):
    """ specific service model serializer and response """

    def get(self, request, pk):
        """ getting specific service detail

        Args:
            service id
        Returns:
            specific service detail

        """
        service = models.Service.objects.get(id=pk)

        serializer = serializers.ServiceSerializer(service)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        """ updating specific service detail

        Args:
            service id

        """
        service = models.Service.objects.get(id=pk)
        data = request.data
        serializer = serializers.ServiceSerializer(service, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """ deleting specific service

        Args:
            service id

        """
        try:
            service = models.Service.objects.get(id=pk)
        except models.Service.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        service.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
