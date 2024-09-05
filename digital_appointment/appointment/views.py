from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, pagination
from rest_framework_simplejwt import authentication
from . import models, serializers
from medicine.models import Provider, Service

class AppointmentAdd(APIView):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        data = request.data.copy() 
        data["user"] = request.user.id
        
        provider_id = data.get("provider", None)
        if provider_id:
            try:
                provider = Provider.objects.get(pk=provider_id)
                data["provider"] = provider.id 
            except Provider.DoesNotExist:
                return Response({"status": "error: provider does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
        service = Service.objects.create(name=data["service"]["name"],description=data["service"]["description"])
        data["service"] = service.id
        
        serializer = serializers.AppointmentSerializer(data=data)
        if not models.Appointment.objects.filter(
            
    patient_first_name=data["patient_first_name"],
    patient_last_name=data["patient_last_name"],
    patient_phone_number=data["patient_phone_number"],
    user=data["user"],
    provider=data["provider"],
    patient_national_id=data["patient_national_id"]

        ).exists():
            if serializer.is_valid():
                serializer.save()  
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        service.delete()
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        appointments = models.Appointment.objects.filter(user=request.user)
        page = self.paginate_queryset(appointments.order_by("-created_date"), request)
        serializer = serializers.AppointmentSerializerGET(page, many=True)
        print(serializer.data)
        return self.get_paginated_response(serializer.data)

    
    def delete(self, request):
        appointment_id = request.data.get('id')
        if appointment_id:
            try:
                appointment = models.Appointment.objects.get(pk=appointment_id)
                if appointment.user == request.user:
                    appointment.delete()
                    return Response({"status": "deleted"}, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "not authorized"}, status=status.HTTP_403_FORBIDDEN)
            except models.Appointment.DoesNotExist:
                return Response({"status": "appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"status": "id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request):
        appointment_id = request.data.get('id')
        if appointment_id:
            try:
                appointment = models.Appointment.objects.get(pk=appointment_id)
                if appointment.user == request.user:
                    serializer = serializers.AppointmentSerializer(appointment, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"status": "not authorized"}, status=status.HTTP_403_FORBIDDEN)
            except models.Appointment.DoesNotExist:
                return Response({"status": "appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"status": "id is required"}, status=status.HTTP_400_BAD_REQUEST)
        

class DoctorAppointmentView(APIView, pagination.PageNumberPagination):
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        provider = None
        try:
            provider = request.user.provider
        except AttributeError:
            return Response({"status":"error:you are not Authorized as a Docotr."}, status=status.HTTP_401_UNAUTHORIZED)
        appointments = provider.appointments.all()
        page = self.paginate_queryset(appointments.order_by("-created_date"), request)
        serializer = serializers.AppointmentSerializerGET(page, many=True)
        
        return self.get_paginated_response(serializer.data)
