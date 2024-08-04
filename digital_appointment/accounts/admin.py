from django.contrib import admin
from . import models

admin.site.register(models.User)


@admin.register(models.Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'provider_id', 'service_id', 'status', 'appointment_date')


@admin.register(models.Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration')


@admin.register(models.Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'specialty')