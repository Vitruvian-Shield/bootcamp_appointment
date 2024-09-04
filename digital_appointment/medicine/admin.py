from django.contrib import admin
from . import models


admin.site.register(models.Service)
admin.site.register(models.Provider)
admin.site.register(models.Location)