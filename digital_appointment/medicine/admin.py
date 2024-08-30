from django.contrib import admin
from . import models
from interaction.models import Comment


@admin.register(models.Provider)
class ProviderAdmin(admin.ModelAdmin):

    list_display = ('user','location', 'speciality')

admin.site.register(models.Service)
admin.site.register(models.Location)
