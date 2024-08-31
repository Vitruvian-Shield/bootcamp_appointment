from django.urls import path
from .views import Provider, SpecialtyListView, ServiceListView

urlpatterns = [
    path('provider/', Provider.as_view()),
    path('speciality/list/', SpecialtyListView.as_view()),
    path('services/', ServiceListView.as_view(), name='service-list'),
]
