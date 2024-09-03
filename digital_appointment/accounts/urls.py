from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("login/", views.CustomTokenObtainPairView.as_view()),
    path("login/refresh/", TokenRefreshView.as_view()),
    path("user/", views.User.as_view()),
    path("user/<int:pk>/", views.UserDetail.as_view()),
    path("profile/", views.ProfileView.as_view()),
   # path('auth/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('auth/google/callback/', views.google_callback, name='google_callback'),
]
