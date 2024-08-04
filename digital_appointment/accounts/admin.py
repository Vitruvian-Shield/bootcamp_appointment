from django.contrib import admin
from . import models

admin.site.register(models.User)


@admin.register(models.Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'provider_id', 'service_id', 'status', 'appointment_date')