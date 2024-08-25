from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    # locations
    path("location/", views.Locations.as_view(), name='locations'),
    path('location/<int:pk>/', views.LocationDetail.as_view(), name='location'),
    # providers
    path("provider/", views.Providers.as_view(), name='providers'),
    path('provider/<int:pk>/', views.ProviderDetail.as_view(), name='provider'),
    # services
    path("service/", views.Services.as_view(), name='services'),
    path('service/<int:pk>/', views.ServiceDetail.as_view(), name='service'),
]
