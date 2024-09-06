from django.contrib import admin
from . import models
from interaction.models import Comment

class CommentAdmin(admin.TabularInline):
    model = Comment
    extra = 1
@admin.register(models.Provider)
class ProviderAdmin(admin.ModelAdmin):
    inlines = [CommentAdmin]
    list_display = ('user','location', 'speciality')

admin.site.register(models.Service)
admin.site.register(models.Location)
