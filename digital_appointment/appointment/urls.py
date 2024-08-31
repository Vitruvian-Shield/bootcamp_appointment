from django.urls import path
from . import views

urlpatterns = [
    path("reservaion/<str:provider>/", views.AppointmentAdd.as_view()),
    path("",view=views.AppointmentView.as_view(), name="appointment"),
]
