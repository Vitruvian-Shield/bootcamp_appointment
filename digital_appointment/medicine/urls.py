from django.urls import path
from .views import DoctorsView, SpecialtyListView, DoctorProfileView

urlpatterns = [
    path('doctors/', DoctorsView.as_view()),
    path('speciality/list/', SpecialtyListView.as_view()),
    path('doctorprofile/', DoctorProfileView.as_view()),
]
