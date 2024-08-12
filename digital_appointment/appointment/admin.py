from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    """
    this for displaying appointments details and there attribute in DataBase
    """
    list_display = ('id', 'appointment_date', 'status', 'created_date', 'updated_date')
