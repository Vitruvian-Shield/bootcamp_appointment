from django.urls import path
from .views import DoctorsView, SpecialtyListView, DoctorProfileView, DoctorTokenObtainPairView

urlpatterns = [
    path('doctors/', DoctorsView.as_view()),
    path('speciality/list/', SpecialtyListView.as_view()),
    path('doctorprofile/', DoctorProfileView.as_view()),
    path("doctor/token/", DoctorTokenObtainPairView.as_view(), name="doctor_token_obtain_pair"),

]
