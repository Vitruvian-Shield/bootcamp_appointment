from django.urls import path
from .views import Provider, SpecialtyListView, Location, ProviderDetail

urlpatterns = [
    path('provider/', Provider.as_view()),
    path('speciality/list/', SpecialtyListView.as_view()),
    path('locations/', Location.as_view()),
    path('ProviderDetail/<int:pk>/', ProviderDetail.as_view()),
]
