from django.urls import path
from .views import CommentsView, AppointmentView, DeleteAppointmentView


urlpatterns = [
    path('comments/', CommentsView.as_view()),
    path('appointment/', AppointmentView.as_view()),
    path('appointment/delete/<int:pk>/', DeleteAppointmentView.as_view()),
]
