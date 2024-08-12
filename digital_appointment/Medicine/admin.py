from django.contrib import admin
from .models import Locations, Services, Providers

# register tables for admin page
admin.site.register( Locations)
admin.site.register( Services)
admin.site.register( Providers)
