from django.contrib import admin
from . import models

@admin.register(models.Provider)
class ProviderAdmin(admin.ModelAdmin):
    list_display = ('user', 'speciality')


admin.site.register(models.Service)
admin.site.register(models.Location)


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'body', 'provider', 'created_on', 'is_active')
    list_filter = ('is_active', 'created_on')
    search_fields = ('name', 'email', 'body')
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(active=True)
