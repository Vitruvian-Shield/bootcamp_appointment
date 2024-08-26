from django.urls import path
from . import views


urlpatterns = [
    path('provider/', views.Provider.as_view())
]
