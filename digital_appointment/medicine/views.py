from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from django.db.models import Q
from .models import Service, Provider, Comment, Location
from . import serializers


class ProviderView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        providers = Provider.objects

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

        page = self.paginate_queryset(providers.order_by("-created_date"), request)
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
        specialities = Provider.objects.values('speciality').distinct()
        page = self.paginate_queryset(specialities, request)

        serializer = serializers.SpecialitySerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class ServiceListView(APIView):
    def get(self, request):
        services = Service.objects.all()
        serializer = serializers.ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LocationListView(APIView):
    def get(self, request):
        location = Location.objects.all()
        serializer = serializers.LocationSerializer(location, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class CommentView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, provider_id):
        comments = Comment.objects.filter(provider_id=provider_id, is_active=True)
        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, provider_id):
        data = request.data
        data['provider'] = provider_id 
        serializer = serializers.CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
