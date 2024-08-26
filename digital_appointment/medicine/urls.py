from django.urls import path
from views import Provider
urlpatterns = [
    path('provider', Provider.as_view())
]

urlpatterns = [
    path('provider', Provider.as_view())
]
