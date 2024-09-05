from django.urls import path
from . import views

app_name = 'appointment'
urlpatterns = [
    path('list/', views.AppointmentListView.as_view(), name='appointment_list'),
    path('create/', views.AppointmentCreateView.as_view(), name='appointment_create'),
]
