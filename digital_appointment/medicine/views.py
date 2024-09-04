from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from django.db.models import Q
from django.db.models.manager import Manager
from . import models, serializers
from django.contrib.auth.decorators import user_passes_test


class CityListView(APIView):
    def get(self, request):
        search_query = request.query_params.get('search', '').lower()
        locations = models.Location.objects.all()  # Query the Location model

        if search_query:
            locations = locations.filter(city__icontains=search_query)  # Filter directly on the locations queryset

        # Get distinct cities
        cities = locations.values('city', 'state').distinct()

        return Response(cities, status=status.HTTP_200_OK)


class Provider(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        providers = models.Provider.objects.all()
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

        # Pagination
        page = self.paginate_queryset(providers.order_by("-created_date"), request)
        serializer = serializers.ProviderSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @user_passes_test(lambda u: u.is_superuser)
    def post(self, request):
        serializer = serializers.ProviderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def add_rating_to_provider(request, provider_id):
        new_rating = float(request.data.get('rating'))

        try:
            provider = Provider.objects.get(id=provider_id)
            provider.update_rating(new_rating)
            return Response({"message": "Rating updated successfully!"}, status=status.HTTP_200_OK)
        except Provider.DoesNotExist:
            return Response({"error": "Provider not found"}, status=status.HTTP_404_NOT_FOUND)


class SpecialtyListView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        specialities = models.Provider.objects.values(
            'speciality').distinct()
        page = self.paginate_queryset(specialities, request)

        serializer = serializers.SpecialitySerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class ProviderDetail(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, provider_id):
        print("something")
        if provider_id is None:
            return Response({"detail": "Provider ID is required."}, status=400)
        try:
            provider = models.Provider.objects.get(pk=provider_id)
            serializer = serializers.ProviderSerializer(provider)
            print(serializer.data)
            return Response(serializer.data)
            return 
        except models.Provider.DoesNotExist:
            return Response({"detail": "Provider not found"}, status=404)
        

        
        
