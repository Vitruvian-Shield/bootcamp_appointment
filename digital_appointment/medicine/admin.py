from django.contrib import admin
from .models import Service, Provider, Location


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration')


@admin.register(Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'specialty')


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('city', 'name')