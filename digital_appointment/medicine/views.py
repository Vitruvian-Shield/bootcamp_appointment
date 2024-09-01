from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from django.db.models import Q
from django.db.models.manager import Manager
from interaction.models import Comment
from interaction.serializers import CommentSerializer
from . import models, serializers
from drf_spectacular.utils import extend_schema

class Provider(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    @extend_schema(tags=['Provider'], responses= serializers.ProviderSerializer)
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
        """
        search provider with high satisfaction
       
        stars = request.query_params.get("stars")
        if stars:
            providers = providers.order_by('-stars_average')
         """

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


class ProviderSearch(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        providers = models.Provider.objects
        query = request.query_params.get("query")

        if query:
            providers = models.Provider.objects.filter(Q(first_name__icontains=query) |
                                                     Q(last_name__icontains=query) |
                                                     Q(speciality__icontains=query)|
                                                     Q(location__icontains=query) |
                                                     Q(location__address__icontains=query) |
                                                     Q(location__city__icontains=query) |
                                                     Q(location__state__icontains=query))
        """
        search provider with high or low satisfaction can be do it with 
        this code 
        
        high_satisfaction = request.query_params.get("high_satisfaction")
        if high_satisfaction:
            providers = models.Provider.objects.order_by('-stars_average')
        
        low_satisfaction = request.query_params.get("low_satisfaction")
        if low_satisfaction:
            results = models.Provider.objects.order_by('stars_average')
        """
        if isinstance(providers, Manager):
            providers = providers.all()

        page = self.paginate_queryset(providers.order_by('-stars_average'), request)
        serializer = serializers.ProviderSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

class ProviderDetail(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    @extend_schema(tags=['Provider'], responses= serializers.ProviderSerializer)
    def get_object(self, pk):
        """Retrieve the provider object or raise a 404 error if not found."""
        return get_object_or_404(models.Provider, pk=pk)
    def get(self, request, pk):
        """Handle GET requests to retrieve provider details along with comments."""
        provider = self.get_object(pk)
        comments = Comment.objects.filter(provider=provider)

        serializer_comment = CommentSerializer(comments, many=True)
        serializer_provider = serializers.ProviderSerializer(provider)

        response_data = {
            'provider': serializer_provider.data,
            'comments': serializer_comment.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)


class SpecialtyListView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    @extend_schema(tags=['Specialty'], responses= serializers.SpecialitySerializer)
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
    @extend_schema(tags=['Location'], responses= serializers.LocationSerializer)
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
