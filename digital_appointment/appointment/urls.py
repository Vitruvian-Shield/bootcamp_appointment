from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    # appointments
    path("", views.Appointments.as_view(), name='appointments'),
    path('<int:pk>/', views.AppointmentDetail.as_view(), name='appointment'),

]
