from django.contrib import admin
from . import models


admin.site.register(models.ServiceModel)
admin.site.register(models.DoctorsModel)
admin.site.register(models.LocationModel)
