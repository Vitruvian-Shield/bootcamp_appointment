from django.urls import path
from .views import DoctorsView, SpecialtyListView

urlpatterns = [
    path('doctors/', DoctorsView.as_view()),
    path('speciality/list/', SpecialtyListView.as_view())
]
