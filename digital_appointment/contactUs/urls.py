from django.urls import path
from .views import ContactUsView

urlpatterns = [
    path('contactUs/', ContactUsView.as_view()),
]
