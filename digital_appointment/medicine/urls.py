from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [
    # locations
    path("location/", views.Locations.as_view(), name='locations'),
    path('location/<int:pk>/', views.LocationDetail.as_view(), name='location'),
]
