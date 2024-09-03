from django.urls import path
from .views import CommentsView, AppointmentView


urlpatterns = [
    path('comments/', CommentsView.as_view()),
    path('appointment/', AppointmentView.as_view()),
]
