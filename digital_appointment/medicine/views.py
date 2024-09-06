from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt import authentication
from django.db.models import Q
from django.db.models.manager import Manager
from interaction.models import Comment
from interaction.serializers import CommentSerializer
from . import models, serializers, pagination
from drf_spectacular.utils import extend_schema


class Provider(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    """for Compliance with access levels"""
    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAuthenticated()]
        elif self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return super().get_permissions()

    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['Provider'], responses=serializers.ProviderSerializer)
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
        search provider by input value
        """
        query = request.query_params.get("query")

        if query:
            providers = providers.filter(Q(user__first_name__icontains=query) |
                                         Q(user__last_name__icontains=query) |
                                         Q(speciality__icontains=query) |
                                         Q(location__name__icontains=query) |
                                         Q(location__address__icontains=query) |
                                         Q(location__city__icontains=query) |
                                         Q(location__state__icontains=query))
        """
        search provider with high or low satisfaction can be do it with 
        this code 
        """
        satisfaction = request.query_params.get("satisfaction")
        if satisfaction and satisfaction == 'high':
            providers = models.Provider.objects.order_by('-stars_average')
        elif satisfaction and satisfaction == 'low':
            providers = models.Provider.objects.order_by('stars_average')

        if isinstance(providers, Manager):
            providers = providers.all()

        paginator = pagination.ProviderLimitOffsetPagination()

        page = paginator.paginate_queryset(
            providers.order_by("-created_date"), request)
        serializer = serializers.ProviderSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = serializers.ProviderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProviderDetail(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        """Retrieve the provider object or raise a 404 error if not found."""
        return get_object_or_404(models.Provider, pk=pk)

    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['Provider'], responses=serializers.ProviderSerializer)
    def get(self, request, pk):
        """Handle GET requests to retrieve provider details along with comments."""
        provider = self.get_object(pk)
        comments = Comment.objects.filter(provider=provider)

        paginator = pagination.ProviderLimitOffsetPagination()
        paginated_comments = paginator.paginate_queryset(comments, request)

        serializer_comment = CommentSerializer(paginated_comments, many=True)
        serializer_provider = serializers.ProviderSerializer(provider)

        response_data = {
            'provider': serializer_provider.data,
            'comments': serializer_comment.data,
        }
        return paginator.get_paginated_response(response_data)


class SpecialtyListView(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['Specialty'], responses=serializers.SpecialitySerializer)
    def get(self, request):
        specialities = models.Provider.objects.values(
            'speciality').distinct()
        paginator = pagination.ProviderLimitOffsetPagination()
        page = paginator.paginate_queryset(specialities, request)

        serializer = serializers.SpecialitySerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class Location(APIView):
    """
    Location Api to interact with locations data
    """
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.AllowAny]
    """save Schema of api for guide other Distributor"""

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        elif self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return super().get_permissions()

    @extend_schema(tags=['Location'], responses=serializers.LocationSerializer)
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


class Service(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    """set access level for different action with this api"""

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.IsAuthenticated()]
        elif self.request.method == "POST":
            return [permissions.IsAdminUser()]
        return super().get_permissions()

    """save Schema of api for guide other Distributor"""

    @extend_schema(tags=['Service'], responses=serializers.ServiceSerializer)
    def get(self, request):
        services = models.Service.objects.all()
        serializer = serializers.ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = serializers.ServiceSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
