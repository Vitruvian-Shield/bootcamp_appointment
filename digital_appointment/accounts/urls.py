from . import views
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("token/", views.CustomTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("user/", views.UserView.as_view()),
    path("user/<int:pk>/", views.UserDetailView.as_view()),
    path("profile/", views.ProfileView.as_view())
]
