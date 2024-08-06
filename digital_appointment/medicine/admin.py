from django.contrib import admin
from .models import Provider, Service, Location


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    """
    this for displaying the Provider model and there attribute in DataBase
    """
    list_display = ('id', 'user', 'location', 'specialty', 'created_at', 'updated_at')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    """
        this for displaying the Service model and there attribute in DataBase
    """
    list_display = ('id', 'name', 'duration', 'price', 'created_at', 'updated_at')


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass
