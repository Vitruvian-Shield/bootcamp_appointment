from rest_framework.views import APIView
from rest_framework import pagination, permissions
from rest_framework_simplejwt import authentication
from . import models
from .serializers import CommentSerializer, AppointmentSerializer
from rest_framework.response import Response
from rest_framework import status


class AppointmentView(APIView, pagination.PageNumberPagination):
    """ API for appointment """
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        doctor_id = request.user.id
        appointments = models.AppointmentModel.objects.filter(doctor_id=doctor_id)
        serializer = AppointmentSerializer(appointments, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            appointment = models.AppointmentModel.objects.get(id=pk)
        except models.AppointmentModel.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        appointment.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)


class CommentsView(APIView, pagination.PageNumberPagination):
    """ API for comments """

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        comments = models.CommentsModel.objects.all()

        doctor = request.query_params.get('doctor')
        if doctor:
            comments = comments.filter(doctor__icontains=doctor)

        page = self.paginate_queryset(comments.order_by("-created"), request)
        serializer = CommentSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
