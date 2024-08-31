from django.urls import path
from .views import Provider, SpecialtyListView, CityListView

urlpatterns = [
    path('provider/', Provider.as_view()),
    path('speciality/list/', SpecialtyListView.as_view()),
    path('locations/', CityListView.as_view(), name='location-list'),
]