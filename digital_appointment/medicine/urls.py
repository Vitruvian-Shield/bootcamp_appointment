from django.urls import path
from .views import ProviderView, SpecialtyListView, ServiceListView, CommentView, LocationListView

urlpatterns = [
    path('provider/', ProviderView.as_view()),
    path('speciality/list/', SpecialtyListView.as_view()),
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('provider/<int:provider_id>/comments/', CommentView.as_view(), name='comment-list-create'),
    path('location/', LocationListView.as_view(), name='location-list')
]
