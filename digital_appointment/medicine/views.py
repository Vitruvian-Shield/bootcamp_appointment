from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from . import models, serializers


class Provider(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        speciality = request.query_params.get("speciality")
        if speciality:
            providers = models.Provider.objects.filter(speciality=speciality)
        else:
            providers = models.Provider.objects.all()

        page = self.paginate_queryset(
            providers.order_by("-created_date"), request)
        serializer = serializers.ProviderSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = serializers.ProviderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SpecialtyListView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        specialities = models.Provider.objects.values_list(
            'speciality', flat=True).distinct()
        page = self.paginate_queryset(specialities)
        serializer = serializers.ProviderSerializer(page, many=True)
        return Response(self.get_paginated_response(serializer.data))
