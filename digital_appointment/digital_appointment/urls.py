from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/appointment/', include('appointment.urls')),
    path('api/medicine/', include('medicine.urls')),
    path('api/contactUs/', include('contactUs.urls')),
]
