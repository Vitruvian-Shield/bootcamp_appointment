from django.contrib import admin
from .models import Service, Location, Provider

# Register your models here.


admin.site.register(Service)
admin.site.register(Location)
admin.site.register(Provider)
