from django.urls import path
from .views import Provider, SpecialtyListView, Location, ProviderDetail,Service

urlpatterns = [
    path('provider/', Provider.as_view(), name='provider'),
    path('speciality/list/', SpecialtyListView.as_view(), name='speciality'),
    path('locations/', Location.as_view(), name='location'),
    path('ProviderDetail/<int:pk>/', ProviderDetail.as_view(), name='ProviderDetail'),
    path('Service/', Service.as_view(), name='Service'),
]
