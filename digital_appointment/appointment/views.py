from . import models
from accounts.serializers import serializers
from medicine.models import Provider
from .forms import AppointmentCommentForm
from .models import Appointment, AppointmentComment
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from . import serializers
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

class AppointmentView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        appointments = models.Appointment.objects.filter(user=request.user).order_by("-date")
        serializer = serializers.AppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id

        provider_id = data.get("provider", None)
        if provider_id:
            try:
                data["provider"] = Provider.objects.get(pk=provider_id).id
            except Provider.DoesNotExist:
                return Response({"error": "Provider does not exist"}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.AppointmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        appointment_id = request.data.get('id')
        if not appointment_id:
            return Response({"error": "Appointment ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        appointment, error_response = self.get_appointment(appointment_id, request.user)
        if error_response:
            return error_response

        serializer = serializers.AppointmentSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        appointment_id = request.data.get('id')
        if not appointment_id:
            return Response({"error": "Appointment ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        appointment, error_response = self.get_appointment(appointment_id, request.user)
        if error_response:
            return error_response

        appointment.delete()
        return Response({"status": "deleted"}, status=status.HTTP_200_OK)
    



    @login_required
    def comment_appointment(request, appointment_id):
        appointment = Appointment.objects.get(id=appointment_id)
        if request.method == 'POST':
            form = AppointmentCommentForm(request.POST)
            if form.is_valid():
                comment = form.save(commit=False)
                comment.appointment = appointment
                comment.save()
                return redirect('appointment_detail', appointment_id=appointment_id)
        else:
            form = AppointmentCommentForm()
        return render(request, 'comment_appointment.html', {'form': form, 'appointment': appointment})    