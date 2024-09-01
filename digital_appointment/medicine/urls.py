from django.urls import path
from .views import Provider, SpecialtyListView, CityListView

urlpatterns = [
    path('provider/', Provider.as_view(), name="provider-list"),
    path('speciality/list/', SpecialtyListView.as_view(), name="speciality-list"),
    path('locations/', CityListView.as_view(), name='location-list'),
]
