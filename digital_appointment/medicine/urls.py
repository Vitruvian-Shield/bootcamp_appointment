from django.urls import path
from .views import Provider, SpecialtyListView, LocationApi

urlpatterns = [
    path('provider/', Provider.as_view()),
    path('speciality/list/', SpecialtyListView.as_view()),
    path('locations/', LocationApi.as_view())
]
