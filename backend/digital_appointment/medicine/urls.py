from django.urls import path
from .views import Provider, SpecialtyListView, CityListView, ProviderDetail

urlpatterns = [
    path('provider/', Provider.as_view(), name="provider-list"),
    path('provider/<int:provider_id>/', ProviderDetail.as_view(), name="provider-detail"),
    path('speciality/list/', SpecialtyListView.as_view(), name="speciality-list"),
    path('locations/', CityListView.as_view(), name='location-list'),
]
