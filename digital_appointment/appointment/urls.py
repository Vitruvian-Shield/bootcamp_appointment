from . import views
from django.urls import path

urlpatterns = [
    path("appointments/", views.AppointmentView.as_view()),
]
