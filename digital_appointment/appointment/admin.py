from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'provider_id', 'service_id', 'status', 'appointment_date')
