from django.urls import path
from . import views

urlpatterns = [
    path("reserve/", views.AppointmentAdd.as_view()),
    path("",view=views.AppointmentView.as_view(), name="appointment"),
    path("dr/", view=views.DoctorAppointmentView.as_view())
]
