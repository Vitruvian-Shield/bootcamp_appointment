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

        rate_min = request.query_params.get("rate_min")
        if rate_min:
            providers = providers.filter(rate__gte=rate_min)

        rate_max = request.query_params.get("rate_max")
        if rate_max:
            providers = providers.filter(rate__lte=rate_max)

        sorting = request.query_params.get("sorting")
        if sorting:
            if sorting == "name":
                providers = providers.order_by("name")
            elif sorting == "rate":
                providers = providers.order_by("rate")
            elif sorting == "created_date":
                providers = providers.order_by("created_date")
            else:
                providers = providers.order_by("-created_date")

        if isinstance(providers, Manager):
            providers = providers.all()

        page = self.paginate_queryset(providers, request)
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
        specialities = models.Provider.objects.values('speciality').distinct()
        page = self.paginate_queryset(specialities, request)

        serializer = serializers.SpecialitySerializer(page, many=True)
        return self.get_paginated_response(serializer.data)