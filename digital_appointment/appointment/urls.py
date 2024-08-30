from django.urls import path
from . import views

urlpatterns = [
    path("/",view=views.AppointmentView.as_view(), name="appointment"),
]
